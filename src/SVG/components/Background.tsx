type Props = {
  scale?: number; // Default 40px => like draw.io
  bgColor?: string;
};

const Background: React.FC<Props> = ({ scale = "40", bgColor = "#222" }) => {
  return (
    <svg className="absolute left-0 top-0 z-0 h-full w-full">
      <pattern
        x="0"
        y="0"
        id="pattern"
        width={scale}
        height={scale}
        patternUnits="userSpaceOnUse">
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="transparent"
          stroke={bgColor}
          strokeWidth="0.1"
        />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"></rect>
    </svg>
  );
};

export default Background;
