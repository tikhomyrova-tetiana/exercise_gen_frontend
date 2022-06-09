const BodyView = (props) => {
  return (
    <svg viewBox="0 0 500 500" width="100%">
      <g
        transform="matrix(1.25966, 0, 0, 1.25966, -24.384653, -35.918259)"
        // style=""
        id="Head-front"
      >
        <ellipse
          style={{ fill: "#fff3e0", stroke: "black" }}
          cx="114.791"
          cy="99.273"
          rx="39.055"
          ry="39.055"
        >
          <title>Head-front</title>
        </ellipse>
        <g transform="matrix(1, 0, 0, 1, -0.873497, -1.044817)">
          <ellipse
            style={{ fill: "#4dd0e1", stroke: "black" }}
            cx="99.685"
            cy="97.287"
            rx="6.31"
            ry="6.447"
          >
            <title>Left eye</title>
          </ellipse>
          <ellipse
            style={{ fill: "#4dd0e1", stroke: "black" }}
            cx="131.644"
            cy="97.287"
            rx="6.31"
            ry="6.447"
          >
            <title>Right eye</title>
          </ellipse>
        </g>
      </g>
      <rect
        x="76.28"
        y="206.241"
        width="88.965"
        height="111.685"
        style={{ fill: props.waistFrontColor, stroke: "black" }}
      >
        <title>Waist-front</title>
      </rect>
      <g transform="matrix(1, 0, 0, 1, -3.296853, 0)">
        <title>Arms-front</title>
        <rect
          x="20.753"
          y="147.834"
          width="41.144"
          height="129.25"
          style={{ fill: props.armsColor, stroke: "black" }}
        />
        <rect
          x="182.49"
          y="147.834"
          width="41.144"
          height="129.25"
          style={{ fill: props.armsColor, stroke: "black" }}
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, 2.154645, 0)">
        <title>Legs-front</title>
        <rect
          x="63.162"
          y="325.998"
          width="47.823"
          height="129.006"
          style={{ fill: props.legsColor, stroke: "black" }}
        />
        <rect
          x="122.499"
          y="325.998"
          width="47.823"
          height="129.006"
          style={{ fill: props.legsColor, stroke: "black" }}
        />
      </g>
      <ellipse
        style={{ fill: "#fff3e0", stroke: "black" }}
        cx="351.952"
        cy="90.339"
        rx="49.196"
        ry="49.196"
      >
        <title>Head-back</title>
      </ellipse>
      <g transform="matrix(1, 0, 0, 1, 229.758484, 1.206952)">
        <title>Arms-back</title>
        <rect
          x="20.753"
          y="147.834"
          width="41.144"
          height="129.25"
          style={{ fill: props.armsColor, stroke: "black" }}
        />
        <rect
          x="182.49"
          y="147.834"
          width="41.144"
          height="129.25"
          style={{ fill: props.armsColor, stroke: "black" }}
        />
      </g>
      <g transform="matrix(1, 0, 0, 1, 235.209991, 1.206952)">
        <title>Legs-back</title>
        <rect
          x="63.162"
          y="325.998"
          width="47.823"
          height="129.006"
          style={{ fill: props.legsColor, stroke: "black" }}
        />
        <rect
          x="122.499"
          y="325.998"
          width="47.823"
          height="129.006"
          style={{ fill: props.legsColor, stroke: "black" }}
        />
      </g>
      <path
        d="M 120.54 -239.944 L 174.403 -204.644 L 153.829 -147.527 L 87.251 -147.527 L 66.677 -204.644 Z"
        style={{ fill: props.chestColor, stroke: "black" }}
        transform="matrix(1, 0, 0, -1, -1.6433551357611975, 1.4490927075721736)"
      >
        <title>Chest-front</title>
      </path>
      <path
        d="M 297.541 207.058 L 318.115 149.941 L 384.693 149.941 L 405.267 207.058 L 397.753 211.982 L 397.753 318.891 L 308.788 318.891 L 308.788 214.429 L 297.541 207.058 Z"
        style={{ fill: props.backColor, stroke: "black" }}
      >
        <title>Back</title>
      </path>
      <g>
        <path
          style={{ fill: props.heartColor, stroke: "black" }}
          d="M 135.386 168.844 C 140.796 160.595 149.627 165.491 152.573 172.837 C 154.837 178.484 140.699 189.061 140.699 195.28"
        >
          <title>Heart-left</title>
        </path>
        <path
          style={{ fill: props.heartColor, stroke: "black" }}
          d="M 134.325 168.986 C 125.72 164.357 117.563 169.312 119.671 179.148 C 121.505 187.708 139.851 188.114 139.851 196.204"
        >
          <title>Heart-right</title>
        </path>
      </g>
    </svg>
  );
};

export default BodyView;
