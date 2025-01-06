import { Typography } from "@mui/material";

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

const Layoutloader = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar Shimmer */}
      <div className="w-[300px] border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-2 w-1/2 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area Shimmer */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="h-3 w-32 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-2 w-24 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[70%] space-y-2">
                <div className="h-4 w-48 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-64 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-32 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="h-20 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="h-full w-full rounded-lg animate-pulse bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      {/* Right Sidebar Shimmer */}
      <div className="w-[250px] border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="p-4 space-y-4">
          <div className="h-4 w-3/4 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Layoutloader, TypingLoader};

