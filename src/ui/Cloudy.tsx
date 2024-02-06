import React from "react";

interface CloudyProps {
  style: React.CSSProperties;
}

const Cloudy = (props: CloudyProps) => {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      style={props.style}
    >
      <path d="M13.405 7.027a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 13H13a3 3 0 0 0 .405-5.973z" />
    </svg>
  );
};

export default Cloudy;
