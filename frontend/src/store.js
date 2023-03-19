import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  checkAnswer,
  correctAnswerReducer,
  handleQuestions,
  questionsReducer,
  quizReducer,
} from "./reducers/quizReducer";
import { loginReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  quiz: quizReducer,
  questions: questionsReducer,
  answered: handleQuestions,
  user: loginReducer,
  correct: correctAnswerReducer,
  check: checkAnswer
});

let initialState = {
  answered: {
    ansQuestion: localStorage.getItem("answered")
      ? JSON.parse(localStorage.getItem("answered"))
      : [],
  },
  user: {
    loading: false,
    isLoggedIn: false,
  },
  check: {
    cLoading: false,
  },
};
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
export default store;
