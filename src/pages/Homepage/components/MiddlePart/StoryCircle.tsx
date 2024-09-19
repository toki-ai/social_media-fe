import { Avatar } from "@mui/material";

const StoryCircle = () => {
  return (
    <div className="flex flex-col items-center mr-4 cursor-pointer">
      <Avatar
        src="https://i.pinimg.com/564x/7b/8e/76/7b8e7603c2475daf3359089ed095a2ed.jpg"
        sx={{ width: "3rem", height: "3rem" }}
      ></Avatar>
    </div>
  );
};

export default StoryCircle;
