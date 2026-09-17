import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showDpiBadge?: boolean;
}

export function BrandLogo({ size = "md", className = "", showDpiBadge = false }: BrandLogoProps) {
  // Proportions matching the Canva reference layout:
  // The emblem on the left is distinctly larger, and the wordmark sits beside it with clean, tight spacing.
  const config = {
    sm: {
      emblem: "h-12 sm:h-14 w-auto",
      wordmark: "h-7 sm:h-9 w-auto",
      gap: "gap-2",
    },
    md: {
      // Navbar sizing: emblem is prominently sized (64px -> 80px -> 96px) and wordmark is (40px -> 48px -> 56px)
      emblem: "h-16 sm:h-20 lg:h-24 w-auto",
      wordmark: "h-10 sm:h-12 lg:h-14 w-auto",
      gap: "gap-2.5 sm:gap-3",
    },
    lg: {
      // Footer / Card sizing
      emblem: "h-20 sm:h-24 lg:h-28 w-auto",
      wordmark: "h-12 sm:h-14 lg:h-16 w-auto",
      gap: "gap-3 sm:gap-4",
    },
    xl: {
      // Major Hero display
      emblem: "h-28 sm:h-36 w-auto",
      wordmark: "h-16 sm:h-20 w-auto",
      gap: "gap-4 sm:gap-6",
    },
  }[size];

  return (
    <div className={`flex items-end select-none ${config.gap} shrink-0 ${className}`}>
      {/* Primary Emblem: Significantly larger on the left */}
      <div className="relative shrink-0 transition-transform duration-200 hover:scale-105">
        <img
          src="/images/logo.png"
          alt="DonateFood.in Emblem"
          className={`${config.emblem} object-contain block`}
          loading="eager"
        />
      </div>

      {/* Wordmark: Perfectly scaled and parallelly aligned with the bottom of the emblem */}
      <div className="flex items-center gap-2.5 shrink-0 pb-1 sm:pb-1.5">
        <img
          src="/images/logo-name.png"
          alt="DonateFood.in"
          className={`${config.wordmark} object-contain block`}
          loading="eager"
        />

        {showDpiBadge && (
          <span className="hidden xl:inline-block bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-300 shrink-0 shadow-2xs self-center">
            Gov DPI
          </span>
        )}
      </div>
    </div>
  );
}

