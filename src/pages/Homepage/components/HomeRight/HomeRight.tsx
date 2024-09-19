import React from "react";
import SearchUser from "../../../../components/Search/SearchUser";
import SuggestUserCard from "./SuggestUserCard";
import { Card } from "@mui/material";
const popularUser: number[] = [1, 2, 3, 4, 5];
const HomeRight = () => {
  return (
    <div className="pr-5">
      <SearchUser />
      <Card className="p-5">
        <div className="flex justify-between py-5 items-center">
          <p className="font-semibold opacity-70"> Suggested for you</p>
          <p className="text-xs font-semibold opacity-95">See all</p>
        </div>
        <div className="space-y-3">
          {popularUser.map(() => (
            <SuggestUserCard />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
