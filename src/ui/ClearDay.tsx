interface iconProps {
  style: React.CSSProperties;
}
const ClearDay = (props: iconProps) => {
  return (
    <svg
      style={props.style}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="iconify iconify--twemoji"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle fill="#FFAC33" cx="18" cy="18" r="10"></circle>
      <path
        fill="#E1E8ED"
        d="M29.777 23.2c-.642 0-1.26.1-1.843.285c-.688-2.028-2.56-3.485-4.767-3.485c-2.368 0-4.35 1.678-4.899 3.937a3.407 3.407 0 0 0-2.101-.736c-1.933 0-3.5 1.611-3.5 3.6c0 .483.096.941.264 1.363A3.715 3.715 0 0 0 11.889 28C9.741 28 8 29.791 8 32s1.741 4 3.889 4h17.889C33.214 36 36 33.136 36 29.6c0-3.535-2.786-6.4-6.223-6.4z"
      ></path>
    </svg>
  );
};
export default ClearDay;
