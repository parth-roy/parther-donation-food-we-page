-- ==============================================================================
-- DONATEFOOD.IN — INDIA-WIDE GEOGRAPHIC, SPATIAL, & DPI DATABASE SCHEMA
-- PostgreSQL 15+ with PostGIS and Uber H3 Extensions
-- Blueprint Reference: Section 11.2 & Section 13.2
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "postgis_topology";

-- Optional: If H3 extension is compiled into PostgreSQL cluster
-- CREATE EXTENSION IF NOT EXISTS "h3";
-- CREATE EXTENSION IF NOT EXISTS "h3_postgis";

-- 2. Master Locations Table (Government LGD, Multidimensional Poverty Index, H3)
CREATE TABLE IF NOT EXISTS tbl_locations (
    location_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lgd_code VARCHAR(20) UNIQUE NOT NULL,                   -- Local Government Directory Code
    pincode VARCHAR(6) NOT NULL,                           -- Postal Index Number
    name VARCHAR(120) NOT NULL,                            -- City / Area Name
    district VARCHAR(120) NOT NULL,                        -- Revenue District
    state VARCHAR(80) NOT NULL,                            -- State / Union Territory
    state_code VARCHAR(4) NOT NULL,                        -- WB, MH, DL, KA, TN, etc.
    coordinates GEOGRAPHY(POINT, 4326) NOT NULL,           -- WGS84 PostGIS Point
    h3_res7 VARCHAR(15),                                   -- Uber H3 Resolution 7 (Macro Zone ~5km)
    h3_res9 VARCHAR(15),                                   -- Uber H3 Resolution 9 (Micro Zone ~100m)
    mpi_score NUMERIC(4, 3) DEFAULT 0.000,                 -- NITI Aayog Multidimensional Poverty Index
    priority_tier VARCHAR(10) NOT NULL DEFAULT 'Tier C'    -- Priority: 'Tier A', 'Tier B', 'Tier C', 'Tier D'
        CHECK (priority_tier IN ('Tier A', 'Tier B', 'Tier C', 'Tier D')),
    population INTEGER DEFAULT 0,
    page_quality_score NUMERIC(5, 2) DEFAULT 92.50,        -- PSEO Governance PQS (0.00 - 100.00)
    indexation_status VARCHAR(25) NOT NULL DEFAULT 'published_indexed'
        CHECK (indexation_status IN ('published_indexed', 'published_noindex', 'merged_redirected', 'draft_held')),
    canonical_slug VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Fast Spatial & Indexation Queries
CREATE INDEX IF NOT EXISTS idx_locations_coords ON tbl_locations USING GIST (coordinates);
CREATE INDEX IF NOT EXISTS idx_locations_pincode ON tbl_locations (pincode);
CREATE INDEX IF NOT EXISTS idx_locations_lgd ON tbl_locations (lgd_code);
CREATE INDEX IF NOT EXISTS idx_locations_h3_res7 ON tbl_locations (h3_res7);
CREATE INDEX IF NOT EXISTS idx_locations_priority_tier ON tbl_locations (priority_tier);
CREATE INDEX IF NOT EXISTS idx_locations_indexation ON tbl_locations (indexation_status);

-- 3. Verified NGOs and Humanitarian Entities Table
CREATE TABLE IF NOT EXISTS tbl_organizations (
    org_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    darpan_id VARCHAR(50) UNIQUE NOT NULL,                 -- NITI Aayog DARPAN ID (e.g., WB/2019/0248819)
    pan VARCHAR(10) NOT NULL,                              -- Organization PAN
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    tier SMALLINT NOT NULL DEFAULT 3                       -- Verification Tier (1 to 5)
        CHECK (tier BETWEEN 1 AND 5),
    tier_label VARCHAR(30) NOT NULL DEFAULT 'Document-Verified'
        CHECK (tier_label IN ('Unverified', 'Claimed', 'Document-Verified', 'Partner', 'Trusted/Active')),
    tax_exemption_12a_80g BOOLEAN NOT NULL DEFAULT false,  -- IT Act 12A / 80G Certified
    fcra_registered BOOLEAN NOT NULL DEFAULT false,        -- Foreign Contribution Regulation Act
    fssai_license_no VARCHAR(30) NOT NULL,                 -- FSSAI Surplus Recovery License
    cold_chain_capable BOOLEAN NOT NULL DEFAULT false,     -- ≤ 7°C Refrigerated Logistics
    storage_capacity_kg NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    active_vehicles SMALLINT NOT NULL DEFAULT 1,
    avg_response_sla_min SMALLINT NOT NULL DEFAULT 45,
    meals_rescued_total BIGINT NOT NULL DEFAULT 0,
    rating NUMERIC(2, 1) NOT NULL DEFAULT 4.5,
    established_year SMALLINT,
    operating_hours VARCHAR(120),
    emergency_capable BOOLEAN NOT NULL DEFAULT true,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(120) NOT NULL,
    website VARCHAR(255),
    location_id UUID REFERENCES tbl_locations(location_id) ON DELETE SET NULL,
    coordinates GEOGRAPHY(POINT, 4326),
    h3_index VARCHAR(15),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for NGO Discovery and Compliance Verification
CREATE INDEX IF NOT EXISTS idx_orgs_darpan ON tbl_organizations (darpan_id);
CREATE INDEX IF NOT EXISTS idx_orgs_tier ON tbl_organizations (tier);
CREATE INDEX IF NOT EXISTS idx_orgs_coords ON tbl_organizations USING GIST (coordinates);
CREATE INDEX IF NOT EXISTS idx_orgs_cold_chain ON tbl_organizations (cold_chain_capable);
CREATE INDEX IF NOT EXISTS idx_orgs_slug ON tbl_organizations (slug);

-- 4. FSSAI & Hygiene Safety Audit Logs Table
CREATE TABLE IF NOT EXISTS tbl_fssai_logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES tbl_organizations(org_id) ON DELETE CASCADE,
    inspection_date DATE NOT NULL,
    inspector_authority VARCHAR(255) NOT NULL,             -- e.g., 'FSSAI Food Safety Officer Kolkata Zone'
    passed BOOLEAN NOT NULL DEFAULT true,
    sample_tested_count INTEGER DEFAULT 0,
    hygiene_rating NUMERIC(2, 1) DEFAULT 5.0,
    audit_remarks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fssai_org ON tbl_fssai_logs (org_id);
CREATE INDEX IF NOT EXISTS idx_fssai_date ON tbl_fssai_logs (inspection_date);

-- 5. Real-Time Food Surplus Dispatch & Custody Chain
CREATE TABLE IF NOT EXISTS tbl_surplus_dispatches (
    dispatch_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_code VARCHAR(32) UNIQUE NOT NULL,             -- Public Tracking Hash
    donor_name VARCHAR(150) NOT NULL,
    donor_phone VARCHAR(20) NOT NULL,
    pickup_address TEXT NOT NULL,
    pickup_coords GEOGRAPHY(POINT, 4326),
    assigned_org_id UUID REFERENCES tbl_organizations(org_id) ON DELETE RESTRICT,
    food_category VARCHAR(50) NOT NULL                    -- 'Cooked Meals', 'Raw Grain', 'Perishable Produce', etc.
        CHECK (food_category IN ('Cooked Meals', 'Raw Grain/Ration', 'Packaged Foods', 'Perishable Produce', 'Bakery Items')),
    quantity_kg NUMERIC(8, 2) NOT NULL,
    estimated_servings INTEGER NOT NULL,
    temp_at_pickup_celsius NUMERIC(4, 1),
    temp_at_handover_celsius NUMERIC(4, 1),
    status VARCHAR(25) NOT NULL DEFAULT 'requested'
        CHECK (status IN ('requested', 'assigned', 'in_transit', 'delivered', 'cancelled', 'safety_rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    scheduled_pickup TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_dispatches_status ON tbl_surplus_dispatches (status);
CREATE INDEX IF NOT EXISTS idx_dispatches_org ON tbl_surplus_dispatches (assigned_org_id);
CREATE INDEX IF NOT EXISTS idx_dispatches_tracking ON tbl_surplus_dispatches (tracking_code);

-- 6. High-Performance Spatial Query Function: Find Nearest Verified NGOs
-- Returns verified NGOs sorted by straight-line distance within specified kilometer radius
CREATE OR REPLACE FUNCTION fn_find_nearest_verified_ngos(
    p_lat DOUBLE PRECISION,
    p_lng DOUBLE PRECISION,
    p_radius_km DOUBLE PRECISION DEFAULT 25.0,
    p_min_tier SMALLINT DEFAULT 4
)
RETURNS TABLE (
    org_id UUID,
    name VARCHAR(255),
    darpan_id VARCHAR(50),
    tier SMALLINT,
    phone VARCHAR(20),
    cold_chain_capable BOOLEAN,
    distance_km DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.org_id,
        o.name,
        o.darpan_id,
        o.tier,
        o.phone,
        o.cold_chain_capable,
        ROUND((ST_Distance(o.coordinates, ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography) / 1000.0)::numeric, 2)::DOUBLE PRECISION AS distance_km
    FROM tbl_organizations o
    WHERE o.tier >= p_min_tier
      AND o.coordinates IS NOT NULL
      AND ST_DWithin(o.coordinates, ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::geography, p_radius_km * 1000.0)
    ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql STABLE;
