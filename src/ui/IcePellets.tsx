interface iconProps {
  style: React.CSSProperties;
}

const IcePellet = (props: iconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={props.style}
      viewBox="0 0 50 50"
    >
      <path d="M 22.5 6 C 16.71 6 12 10.71 12 16.5 C 12 16.665 11.99 16.831 12 17 C 7.589 17 4 20.589 4 25 C 4 29.411 7.589 33 12 33 L 27 33 L 36 33 C 41.514 33 46 28.514 46 23 C 46 17.486 41.514 13 36 13 C 34.822 13 33.68675 13.19375 32.59375 13.59375 C 31.32675 9.12075 27.26 6 22.5 6 z M 27 33 L 21 37.5 L 21 45 L 27 40.5 L 27 33 z M 14 38 L 8 42.5 L 8 50 L 14 45.5 L 14 38 z M 37 38 L 31 42.5 L 31 50 L 37 45.5 L 37 38 z" />
    </svg>
  );
};

export default IcePellet;
