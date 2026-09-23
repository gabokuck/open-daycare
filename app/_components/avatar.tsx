interface AvatarProps {
  initial?: string;
  name?: string;
  bg: string;
  fg: string;
  size?: 38 | 40 | 44 | 48 | 84;
  isGeneral?: boolean;
}

export function Avatar({
  initial,
  name,
  bg,
  fg,
  size = 44,
  isGeneral = false,
}: AvatarProps) {
  const fontSize =
    size === 84 ? 34 : size === 48 ? 19 : size === 44 ? 17 : 16;

  return (
    <div
      aria-label={name}
      className="flex items-center justify-center rounded-full font-fredoka font-semibold"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bg,
        color: fg,
        fontSize: `${fontSize}px`,
        lineHeight: 1,
        flex: "none",
      }}
    >
      {isGeneral ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m3 11 18-5v12L3 14v-3z" />
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      ) : (
        initial
      )}
    </div>
  );
}
