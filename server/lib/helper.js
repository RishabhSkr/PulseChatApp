

export const getOtheMember = (members, userId) => {
    return members.find(member => member._id.toString() !== userId.toString());
}