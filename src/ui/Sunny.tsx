interface SunnyProps {
  style: React.CSSProperties;
}

const Sunny = (props: SunnyProps) => {
  return (
    <svg
      style={props.style}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 111.69 111.69"
    >
      <g id="sun">
        <g>
          <g>
            <circle
              style={{ fill: "#FFD02F" }}
              cx="55.845"
              cy="55.845"
              r="55.845"
            />
          </g>
        </g>
        <g>
          <g>
            <circle
              style={{ fill: "#FFD02F" }}
              cx="55.845"
              cy="55.845"
              r="46.174"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
// #=ffd504
export default Sunny;
