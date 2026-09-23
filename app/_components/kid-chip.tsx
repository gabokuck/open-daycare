import type { KidChip } from "@/lib/mock/kids";

const CHIP_COLORS: Record<KidChip["kind"], { bg: string; fg: string }> = {
  allergy: { bg: "#FBD8CC", fg: "#D9684A" },
  link: { bg: "#F9D2DE", fg: "#C56486" },
};

interface KidChipProps {
  chip: KidChip;
}

export function KidChip({ chip }: KidChipProps) {
  const { bg, fg } = CHIP_COLORS[chip.kind];

  return (
    <span
      style={{
        flex: "none",
        backgroundColor: bg,
        color: fg,
        fontSize: "11px",
        fontWeight: 800,
        padding: "5px 9px",
        borderRadius: "999px",
      }}
    >
      {chip.label}
    </span>
  );
}
