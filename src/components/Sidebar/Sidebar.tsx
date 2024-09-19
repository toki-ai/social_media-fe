import { Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import { navigationMenu } from "./SideBarNavigation";
import SortIcon from "@mui/icons-material/Sort";
import React from "react";

const SideBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className="card h-screen flex felx-col justify-between py-5">
      <div className="space-y-8 pl-7">
        <div className="">
          <span className="logo text-xl font-bold">Your Hometown</span>
        </div>
        <div className="space-y-10 pt-5">
          {navigationMenu.map((item) => (
            <div className="cursor-pointer flex space-x-3 items-center">
              {item.icon && <item.icon className="" />}
              <p className="text-lg">{item.title}</p>
            </div>
          ))}
        </div>
        <Divider sx={{ paddingTop: "20px" }} />
        <div className="cursor-pointer flex space-x-3 items-center">
          <SortIcon className="" />
          <div>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              More
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SideBar;
