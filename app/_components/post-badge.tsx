import {
  POST_CATEGORY_LABELS,
  type PostCategory,
} from "@/lib/mock/feed";

const BADGE_COLORS: Record<PostCategory, { bg: string; fg: string }> = {
  achievement: { bg: "#CFEBD8", fg: "#3E9B6C" },
  activity: { bg: "#C7E7F1", fg: "#2E89A6" },
  announcement: { bg: "#CCD8F4", fg: "#4E72C8" },
};

interface PostBadgeProps {
  category: PostCategory;
}

export function PostBadge({ category }: PostBadgeProps) {
  const { bg, fg } = BADGE_COLORS[category];

  return (
    <div
      className="flex items-center gap-[7px] rounded-full"
      style={{
        backgroundColor: bg,
        padding: "6px 12px",
      }}
    >
      <span
        className="block rounded-full"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: fg,
        }}
      />
      <span
        className="font-extrabold"
        style={{
          color: fg,
          fontSize: "12px",
          letterSpacing: "0.5px",
        }}
      >
        {POST_CATEGORY_LABELS[category]}
      </span>
    </div>
  );
}
