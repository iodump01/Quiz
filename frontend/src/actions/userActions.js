import {
  FAIL_RESET_USER,
  FAIL_USER_LOGIN,
  REQUEST_RESET_USER,
  REQUEST_USER_LOGIN,
  SUCCESS_RESET_USER,
  SUCCESS_USER_LOGIN,
  USER_LOGOUT,
} from "../constants/userConstant";
import axios from "axios";
import {
  GET_CORRECT_ANSWERS_RESET,
  GET_QUESTIONS_RESET,
  GET_QUIZ_RESET,
  RESET_ANSWERED_QUESTIONS,
} from "../constants/quizConstants";

//login
export const login = (cred) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_USER_LOGIN });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post("/api/login", cred, config);
    dispatch({
      type: SUCCESS_USER_LOGIN,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAIL_USER_LOGIN,
      payload: error.response.data.error,
    });
  }
};

//logout
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: RESET_ANSWERED_QUESTIONS });
    dispatch({ type: GET_CORRECT_ANSWERS_RESET });
    dispatch({ type: GET_QUESTIONS_RESET });
    dispatch({ type: GET_QUIZ_RESET });
  } catch (error) {
    console.log(error);
  }
};

//reset
export const resetUser = (email) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_RESET_USER });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post("/api/resend", email, config);
    dispatch({
      type: SUCCESS_RESET_USER,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FAIL_RESET_USER,
      payload: error.response.data.error,
    });
  }
};
