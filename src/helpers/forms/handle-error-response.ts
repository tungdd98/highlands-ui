import { MessagesEnum } from "constants/message.constants";
import { displaySnackbar } from "redux/snackbar.slice";
import { AppDispatch } from "redux/store";

export const handleErrorResponse = ({
  dispatch,
}: {
  dispatch: AppDispatch;
}) => {
  dispatch(
    displaySnackbar({
      message: MessagesEnum.ERROR,
    })
  );
};
