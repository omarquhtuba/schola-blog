import { loginStart ,loginFailure, loginSuccess} from "./userRedux"
import {axiosInstance} from '../config'

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axiosInstance.post("/user/login", user);
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure());
    }
}