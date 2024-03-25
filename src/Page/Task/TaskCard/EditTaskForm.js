import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksById, updateTask } from "../../../ReduxToolkit/TaskSlice";
import store from "../../../ReduxToolkit/Store";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const tags = [
  "Augular",
  "React",
  "Spring Boot",
  "Vue JS",
  "Node JS",
  "Python ",
];
export default function EditTaskForm({ item, handleClose, open }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { task } = useSelector((store) => store);
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tag: [],
    deadline: new Date(),
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const handeleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (event, value) => {
    setSelectedTags(value);
  };
  const handleDeadlineChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };
  const formateDate = (input) => {
    let {
      $y: year,
      $M: month,
      $D: day,
      $H: hours,
      $m: minutes,
      $s: seconds,
      $ms: milliseconds,
    } = input;
    const date = new Date(
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    );
    const formatedDate = date.toISOString();
    return formatedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { deadline } = formData;
    formData.deadline = formateDate(deadline);
    formData.tag = selectedTags;
    console.log("formData:", formData, "deadline: ", formData.deadline);
    dispatch(updateTask({ id: taskId, updateTaskData: formData }));
    handleClose();
  };

  useEffect(() => {
    dispatch(fetchTasksById(taskId));
  }, [taskId]);

  useEffect(() => {
    if (task.taskDetails) {
      setFormData(task.taskDetails);
    }
  }, [task.taskDetails]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={12}>
                <TextField
                  label="Tiêu đề"
                  fullWidth
                  name="title"
                  value={formData.title}
                  onChange={handeleChange}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Hình ảnh"
                  fullWidth
                  name="image"
                  value={formData.image}
                  onChange={handeleChange}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mô tả chỉ tiết"
                  fullWidth
                  name="description"
                  value={formData.description}
                  onChange={handeleChange}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="multiple-limit-tags"
                  options={tags}
                  onChange={handleTagsChange}
                  getOptionDisabled={(option) => option}
                  renderInput={(params) => (
                    <TextField label="Tags" fullWidth {...params}></TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  components={["TimePicker"]}
                >
                  <DateTimePicker
                    label="Hạn nộp"
                    className="w-full"
                    onChange={handleDeadlineChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Button
                  className="customeButton"
                  type="submit"
                  fullWidth
                  sx={{ padding: ".9rem" }}
                >
                  Cập nhật
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
