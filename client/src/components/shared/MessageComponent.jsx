import { Typography, Box } from "@mui/material";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachements";
import { motion } from "framer-motion";
import { Opacity } from "@mui/icons-material";



const MessageComponent = ({ message, user }) => {
    const { sender, content, attachments=[], createdAt } = message;
    const isSameSender = sender?._id === user?._id;
    const timeAgo = moment(createdAt).fromNow();

    return (
        <div  className={`flex ${isSameSender ? 'justify-end' : 'justify-start'} w-full`}>
            <motion.div 
                initial={{ opacity: 0, x: "-100%" }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`max-w-[70%] p-3 rounded-lg ${isSameSender
                ? 'bg-blue-500 text-white rounded-tr-none'
                : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }`}>
                {!isSameSender && (
                    <p className="text-xs text-gray-500">{sender?.name}</p>
                )}
                {content && (
                    <p className="text-sm">{content}</p>
                )}


                {/* Attachements when user vdo/img/file */}
                {attachments.length > 0 &&
                    attachments.map((attachment, index) => {
                        const url = attachment.url;
                        const file = fileFormat(url);

                        return (
                            <Box key={index}>
                                <a
                                    href={url}
                                    target="_blank"
                                    download
                                    style={{
                                        color: "black",
                                    }}
                                >
                                    {RenderAttachment(file, url)}
                                </a>
                            </Box>
                        );
                    })}

                {/* time of mesg */}
                <Typography
                    variant="caption"
                    align="right"
                    className={`block text-xs mt-1 ${isSameSender ? 'text-gray-200' : 'text-gray-500'}`}
                >
                    {timeAgo}
                </Typography>
            </motion.div>
        </div>
    );
}

export default MessageComponent;