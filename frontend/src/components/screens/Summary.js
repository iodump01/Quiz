import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, correctAnswers } from "../../actions/quizActions";
import SummaryChart from "../SummaryChart";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useAlert } from "react-alert";
import { timeDifference } from "../Utils";
import MetaData from "../MetaData";

const Summary = () => {
  const { ansQuestion, totalTime, elapsedTime } = useSelector(
    (state) => state.answered
  );
  const { user } = useSelector((state) => state.user);
  const { selected } = useSelector((state) => state.quiz);
  const { loading, data, error } = useSelector((state) => state.correct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  useEffect(() => {
    if (!selected) {
      return navigate("/instruction");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      return navigate("/instruction");
    }
    const dataVal = {
      answered: JSON.stringify(ansQuestion),
      quizId: selected.quizId,
      timeTaken: elapsedTime + timeDifference(totalTime),
    };

    if (data?.length < 1) {
      if (totalTime) {
        dispatch(correctAnswers(dataVal));
      } else {
        navigate("/instruction");
      }
    }
  }, [
    dispatch,
    ansQuestion,
    selected,
    navigate,
    error,
    data,
    totalTime,
    alert,
  ]);
  return (
    <Fragment>
      <MetaData title={`Result for ${user?.name && user.name} - CyberTronic`} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {data && data.correct && selected && (
            <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto bg-gray-800 rounded shadow h-fit">
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-emerald-500">
                  Summary result: {selected.quizName}
                </h1>
              </div>
              <div className="sm:h-96 flex flex-col md:flex-row justify-evenly items-center py-2">
                <div className="h-96 w-5/6 sm:w-[30%] flex justify-center items-center">
                  <SummaryChart
                    answered={data.correct.length}
                    total={data.totalQuestions}
                  />
                </div>
                <div className="my-2 lg:my-0">
                  <span className="text-white text-lg flex flex-row items-center justify-center md:justify-start">
                    <p>Answered Questions</p>
                    <p className="font-bold ml-2">{data.correct.length}</p>
                  </span>
                  <span className="text-white text-lg flex flex-row items-center justify-center md:justify-start">
                    <p>Unanswered Questions</p>
                    <p className="font-bold ml-2">
                      {data.totalQuestions - data.correct.length}
                    </p>
                  </span>
                  <span className="text-white text-lg flex flex-row items-center justify-center md:justify-start">
                    <p>Total Questions</p>
                    <p className="font-bold ml-2">{data.totalQuestions}</p>
                  </span>
                  <span className="text-cyan-500 font-semibold text-lg flex flex-row items-center justify-center md:justify-start">
                    <p>Total Marks</p>
                    <p className="font-bold ml-2">{selected.totalMarks}</p>
                  </span>
                  <span className="text-amber-500 font-semibold text-lg flex flex-row items-center justify-center md:justify-start">
                    <p>Marks Obtained</p>
                    <p className="font-bold ml-2">{data.marks}</p>
                  </span>
                  <span className="text-lime-500 font-semibold text-lg flex flex-row items-center justify-center md:justify-start">
                    <p>Score</p>
                    <p className="font-bold ml-2">
                      {Math.floor((data.marks / selected.totalMarks) * 100)} %
                    </p>
                  </span>
                  <span className="text-red-500 font-semibold text-lg flex flex-row items-center justify-center md:justify-start">
                    <p>Time Taken</p>
                    <p className="font-bold ml-2">
                      {(data.timeTaken / 60).toFixed(2) +
                        (data.timeTaken > 60 ? " Minutes" : " Minute")}
                    </p>
                  </span>
                </div>
              </div>
              <div className="my-2">
                <div className="text-center">
                  <p className="text-white text-xl font-bold">Questions</p>
                </div>
                {data.correct &&
                  data.correct.map((item, i) => (
                    <div
                      key={i + 1}
                      className="my-2 bg-gray-200 px-4 w-full lg:w-1/2 mx-auto py-2 flex flex-col"
                    >
                      <div className="bg-gray-300 p-2 flex flex-col lg:flex-row lg:justify-between">
                        <span className="flex flex-row items-center">
                          <p>{i + 1}.</p>
                          <div className="ml-2 font-bold overflow-x-auto">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.question,
                              }}
                            />
                          </div>
                        </span>
                        <p className="text-xs sm:text-base overflow-hidden text-right">
                          Marks: {item.marks}
                        </p>
                      </div>
                      <div
                        className={`flex overflow-x-auto flex-row p-2 my-2 items-center ${
                          item.result === "wrong"
                            ? "bg-red-400"
                            : "bg-green-400"
                        }`}
                      >
                        <p className="text-base">
                          {item.markedAnswer.charAt(0).toUpperCase() +
                            item.markedAnswer.slice(1)}
                        </p>
                        {item.result === "wrong" ? (
                          <AiOutlineClose className="text-2xl ml-2 text-red-900 text-bold" />
                        ) : (
                          <AiOutlineCheck className="text-2xl ml-2 text-green-800 text-bold" />
                        )}
                      </div>
                      {item.result === "wrong" && (
                        <div className="bg-green-400 p-2">
                          {item.correctAnswer.charAt(0).toUpperCase() +
                            item.correctAnswer.slice(1)}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Summary;
