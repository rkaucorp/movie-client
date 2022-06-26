import * as React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ModalProps } from "../../Interface";
import InputButton from "../InputButton";
import useHook from "../../store/hook";
import { Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MovieModel: React.FC<ModalProps> = ({ open, setOpen }) => {
  const [title, setTitle] = React.useState("");
  const [errors, setErrors] = React.useState("");
  const state: any = useSelector(state => state);
  const { addNewMovie, resetHttpStateMessage } = useHook();
  const handleChange =
    (name: string) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.target.value);
    };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!title) {
      return setErrors("Movie Name Is Required");
    }
    if (await addNewMovie(title)) {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    resetHttpStateMessage();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Do you want to Add New Movie in your List?"}
        </DialogTitle>
        {state?.httpError && (
          <Typography
            variant="caption"
            gutterBottom
            component="div"
            sx={{ textAlign: "center", color: "red" }}
          >
            {state?.httpError}
          </Typography>
        )}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <InputButton
              fullWidth
              id="title"
              name="title"
              label="Movie Name"
              value={title}
              onChange={handleChange("title")}
              helperText={errors && errors}
              error={errors}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieModel;
