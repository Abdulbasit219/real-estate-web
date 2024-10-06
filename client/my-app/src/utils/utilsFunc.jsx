import { deleteUserStart, deleteUserSuccess } from "../redux/user/Userslice";

export const handleLogout = (dispatch) => {
  dispatch(deleteUserStart());
  localStorage.removeItem("persist:root");
  dispatch(deleteUserSuccess());
};
