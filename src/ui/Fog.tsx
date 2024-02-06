interface iconProps {
  style: React.CSSProperties;
}

const Fog = (props: iconProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      style={props.style}
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <path
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M55,40c4.565,0,8-3.435,8-8c0-4.565-3.435-9-8-9
	c0-11.414-9.586-20-21-20C23.898,3,14.8,9.423,13,19c0,0-1.165,0-2,0C5.292,19,1,24.292,1,30s4.292,10,10,10"
      />
      <path
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M13 40 C20 35, 36 35, 53 40"
      />
      <path
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M13 48 C20 43, 36 43, 53 48"
      />
      <path
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeMiterlimit="10"
        d="M13 56 C20 51, 36 51, 53 56"
      />
    </svg>
  );
};

export default Fog;
