import {
  GET_QUIZ_REQUEST,
  GET_QUIZ_SUCCESS,
  GET_QUIZ_FAIL,
  CLEAR_ERRORS,
  GET_QUESTIONS_REQUEST,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL,
  ADD_ANSWERED_QUESTIONS,
  REMOVE_ANSWERED_QUESTIONS,
  GET_CORRECT_ANSWERS_REQUEST,
  GET_CORRECT_ANSWERS_SUCCESS,
  GET_CORRECT_ANSWERS_FAIL,
  SELECTED_QUIZ,
  RESET_ANSWERED_QUESTIONS,
  GET_QUESTIONS_RESET,
  GET_CORRECT_ANSWERS_RESET,
  ADD_TOTAL_TIME,
  CHECK_CORRECT_ANSWER_REQUEST,
  CHECK_CORRECT_ANSWER_RESET,
  CHECK_CORRECT_ANSWER_FAIL,
  CHECK_CORRECT_ANSWER_SUCCESS,
  GET_SAVE_RESPONSE_SUCCESS,
  GET_SAVE_RESPONSE_REQUEST,
  GET_SAVE_RESPONSE_FAIL,
} from "../constants/quizConstants";
export const quizReducer = (state = { available: {} }, action) => {
  switch (action.type) {
    case GET_QUIZ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_QUIZ_SUCCESS:
      return {
        loading: false,
        available: action.payload,
      };
    case GET_QUIZ_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SELECTED_QUIZ:
      return {
        ...state,
        selected: action.payload,
      };

    case RESET_ANSWERED_QUESTIONS:
      return {
        ...state,
        selected: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const questionsReducer = (state = { questions: null }, action) => {
  switch (action.type) {
    case GET_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_QUESTIONS_SUCCESS:
      return {
        loading: false,
        questions: action.payload,
      };
    case GET_QUESTIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_QUESTIONS_RESET:
      return {
        ...state,
        questions: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//handle answered questions
export const handleQuestions = (
  state = { ansQuestion: {}, totalTime: null, elapsedTime: null },
  action
) => {
  switch (action.type) {
    case ADD_ANSWERED_QUESTIONS:
      const item = action.payload;

      const isItemExist = state.ansQuestion.find(
        (i) => i.questionId === item.questionId
      );

      if (isItemExist) {
        return {
          ...state,
          ansQuestion: state.ansQuestion.map((i) =>
            i.questionId === isItemExist.questionId ? item : i
          ),
        };
      } else {
        return {
          ...state,
          ansQuestion: [...state.ansQuestion, item],
        };
      }
    case GET_SAVE_RESPONSE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SAVE_RESPONSE_SUCCESS:
      return {
        ...state,
        loading: false,
        ansQuestion: action.payload.answered,
        elapsedTime: action.payload.timeTaken,
      };
    case GET_SAVE_RESPONSE_FAIL:
      return {
        ...state,
        error: null,
      };

    case ADD_TOTAL_TIME:
      return {
        ...state,
        totalTime: action.payload,
      };

    case REMOVE_ANSWERED_QUESTIONS:
      return {
        ...state,
        ansQuestion: state.ansQuestion.filter(
          (i) => i.questionId !== action.payload
        ),
      };
    case RESET_ANSWERED_QUESTIONS:
      return {
        ...state,
        ansQuestion: [],
        totalTime: null,
        elapsedTime: null,
      };

    default:
      return state;
  }
};

//correct answers
export const correctAnswerReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_CORRECT_ANSWERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CORRECT_ANSWERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CORRECT_ANSWERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case GET_CORRECT_ANSWERS_RESET:
      return {
        ...state,
        data: [],
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
//check answer
export const checkAnswer = (state = { checkedAnswer: null }, action) => {
  switch (action.type) {
    case CHECK_CORRECT_ANSWER_REQUEST:
      return {
        ...state,
        cLoading: true,
      };
    case CHECK_CORRECT_ANSWER_SUCCESS:
      return {
        ...state,
        cLoading: false,
        checkedAnswer: action.payload,
      };
    case CHECK_CORRECT_ANSWER_FAIL:
      return {
        ...state,
        cLoading: false,
        error: action.payload,
      };
    case CHECK_CORRECT_ANSWER_RESET:
      return {
        ...state,
        cLoading: false,
        checkedAnswer: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
