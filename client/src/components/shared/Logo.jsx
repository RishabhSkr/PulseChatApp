const Logo = () => {
  return (
    <svg className="h-12 cursor-pointer transform hover:scale-105 transition-transform duration-300" viewBox="0 0 200 40">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <text
        x="0"
        y="30"
        fontFamily="'Segoe UI', Arial"
        fontSize="28"
        fontWeight="bold"
        fill="#3B82F6" 
        filter="url(#glow)"
      >
        Pulse
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </text>
      
      <text
        x="72"
        y="30"
        fontFamily="'Segoe UI', Arial"
        fontSize="28"
        fontWeight="bold"
        fill="#ffffff"
      >
        Chat
      </text>

      <g transform="translate(0, 0)">
        <circle cx="140" cy="20" r="3" fill="#3B82F6">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="3;4;3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle cx="150" cy="20" r="3" fill="#60A5FA">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.5s"
            begin="0.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="3;4;3"
            dur="1.5s"
            begin="0.5s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle cx="160" cy="20" r="3" fill="#93C5FD">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.5s"
            begin="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="3;4;3"
            dur="1.5s"
            begin="1s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};

export default Logo;
