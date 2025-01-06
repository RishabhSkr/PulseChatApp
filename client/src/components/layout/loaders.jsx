import { Typography } from "@mui/material";

const Layoutloader = () => {
  return (
    <div>loaders</div>
  )
}

const TypingLoader = () => {  
  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center p-2 rounded-lg w-fit">
        {/* <Typography variant="caption" className="text-gray-200/30">Typing</Typography> */}
        <svg 
          width="50" 
          height="25" 
          viewBox="0 0 50 25" 
          className=""
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <circle cx="10" cy="12" r="3" fill="currentColor" className="text-blue-500">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="1.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="3;4;3"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="25" cy="12" r="4" fill="currentColor" className="text-blue-400">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="1.2s"
                begin="0.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="3;4;3"
                dur="1.2s"
                begin="0.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="40" cy="12" r="3" fill="currentColor" className="text-blue-300">
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="1.2s"
                begin="0.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="3;4;3"
                dur="1.2s"
                begin="0.8s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  )
}

export { Layoutloader, TypingLoader };

