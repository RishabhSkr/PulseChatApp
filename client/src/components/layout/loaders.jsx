import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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
                        <circle
                            cx="10"
                            cy="12"
                            r="3"
                            fill="currentColor"
                            className="text-blue-500"
                        >
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
                        <circle
                            cx="25"
                            cy="12"
                            r="4"
                            fill="currentColor"
                            className="text-blue-400"
                        >
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
                        <circle
                            cx="40"
                            cy="12"
                            r="3"
                            fill="currentColor"
                            className="text-blue-300"
                        >
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
    );
};

const Layoutloader = () => {
    return (
        <div className="flex h-screen">
            {/* Left Sidebar Shimmer */}
            <div className="w-[300px] border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="p-4 space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full animate-pulse bg-gray-700 dark:bg-gray-200" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 w-3/4 animate-pulse bg-gray-700 dark:bg-gray-200 rounded" />
                                <div className="h-2 w-1/2 animate-pulse bg-gray-700 dark:bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area Shimmer */}
            <div className="flex-1 flex flex-col bg-gray-700">
                {/* Chat Header */}
                <div className="h-16 border-b border-gray-200 flex items-center px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full animate-pulse bg-gray-300" />
                        <div className="space-y-2">
                            <div className="h-3 w-32 animate-pulse bg-gray-300  rounded" />
                            <div className="h-2 w-24 animate-pulse bg-gray-300  rounded" />
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 space-y-4 bg-gray-700">
                    {[1, 2, 3].map(i => (
                        <div
                            key={i}
                            className={`flex ${
                                i % 2 === 0 ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div className="max-w-[70%] space-y-2">
                                <div className="h-4 w-32 animate-pulse bg-gray-200 rounded" />
                                <div className="h-4 w-40 animate-pulse bg-gray-200 rounded" />
                                <div className="h-4 w-24 animate-pulse bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <div className="h-20 border-t border-gray-200 dark:border-gray-700 p-4">
                    <div className="h-full w-full rounded-lg animate-pulse bg-gray-800 dark:bg-gray-400" />
                </div>
            </div>

            {/* Right Sidebar Shimmer */}
            <div className="w-[250px] border-l border-gray-700 dark:border-gray-200 bg-gray-50 dark:bg-gray-800">
                <div className="p-4 space-y-4">
                    <div className="h-4 w-3/4 animate-pulse bg-gray-700 dark:bg-gray-200 rounded" />
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div
                                key={i}
                                className="h-10 animate-pulse bg-gray-200 dark:bg-gray-700 rounded"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DrawerSkeleton = () => {
    return (
        <div className="flex h-screen w-full">
            {/* Sidebar Skeleton */}
            <div className="w-72 h-full bg-gray-200 dark:bg-gray-700 p-4 space-y-4 border-r border-gray-300 dark:border-gray-600">
                <div className="h-8 w-3/4 animate-pulse bg-gray-300 dark:bg-gray-800 rounded" />
                {[1, 2, 3, 4, 5].map(i => (
                    <div
                        key={i}
                        className="h-10 animate-pulse bg-gray-300 dark:bg-gray-800 rounded"
                    />
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 p-6 bg-gray-800 dark:bg-gray-500 space-y-6">
                {/* Header skeleton */}
                <div className="h-8 w-1/3 animate-pulse bg-gray-700 dark:bg-gray-300 rounded" />

                {/* Content blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            className="p-4 bg-gray-700 rounded-lg space-y-3"
                        >
                            <div className="h-4 w-3/4 animate-pulse bg-gray-700 rounded" />
                            <div className="h-4 w-1/2 animate-pulse bg-gray-700  rounded" />
                            <div className="h-20 animate-pulse bg-gray-700  rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MobileDrawerLoader = () => {
    return (
        <div className="w-full h-full bg-white dark:bg-gray-900 p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-24 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* Chat list */}
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3 w-3/4 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-2 w-1/2 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChatDetailsLoader = () => {
    return (
        <div className="flex h-screen">
            {/* Main Chat Area Shimmer */}
            <div className="flex-1 flex flex-col bg-gray-800">
                {/* Chat Header */}
                <div className="h-16 border-b border-gray-200 flex items-center px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full animate-pulse bg-gray-300" />
                        <div className="space-y-2">
                            <div className="h-3 w-32 animate-pulse bg-gray-300  rounded" />
                            <div className="h-2 w-24 animate-pulse bg-gray-300  rounded" />
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 space-y-4 bg-gray-700">
                    {[1, 2, 3].map(i => (
                        <div
                            key={i}
                            className={`flex ${
                                i % 2 === 0 ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div className="max-w-[70%] space-y-2">
                                <div className="h-4 w-32 animate-pulse bg-gray-300 rounded" />
                                <div className="h-4 w-40 animate-pulse bg-gray-300 rounded" />
                                <div className="h-4 w-24 animate-pulse bg-gray-300 rounded" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat Input */}
                <div className="h-20 border-t rounded border-gray-400  p-4">
                    <div className="h-full w-full rounded-lg animate-pulse bg-gray-800 dark:bg-gray-600" />
                </div>
            </div>
        </div>
    );
};

const LoadingMessages = [
  "Getting things ready...",
  "Almost there...",
  "Loading your experience...",
  "Preparing something amazing...",
  "Just a moment please...",
];

const CommonLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LoadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="space-y-8 text-center px-4">
        <div className="relative w-20 h-20 mx-auto">
          <div className="w-20 h-20 rounded-full absolute border-4 border-gray-200 dark:border-gray-700 opacity-30"></div>
          <div className="w-20 h-20 rounded-full absolute border-4 border-blue-500 border-t-transparent animate-spin">
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-lg font-medium text-gray-700 dark:text-gray-200 transition-all duration-500 ease-in-out">
            {LoadingMessages[messageIndex]}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            Please wait while we set up your experience
          </div>
        </div>
      </div>
    </div>
  );
};

const OverlayLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>

            {/* Loader content */}
            <div className="relative z-50 bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
                <div className="relative w-16 h-16 mx-auto">
                    <div className="w-16 h-16 rounded-full absolute border-4 border-gray-200/30"></div>
                    <div className="w-16 h-16 rounded-full absolute border-4 border-blue-500 border-t-transparent animate-spin"></div>
                </div>
            </div>
        </div>
    );
};
export {
    Layoutloader,
    TypingLoader,
    DrawerSkeleton,
    MobileDrawerLoader,
    ChatDetailsLoader,
    CommonLoader,
    OverlayLoader,
};
