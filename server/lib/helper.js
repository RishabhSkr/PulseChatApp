import { userSocketIDs}  from '../index.js';
export const getOtheMember = (members, userId) => {
  // If members array is empty or invalid, return null
  if (!members || !Array.isArray(members) || members.length === 0) {
    return null;
  }

  // Find the first member that isn't the current user
  const otherMember = members.find(
    (member) => member?._id?.toString() !== userId?.toString()
  );

  return otherMember || null;
};

export const getSockets =(users=[])=>{
    const sockets = users.map((user=>{
        return userSocketIDs.get(user.toString());
    }))
    return sockets;
}

export const getBase64 = (file) => {
    return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
}