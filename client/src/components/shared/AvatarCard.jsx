import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";

const AvatarCard = ({ avatar = [], max = 4, src }) => {
  // Handle single avatar case
  if (src) {
    return (
      <Avatar
        src={src}
        sx={{
          width: "3rem",
          height: "3rem",
        }}
      />
    );
  }

  // Handle avatar array case
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
        }}
      >
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((avt, index) => (
            <Avatar
              key={Math.random() * 100}
              src={avt}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: {
                  xs: `${0.5 + index}rem`,
                  sm: `${index}rem`,
                },
              }}
            />
          ))}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;