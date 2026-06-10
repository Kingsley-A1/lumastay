import React from "react";

const amenityMap: Record<string, { icon: string; label: string }> = {
  "WiFi": { icon: "📶", label: "WiFi" },
  "Air Conditioning": { icon: "❄️", label: "A/C" },
  "Mini Bar": { icon: "🍸", label: "Mini Bar" },
  "Full Bar": { icon: "🍾", label: "Full Bar" },
  "Wet Bar": { icon: "🥂", label: "Wet Bar" },
  "Flat Screen TV": { icon: "📺", label: "Smart TV" },
  "Multiple Flat Screen TVs": { icon: "📺", label: "Smart TVs" },
  "Room Service": { icon: "🍽️", label: "Room Service" },
  "Safe": { icon: "🔒", label: "Safe" },
  "Hair Dryer": { icon: "💨", label: "Hair Dryer" },
  "Balcony": { icon: "🌅", label: "Balcony" },
  "Private Balcony": { icon: "🌅", label: "Balcony" },
  "Soaking Tub": { icon: "🛁", label: "Soaking Tub" },
  "Bathtub": { icon: "🛁", label: "Bathtub" },
  "Walk-in Shower": { icon: "🚿", label: "Walk-in Shower" },
  "Rain Shower": { icon: "🚿", label: "Rain Shower" },
  "Coffee Maker": { icon: "☕", label: "Coffee" },
  "Coffee Machine": { icon: "☕", label: "Coffee" },
  "Espresso Machine": { icon: "☕", label: "Espresso" },
  "Bathrobe": { icon: "🥼", label: "Bathrobe" },
  "Private Terrace": { icon: "🌿", label: "Terrace" },
  "Dining Area": { icon: "🍴", label: "Dining" },
  "Living Room": { icon: "🛋️", label: "Living Room" },
  "Kitchenette": { icon: "🍳", label: "Kitchenette" },
  "Full Kitchen": { icon: "🍳", label: "Kitchen" },
  "Private Pool": { icon: "🏊", label: "Private Pool" },
  "Rooftop Terrace": { icon: "🌆", label: "Rooftop" },
  "24/7 Butler": { icon: "🤵", label: "Butler" },
  "Pool Access": { icon: "🏊", label: "Pool" },
  "Beach Access": { icon: "🏖️", label: "Beach" },
  "Bunk Beds": { icon: "🛏️", label: "Bunk Beds" },
  "Dining Room": { icon: "🍴", label: "Dining" },
  "Private Gym": { icon: "💪", label: "Gym" },
};

interface AmenityIconProps {
  amenity: string;
  showLabel?: boolean;
  className?: string;
}

export function AmenityIcon({ amenity, showLabel = true, className = "" }: AmenityIconProps) {
  const mapped = amenityMap[amenity] ?? { icon: "✓", label: amenity };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-base" role="img" aria-label={mapped.label}>
        {mapped.icon}
      </span>
      {showLabel && (
        <span className="text-sm text-[#64748B]">{mapped.label}</span>
      )}
    </div>
  );
}
