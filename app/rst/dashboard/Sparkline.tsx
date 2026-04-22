"use client";

type Props = {
  values: number[];
  width?: number;
  height?: number;
};

export function SparklineSvg({ values, width = 120, height = 40 }: Props) {
  if (!values || values.length === 0) return null;

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="text-green-600">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}