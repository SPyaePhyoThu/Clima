interface iconProps {
  style: React.CSSProperties;
}

const Drizzle = (props: iconProps) => {
  return (
    <svg
      fill="#ffffff"
      style={props.style}
      viewBox="0 0 32 32"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <title>rain--drizzle</title>
      <path d="M11,30a1,1,0,0,1-.8944-1.4474l2-4a1,1,0,1,1,1.7887.8946l-2,4A.9979.9979,0,0,1,11,30Z" />
      <path d="M24.8008,9.1362a8.9943,8.9943,0,0,0-17.6006,0A6.4973,6.4973,0,0,0,8.5,22H19.3813L18.105,24.5527a1,1,0,0,0,1.789.8946L21.6177,22H23.5A6.4974,6.4974,0,0,0,24.8008,9.1362ZM23.5,20H8.5a4.4975,4.4975,0,0,1-.356-8.981l.8155-.0639.0991-.812a6.9938,6.9938,0,0,1,13.8838,0l.0986.812.8154.0639A4.4975,4.4975,0,0,1,23.5,20Z" />
      <rect
        id="_Transparent_Rectangle_"
        className="cls-1"
        width="32"
        height="32"
      />
    </svg>
  );
};

export default Drizzle;
