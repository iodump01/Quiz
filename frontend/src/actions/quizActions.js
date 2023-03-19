import {
  ADD_ANSWERED_QUESTIONS,
  ADD_TOTAL_TIME,
  CHECK_CORRECT_ANSWER_FAIL,
  CHECK_CORRECT_ANSWER_REQUEST,
  CHECK_CORRECT_ANSWER_RESET,
  CHECK_CORRECT_ANSWER_SUCCESS,
  CLEAR_ERRORS,
  GET_CORRECT_ANSWERS_FAIL,
  GET_CORRECT_ANSWERS_REQUEST,
  GET_CORRECT_ANSWERS_SUCCESS,
  GET_QUESTIONS_FAIL,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUIZ_FAIL,
  GET_QUIZ_REQUEST,
  GET_QUIZ_SUCCESS,
  REMOVE_ANSWERED_QUESTIONS,
  SELECTED_QUIZ,
  GET_SAVE_RESPONSE_REQUEST,
  GET_SAVE_RESPONSE_SUCCESS,
  GET_SAVE_RESPONSE_FAIL,
  RESET_ANSWERED_QUESTIONS,
  SAVE_CURRENT_RESPONSE_REQUEST,
  SAVE_CURRENT_RESPONSE_SUCCESS,
  SAVE_CURRENT_RESPONSE_FAIL,
} from "../constants/quizConstants";
import axios from "axios";
import { timeDifference } from "../components/Utils";

export const getQuiz = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_QUIZ_REQUEST });
    const config = {
      headers: { Authorization: `Bearer ${getState().user.token}` },
    };

    const { data } = await axios.get("https://quantafile.com/api/quiz", config);
    dispatch({
      type: GET_QUIZ_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_QUIZ_FAIL,
      payload: error.response.data.error,
    });
  }
};

//select quiz
export const selectQuiz = (quiz) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_QUIZ,
      payload: quiz,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_QUESTIONS_REQUEST });

    const config = {
      headers: { Authorization: `Bearer ${getState().user.token}` },
    };

    const { data } = await axios.get(`https://quantafile.com/api/get-questions?id=${id}`, config);
    dispatch({
      type: GET_QUESTIONS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_QUESTIONS_FAIL,
      payload: error.response.data.error,
    });
  }
};

//Add answered questions
export const addAnswered = (id, answer, time) => async (dispatch, getState) => {
  dispatch({
    type: ADD_ANSWERED_QUESTIONS,
    payload: {
      questionId: id,
      time,
      answer,
    },
  });

  localStorage.setItem(
    "answered",
    JSON.stringify(getState().answered.ansQuestion)
  );
};

//Add answered questions
export const getResponse = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SAVE_RESPONSE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getState().user.token}`,
      },
    };
    const { data } = await axios.get(
      `https://quantafile.com/api/save-response?quizid=${getState().quiz.selected.quizId}`,
      config
    );
    dispatch({
      type: GET_SAVE_RESPONSE_SUCCESS,
      payload: data.data,
    });

    localStorage.setItem(
      "answered",
      JSON.stringify(getState().answered.ansQuestion)
    );
  } catch (error) {
    dispatch({
      type: GET_SAVE_RESPONSE_FAIL,
      payload: error.response.data.error,
    });
  }
};

//save current response
export const currentResponse = (sec) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVE_CURRENT_RESPONSE_REQUEST });

    let val = {
      answered: JSON.stringify(getState().answered.ansQuestion),
      time: sec,
      quizId: getState().quiz.selected.quizId,
    };

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getState().user.token}`,
      },
    };
    const { data } = await axios.post("https://quantafile.com/api/save-response", val, config);
    dispatch({
      type: SAVE_CURRENT_RESPONSE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: SAVE_CURRENT_RESPONSE_FAIL,
      payload: error.response.data.error,
    });
  }
};

// Remove Questions
export const removeAnswered = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ANSWERED_QUESTIONS,
    payload: id,
  });

  localStorage.setItem(
    "answered",
    JSON.stringify(getState().answered.ansQuestion)
  );
};

//correct answers
export const correctAnswers = (val) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CORRECT_ANSWERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getState().user.token}`,
      },
    };
    const { data } = await axios.post("https://quantafile.com/api/result", val, config);
    dispatch({
      type: GET_CORRECT_ANSWERS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CORRECT_ANSWERS_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getResults = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CORRECT_ANSWERS_REQUEST });

    const config = {
      headers: { Authorization: `Bearer ${getState().user.token}` },
    };
    const { data } = await axios.get(`https://quantafile.com/api/get-result?id=${id}`, config);
    dispatch({
      type: GET_CORRECT_ANSWERS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CORRECT_ANSWERS_FAIL,
      payload: error.response.data.error,
    });
  }
};
//add total time taken
export const addTotalTime = (time) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_TOTAL_TIME,
      payload: time,
    });
  } catch (error) {
    console.log(error);
  }
};

//check answer
export const checkAnswer = (val) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHECK_CORRECT_ANSWER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getState().user.token}`,
      },
    };
    const { data } = await axios.post("https://quantafile.com/api/check-answer", val, config);
    dispatch({
      type: CHECK_CORRECT_ANSWER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: CHECK_CORRECT_ANSWER_FAIL,
      payload: error.response.data.error,
    });
  }
};

//reset check answer
export const resetCheckAnswer = () => async (dispatch) => {
  try {
    dispatch({ type: CHECK_CORRECT_ANSWER_RESET });
  } catch (error) {
    console.log(error);
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
