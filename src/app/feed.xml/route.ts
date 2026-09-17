import { NextResponse } from "next/server";
import { VERIFIED_NGOS } from "@/data/ngos";
import { getAllCities } from "@/data/geography";

export async function GET() {
  const baseUrl = "https://donatefood.in";
  const buildDate = new Date().toUTCString();
  const cities = getAllCities();

  const ngoItemsXml = VERIFIED_NGOS.map((ngo) => {
    const url = `${baseUrl}/ngo/${ngo.stateSlug}/${ngo.citySlug}/${ngo.slug}`;
    const pubDate = new Date(ngo.recentInspections[0]?.date || "2026-08-01").toUTCString();
    return `
    <item>
      <title><![CDATA[${ngo.name} — Verified NGO Profile (Tier ${ngo.tier})]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[NITI Aayog DARPAN Verified Food Rescue Organization in ${ngo.cityName}. FSSAI License: ${ngo.fssaiLicenseNo}. Rescued ${ngo.mealsRescuedTotal} meals to date. Cold chain certified: ${ngo.coldChainCapable ? "Yes" : "No"}.]]></description>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[Verified NGO Profile]]></category>
      <category><![CDATA[FSSAI Compliance]]></category>
    </item>`;
  }).join("");

  const cityItemsXml = cities.slice(0, 10).map((city) => {
    const url = `${baseUrl}/donate-food/${city.stateSlug}/${city.districtSlug}/${city.slug}`;
    return `
    <item>
      <title><![CDATA[Food Donation Hub — ${city.name}, ${city.stateName}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[Local Food Surplus Recovery Network for ${city.name} (${city.pincode}). ${city.activeNgosCount} active verified NGOs with ${city.mealsDistributedMonth} meals distributed this month.]]></description>
      <pubDate>${buildDate}</pubDate>
      <category><![CDATA[Hyperlocal Food Hub]]></category>
    </item>`;
  }).join("");

  const emergencyItemXml = `
    <item>
      <title><![CDATA[NDMA / NDRF Real-Time Disaster Food Supply Chain Coordination]]></title>
      <link>${baseUrl}/emergency</link>
      <guid isPermaLink="true">${baseUrl}/emergency</guid>
      <description><![CDATA[Active crisis feeding operations, cyclone and flood relief, heavy transport manifest, and potable water buffer distribution.]]></description>
      <pubDate>${buildDate}</pubDate>
      <category><![CDATA[Disaster Relief]]></category>
    </item>`;

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>DonateFood.in — India National Food Rescue &amp; Humanitarian Feed</title>
    <link>${baseUrl}</link>
    <description>Real-time machine-readable feed of verified NGO compliance profiles, hyperlocal food rescue hubs, and emergency relief deployments.</description>
    <language>en-IN</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub"/>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${emergencyItemXml}
    ${ngoItemsXml}
    ${cityItemsXml}
  </channel>
</rss>`;

  return new NextResponse(xmlContent, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
