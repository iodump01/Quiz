import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnswered,
  addTotalTime,
  checkAnswer,
  clearErrors,
  getQuestions,
  removeAnswered,
  resetCheckAnswer,
  currentResponse,
  getResponse,
} from "../../actions/quizActions";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { countDown, timeDifference } from "../Utils";
import MetaData from "../MetaData";

const QuizPage = () => {
  const [dropDown, setDropDown] = useState(true);
  const [answer, setAnswer] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [session, setSession] = useState(new Date().toISOString());
  const [timer, setTimer] = useState(0);
  const { loading, questions, error } = useSelector((state) => state.questions);
  const { ansQuestion, elapsedTime } = useSelector((state) => state.answered);
  const { selected } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.user);
  const { checkedAnswer, cLoading } = useSelector((state) => state.check);
  const { data } = useSelector((state) => state.correct);
  // console.log(data,cLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [disable, setDisable] = useState(true);
  const [endTimer, setEndTimer] = useState(0);
  const [inpError, setInpError] = useState(false)

  useEffect(() => {
    try {
      if (selected?.totalTime) {
        if (elapsedTime) {
          setTimer(selected.totalTime - elapsedTime);
        } else {
          setTimer(selected.totalTime);
        }
      }
      setSession(new Date().toISOString());
      if (data?.correct) {
        return navigate("/summary");
      }
      if (!selected) {
        return navigate("/instruction");
      }
      if (ansQuestion?.length > 0) {
        if (ansQuestion.length < questions.length) {
          if (ansQuestion[ansQuestion.length - 1].answer !== "") {
            setQuestionNumber(ansQuestion.length);
          } else {
            setQuestionNumber(ansQuestion.length - 1);
          }
        } else if (ansQuestion.length === questions.length) {
          setQuestionNumber(questions.length - 1);
        }
      }
      dispatch(addTotalTime(session));
      dispatch(getResponse());
      dispatch(getQuestions(selected.quizId));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, selected, navigate, data, elapsedTime]);

  //handle next button
  const handleNext = (id) => {
    if (answer.length !== 0) {
      dispatch(addAnswered(id, answer, timer));
    }
    if (questionNumber === questions.length - 1) {
      if (window.confirm("Are you sure want to submit ?") === true) {
        return navigate("/summary");
      }
      return;
    }
    setQuestionNumber(questionNumber + 1);
    setAnswer("");
    setDisable(true);
  };
  //handle previous button
  const handlePrev = (id) => {
    if (answer.length !== 0) {
      dispatch(addAnswered(id, answer, timer));
    }
    if (questionNumber === 0) {
      return;
    }
    setQuestionNumber(questionNumber - 1);
    setAnswer("");
  };

  //handle reset button
  const handleReset = (id) => {
    dispatch(removeAnswered(id));
    var elements = document.getElementsByTagName("input");

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].type === "radio") {
        elements[i].checked = false;
      }
    }
    setAnswer("");
  };

  //handle question click
  const changeQuestion = (id) => {
    if (questions[questionNumber].quesLevel !== "") {
      return;
    }
    setQuestionNumber(id);
    setAnswer("");
  };

  //check answer
  const handleCheckAnswer = () => {
    if (answer.length !== 0) {
      setInpError(false)
      dispatch(
        checkAnswer({
          answer,
          quizId: questions[questionNumber].quizId,
          quesId: questions[questionNumber].questionId,
        })
      );
    }else{
      setInpError(true)
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    const intervalId = setInterval(() => {
      setTimer(timer - 1);
      setEndTimer(countDown(selected.quizEndTime));
    }, 1000);
    if (checkedAnswer) {
      if (checkedAnswer === "Correct answer!") {
        alert.success(checkedAnswer);
        dispatch(
          addAnswered(questions[questionNumber].questionId, answer, timer)
        );
        dispatch(currentResponse(timeDifference(session)));
        setDisable(false);
      } else {
        alert.error(checkedAnswer);
      }
      dispatch(resetCheckAnswer());
    }
    if (endTimer === "END") {
      if (answer.length !== 0) {
        dispatch(
          addAnswered(questions[questionNumber].questionId, answer, timer)
        );
      }
      alert.show("Time Out!");
      return navigate("/summary");
    }
    const unloadCallback = () => {
      dispatch(currentResponse(timeDifference(session)));
    };
    window.addEventListener("beforeunload", unloadCallback);

    // clear interval on re-render to avoid memory leaks
    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
      clearInterval(intervalId);
    };
  }, [
    error,
    dispatch,
    questionNumber,
    timer,
    questions,
    alert,
    checkedAnswer,
    navigate,
    answer,
    session,
    endTimer,
  ]);

  return (
    <Fragment>
      <MetaData title={'Quiz - CyberTronic'}/>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {questions && selected && (
            <div className="flex flex-col-reverse xl:flex-row px-2 prevent-select rounded">
              <div className="xl:w-5/6 w-full xl:h-screen h-fit bg-gray-800 mt-2">
                <h1 className="text-center text-white text-2xl my-3 xl:my-16 font-bold">
                  {selected.quizName}
                </h1>
                <div className="container m-auto md:my-4">
                  <div className="flex flex-col justify-center bg-slate-700 shadow-2xl rounded-xl xl:mx-4">
                    <div className="my-2">
                      <div className="flex justify-between items-center relative">
                        <div className="text-teal-500 text-base lg:text-2xl px-2 font-bold overflow-x-auto">
                        <span className="w-full text-slate-500">Question {questionNumber+1}</span>
                          {
                            <div className="mt-2"
                              dangerouslySetInnerHTML={{
                                __html: questions[questionNumber]?.question,
                              }}
                            />
                          }
                          {questions[questionNumber]?.instructions && 
                          <div className="flex flex-wrap items-center text-zinc-300 shadow-lg">
                            <p className="mr-2">Answer Format:</p>
                            <p className="font-semibold">{questions[questionNumber]?.instructions}</p>
                            </div>}
                        </div>
                        <p className="py-1 bg-red-400 rounded-md text-base md:text-2xl px-2 md:font-bold absolute right-1 -top-1 shadow-xl">
                          Marks: {questions[questionNumber].marks}
                        </p>
                      </div>
                      <input
                        name={questions[questionNumber].questionId}
                        value={questions[questionNumber].questionId}
                        className="hidden"
                        readOnly
                      />
                    </div>
                    <div className="px-2 my-2">
                      {questions[questionNumber].questionType === "MCQ" ? (
                        [...Array(4)].map((e, i) => (
                          <div key={i + 1} className="flex items-center mb-4">
                            <input
                              id={"option-" + (i + 1)}
                              type="radio"
                              value={answer}
                              name="default-radio"
                              onChange={() =>
                                setAnswer(
                                  questions[questionNumber][`option${i + 1}`]
                                )
                              }
                              className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-500 border-gray-400"
                              defaultChecked={
                                ansQuestion.find(
                                  (o) =>
                                    o.questionId ===
                                    questions[questionNumber].questionId
                                )
                                  ? ansQuestion.find(
                                      (o) =>
                                        o.questionId ===
                                        questions[questionNumber].questionId
                                    ).answer ===
                                    questions[questionNumber][`option${i + 1}`]
                                  : false
                              }
                            />
                            <label
                              htmlFor={"option-" + (i + 1)}
                              className="ml-2 text-lg font-medium text-black"
                            >
                              {questions[questionNumber][`option${i + 1}`]}
                            </label>
                          </div>
                        ))
                      ) : (
                        <div>
                          <div className="relative mt-8 mb-2">
                            <input
                              id="ques"
                              name="ques"
                              type="text"
                              className="w-full md:w-1/3 h-10 bg-transparent text-white placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-teal-500"
                              placeholder="answer here"
                              required
                              value={
                                ansQuestion.find(
                                  (o) =>
                                    o.questionId ===
                                      questions[questionNumber].questionId &&
                                    o.questionId.answer !== ""
                                )
                                  ? ansQuestion.find(
                                      (o) =>
                                        o.questionId ===
                                        questions[questionNumber].questionId
                                    ).answer
                                  : answer
                              }
                              onChange={(e) => setAnswer(e.target.value)}
                            />
                            <label
                              htmlFor="ques"
                              className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm"
                            >
                              Enter your answer
                            </label>
                          </div>
                          {inpError && answer.length === 0 &&
                          <div className="mt-0">
                            <span className="text-red-500 text-lg">
                              Enter Your answer
                            </span>
                          </div>
}
                          {questions.quesLevel !== "" && (
                            <div className="text-center">
                              <button
                                className={`px-2 py-3 rounded-xl text-white font-bold shadow-xl transition ease-in  focus:border focus:border-green-900 bg-green-600 hover:bg-green-800 `}
                                title="Submit to check answer"
                                onClick={handleCheckAnswer}
                              >
                                <span className="flex flex-row items-center">
                                  <p>Check answer</p>
                                  {cLoading && (
                                    <AiOutlineLoading3Quarters className="text-black animate-spin ml-2" />
                                  )}
                                </span>
                              </button>
                              <p className="mt-2 text-lg text-zinc-400">
                                Click button to check your answer.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row justify-between items-center px-2">
                      <div>
                        {questions[questionNumber].quesLevel === "" ? (
                          <button
                            onClick={() =>
                              handlePrev(questions[questionNumber].questionId)
                            }
                            className={`px-2 py-3 rounded-xl text-white font-bold text-lg my-2 ease-in transition duration-150 shadow-xl ${
                              questionNumber === 0
                                ? "bg-gray-200"
                                : "bg-red-600 hover:bg-red-700 focus:bg-red-700"
                            }`}
                            disabled={questionNumber === 0 ? true : false}
                          >
                            Previous
                          </button>
                        ) : (
                          ""
                        )}
                        <button
                          onClick={() =>
                            handleReset(questions[questionNumber].questionId)
                          }
                          className="ml-2 px-2 py-3 rounded-xl bg-purple-600 text-white font-bold text-lg my-2 hover:bg-purple-700 ease-in transition duration-150 shadow-xl focus:bg-purple-700"
                        >
                          Clear
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          handleNext(questions[questionNumber].questionId)
                        }
                        className={`px-2 py-3 rounded-xl font-bold text-lg my-2 ease-in transition duration-150 shadow-xl ${
                          ansQuestion &&
                          ansQuestion.find(
                            (o) =>
                              o.questionId ===
                                questions[questionNumber].questionId &&
                              o.answer !== ""
                          )
                            ? "bg-teal-500 hover:bg-teal-600 focus:bg-teal-800 text-white"
                            : "bg-gray-200/5 border-teal-500 border-2 text-teal-500"
                        }`}
                        disabled={
                          ansQuestion &&
                          ansQuestion.find(
                            (o) =>
                              o.questionId ===
                                questions[questionNumber].questionId &&
                              o.answer !== ""
                          )
                            ? false
                            : disable
                        }
                      >
                        {questionNumber === questions.length - 1
                          ? "Submit"
                          : disable
                          ? "Save & Next"
                          : "Next"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-1/6 md:mt-2 lg:mx-2">
                <div className="flex flex-col justify-center items-center">
                  <div className="bg-gray-800 w-full flex flex-col">
                    <div className="flex flex-row justify-between items-center p-3">
                      <p className="text-lg text-white">Name: </p>
                      <p className="text-lg font-bold text-cyan-600">
                        {user.name}
                      </p>
                    </div>
                    <div className="flex flex-row justify-between items-center p-3">
                      <p className="text-lg text-white">Time Left: </p>
                      <p className="text-lg font-bold text-green-500">
                        {endTimer}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-800 my-2 relative h-fit w-full">
                    <p className="text-center mx-auto my-2 text-white text-xl">
                      Total Questions
                    </p>
                    <AiOutlineDown
                      onClick={() => setDropDown(!dropDown)}
                      className={`absolute right-2 top-2 text-white cursor-pointer text-2xl transition duration-100 ease-in-out  ${
                        dropDown ? "rotate-180" : ""
                      }`}
                    />
                    <div
                      className={`flex flex-wrap transition-all ease-out ${
                        dropDown ? "visible max-h-fit" : "collapse max-h-0"
                      }`}
                    >
                      {questions.map((e, i) => (
                        <Fragment key={i}>
                          <p
                            className={`p-3 m-2 rounded-xl text-bold cursor-pointer ${
                              ansQuestion &&
                              ansQuestion.find(
                                (o) =>
                                  o.questionId === e.questionId &&
                                  o.answer !== ""
                              )
                                ? "text-white bg-green-600"
                                : "text-black bg-gray-300"
                            }`}
                            onClick={() => changeQuestion(i)}
                          >
                            {i + 1}
                          </p>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default QuizPage;
