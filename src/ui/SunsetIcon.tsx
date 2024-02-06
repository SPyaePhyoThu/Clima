interface SunsetProps {
  style: React.CSSProperties;
}

const SunsetIcon = (props: SunsetProps) => {
  return (
    <svg
      style={props.style}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18M12 3V10M12 10L15 7M12 10L9 7"
        fill="none"
        stroke={props.style.fill}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default SunsetIcon;
