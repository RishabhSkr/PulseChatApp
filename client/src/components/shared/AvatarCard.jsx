import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";

const AvatarCard = ({ avatar = [], max = 4, src, w = "3rem", h = "3rem" }) => {
  // Handle single avatar case
  if (src) {
    return (
      <Avatar
        src={src}
        sx={{
          width: w,
          height: h,
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
                width: w,
                height: h,
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