import { useParams } from "react-router-dom";
import { sampleChats } from "../../constants/sampleData";
import ChatList from "../../specific/ChatList";
import Profile from "../../specific/Profile";
import Title from "../shared/Title";
import Header from "./Header";

const AppLayout = () => (WrrapperComponent) => {
    const LayoutWrapper = (props) => {
        const params = useParams();
        const chatId = params.chatId;
        return (
            <div className="flex flex-col min-h-screen">
                <Title />
                <Header />
                <div className="flex flex-grow h-[calc(100vh-4rem)] w-full">
                    
                    <div className="hidden sm:block sm:w-1/4 border-r border-gray-200 bg-gradient-to-b from-[#1D283A] to-[#0F172A]">
                        <ChatList 
                            chats={sampleChats} 
                            chatId="1"
                            onlineUsers={["1", "2"]}
                            newMessagesAlert={[
                                {
                                    chatId: chatId,
                                    count: 4,
                                },
                            ]}
                            handleDeleteChat={() => {}}
                        />
                    </div>
                    
                    <div className="w-full sm:w-3/4 bg-primary flex flex-col overflow-hidden">
                        <WrrapperComponent {...props} />
                    </div>
                    
                    <div className=" text-white hidden md:block md:w-1/4 bg-gradient-to-b from-[#1D283A] to-[#0F172A] border-l border-gray-200">
                        <Profile />
                    </div>
                </div>
            </div>
        )
    };
    
    return LayoutWrapper;
};



export default AppLayout;