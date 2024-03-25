import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserList } from "../../ReduxToolkit/AuthSlice";
import store from "../../ReduxToolkit/Store";
import { assignedTaskToUser } from "../../ReduxToolkit/TaskSlice";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 2,
};

const tasks = [1, 1, 1, 1];

export default function UserList({ handleClose, open }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const handleAssignedTask = (user) => {
    dispatch(assignedTaskToUser({ userId: user.id, taskId: taskId }));
  };
  useEffect((item) => {
    dispatch(getUserList(localStorage.getItem("jwt")));
  }, []);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {auth.users.map((item, index) => (
            <>
              <div className="flex items-center justify-between w-full">
                <div>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src="https://i.pinimg.com/originals/c1/32/54/c1325499518ff987ce850500c2bed7db.jpg"></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      secondary={`@${item.fullName
                        .split(" ")
                        .join("_")
                        .toLowerCase()}`}
                      primary={item.fullName}
                    ></ListItemText>
                  </ListItem>
                </div>
                <div>
                  <Button
                    className="customeButton"
                    onClick={() => handleAssignedTask(item)}
                  >
                    Chọn
                  </Button>
                </div>
              </div>
              {index !== tasks.length - 1 && <Divider />}
            </>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
