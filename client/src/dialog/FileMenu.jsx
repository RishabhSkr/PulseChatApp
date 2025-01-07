import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFileMenu, setUploadingLoader } from '../redux/reducers/misc';
import {
    Image as ImageIcon,
    AudioFile as AudioIcon,
    VideoFile as VideoIcon,
    UploadFile as UploadFileIcon,
} from '@mui/icons-material';
import { useRef } from 'react';
import {toast} from 'react-hot-toast'
import { useSendAttachmentsMutation } from "../redux/api/api";

const FileMenu = ({ anchorEl,chatId }) => {
    const { isFileMenu } = useSelector(state => state.misc);
    const dispatch = useDispatch();
    const [sendAttachments] =useSendAttachmentsMutation();
    const closeFileMenu = () => {
        dispatch(setIsFileMenu(false));
    };
    const imageRef = useRef(null);
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const fileRef = useRef(null);
  
    const selectImage = () => imageRef.current?.click();
    const selectAudio = () => audioRef.current?.click();
    const selectVideo = () => videoRef.current?.click();
    const selectFile = () => fileRef.current?.click();

    const fileChangeHandler = async (e, key) => {
      const files = Array.from(e.target.files);
  
      if (files.length <= 0) return;
  
      if (files.length > 5)
        return toast.error(`You can only send 5 ${key} at a time`);
  
      dispatch(setUploadingLoader(true));
  
      const toastId = toast.loading(`Sending ${key}...`);
      closeFileMenu();
  
      try {
        const myForm = new FormData();
  
        myForm.append("chatId", chatId);
        files.forEach((file) => myForm.append("files", file));
  
        const res = await sendAttachments(myForm);
  
        if (res.data) toast.success(`${key} sent successfully`, { id: toastId });
        else toast.error(`Failed to send ${key}`, { id: toastId });
  
        // Fetching Here
      } catch (error) {
        toast.error(error, { id: toastId });
      } finally {
        dispatch(setUploadingLoader(false));
      }
    };
  
    return (
        <Menu anchorEl={anchorEl} open={isFileMenu} onClose={closeFileMenu}>
            <div className="w-32">
                <MenuList>
                    <MenuItem onClick={selectImage}>
                        <Tooltip title="Image" placement="right">
                            <ImageIcon />
                        </Tooltip>
                        <ListItemText className="ml-2">Image</ListItemText>
                        <input
                            type="file"
                            multiple
                            accept="image/png image/jpeg image/gif"
                            style={{ display: 'none' }}
                            onChange={e => fileChangeHandler(e, 'Images')}
                            ref={imageRef}
                        />
                    </MenuItem>

                    <MenuItem onClick={selectAudio}>
                        <Tooltip title="Audio" placement="right">
                            <AudioIcon />
                        </Tooltip>
                        <ListItemText className="ml-2">Audio</ListItemText>
                        <input
                            type="file"
                            multiple
                            accept="audio/mpeg audio/wav audio/mp3 audio/ogg"
                            style={{ display: 'none' }}
                            onChange={e => fileChangeHandler(e, 'Audios')}
                            ref={audioRef}
                        />
                    </MenuItem>

                    <MenuItem onClick={selectVideo}>
                        <Tooltip title="Video" placement="right">
                            <VideoIcon />
                        </Tooltip>
                        <ListItemText className="ml-2">Video</ListItemText>
                        <input
                            type="file"
                            multiple
                            accept="video/*"  // Changed to accept all video types
                            style={{ display: 'none' }}
                            onChange={e => fileChangeHandler(e, 'Videos')}
                            ref={videoRef}
                        />
                    </MenuItem>

                    <MenuItem onClick={selectFile}>
                        <Tooltip title="File" placement="right">
                            <UploadFileIcon />
                        </Tooltip>
                        <ListItemText className="ml-2">Files</ListItemText>
                        <input
                            type="file"
                            multiple
                            accept="*"
                            style={{ display: 'none' }}
                            onChange={e => fileChangeHandler(e, 'Files')}
                            ref={fileRef}
                        />
                    </MenuItem>
                </MenuList>
            </div>
        </Menu>
    );
};

export default FileMenu;
