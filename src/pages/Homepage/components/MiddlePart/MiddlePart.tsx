import { Avatar, Card, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import StoryCircle from "./StoryCircle";
import VideocamIcon from "@mui/icons-material/Videocam";
import PostCard from "../../../../components/Post/PostCard";
const story: number[] = [1, 2, 3, 4, 5, 6, 7];
const post: number[] = [1, 2, 3, 4, 5];

const MiddlePart = () => {
  const handleOpenCreatePostModal = () => {
    console.log("Open create post modal");
  };
  return (
    <div className="px-20">
      <section className="flex items-center p-5 rounded-b-md">
        <Avatar
          className="flex flex-col items-center mr-4 cursor-pointer"
          sx={{ width: "3rem", height: "3rem" }}
        >
          <AddIcon sx={{ fontSize: "2rem" }} />
        </Avatar>
        {story.map(() => (
          <StoryCircle />
        ))}
      </section>
      <Card className="p-5 mt-5">
        <div className="flex justify-center">
          <Avatar sx={{ margin: "0 10px" }} />
          <input
            readOnly
            className="pl-5 rounded-full bg-transparent outline-none
          w-[90%] border-e-gray-600 border h-10"
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center w-[50%] justify-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <AddPhotoAlternateIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center justify-center w-[50%]">
            <IconButton color="primary" onClick={handleOpenCreatePostModal}>
              <VideocamIcon />
            </IconButton>
            <span>Media</span>
          </div>
        </div>
      </Card>
      <div className="mt-5 space-y-5">
        {post.map(() => (
          <PostCard />
        ))}
      </div>
    </div>
  );
};

export default MiddlePart;
