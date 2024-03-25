import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createTask } from "../../ReduxToolkit/TaskSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
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
export default function CreateTaskForm({ handleClose, open }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tag: [],
    deadLine: new Date(),
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
    setFormData({ ...formData, deadLine: date });
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
    const { deadLine } = formData;
    formData.deadLine = formateDate(deadLine);
    formData.tag = selectedTags;
    dispatch(createTask(formData));
    console.log("formData:", formData, "deadline: ", formData.deadLine);
    handleClose();
  };
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
                  Tạo
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
