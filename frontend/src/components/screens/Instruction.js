import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from '../MetaData'
import {
  clearErrors,
  getQuiz,
  getResults,
  selectQuiz,
} from "../../actions/quizActions";
import Loader, { SmallLoader } from "../Loader";

const Instruction = () => {
  const dispatch = useDispatch();
  const [pop, setPop] = useState();
  const alert = useAlert();
  const { loading, error, available, selected } = useSelector(
    (state) => state.quiz
  );
  const correct = useSelector((state) => state.correct);
  let data = correct.data;
  let answerLoader = correct.loading;
  const navigate = useNavigate();

  const handleSubmit = (val) => {
    setPop(true);
    dispatch(selectQuiz(val));
  };

  const handleClick = () => {
    if (data && data.totalQuestions) {
      return navigate("/summary");
    }
    navigate("/quiz");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (selected) {
      dispatch(getResults(selected.quizId));
    }
  }, [error, dispatch, selected, alert]);

  useEffect(() => {
    dispatch(getQuiz());
  }, [dispatch]);
  return (
    <Fragment>
      <MetaData title={'CTF - CyberTronic'}/>
      {loading ? (
        <Loader />
      ) : (
        (
          <Fragment>
            {pop ? (
              <div
                className={`absolute h-screen w-screen flex justify-center items-center overflow-x-hidden overflow-y-hidden ${
                  pop ? "block" : "hidden"
                }`}
              >
                {answerLoader ? (
                  <SmallLoader />
                ) : (
                  <div className="h-min-[20%] min-w-[20%] bg-gray-200 rounded shadow-xl grid grid-cols-1 content-between">
                    <div>
                      <p className="my-4 text-xl font-bold text-cyan-500 text-center px-1">
                        {data && data.totalQuestions
                          ? "You have already gave this quiz."
                          : "I confirm to give the quiz"}
                      </p>
                      <p className="my-4 text-xl font-bold text-cyan-700 text-center">
                        {data && data.totalQuestions
                          ? "Click show result to view your result."
                          : "Good Luck!"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <button
                        onClick={() => setPop(false)}
                        className="mx-2 px-3 py-2 text-white text-lg bg-red-500 rounded-full text-semibold ease-in-out transition hover:bg-red-700 shadow-lg"
                      >
                        Close
                      </button>
                      <button
                        onClick={handleClick}
                        className="mx-2 px-3 py-2 text-white text-lg bg-green-500 rounded-full text-semibold ease-in-out transition hover:bg-green-700 shadow-lg"
                      >
                        {data && data.totalQuestions
                          ? "Show Result"
                          : "Confirm"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="container mx-auto bg-gray-800 shadow rounded min-h-[calc(100vh_-_13rem)]">
              <h1 className="text-white text-2xl text-center font-semibold my-2">
                Instruction
              </h1>
              <div className="ml-4">
                <div className="text-white ml-2">
                  <p className="text-lg">Do's:</p>
                  <ul>
                    <li className="flex flex-row items-center">
                      <AiOutlineCheck className="text-green-600 text-xl mr-2" />
                      <p>Make sure your internet works</p>
                    </li>
                    <li className="flex flex-row items-center">
                      <AiOutlineCheck className="text-green-600 text-xl mr-2" />
                      <p>Make sure your battery is fully charged</p>
                    </li>
                    <li className="flex flex-row items-center">
                      <AiOutlineCheck className="text-green-600 text-xl mr-2" />
                      <p>Marks will given you every correct answer.</p>
                    </li>
                    <li className="flex flex-row items-center">
                      <AiOutlineCheck className="text-green-600 text-xl mr-2" />
                      <p>If there is tie between two peoples then whom so ever will solve in least time will be considered as winner.</p>
                    </li>
                    <li className="flex flex-row items-center">
                      <AiOutlineCheck className="text-green-600 text-xl mr-2" />
                      <p>Do give the feedback after the session</p>
                    </li>
                  </ul>
                </div>
                <div className="text-white ml-2">
                  <p>Don't:</p>
                  <ul>
                  <li className="flex flex-row items-center">
                      <AiOutlineClose className="text-red-600 text-xl mr-2" />
                      <p>If any fraudulent activity is observed, then you will be disqualified. You can play the quiz but you will not get rewards.</p>
                    </li>
                    <li className="flex flex-row items-center">
                      <AiOutlineClose className="text-red-600 text-xl mr-2" />
                      <p>When you get the answer please don't share it with any one else you will be disqualify.</p>
                    </li>
                    <li className="flex flex-row items-center">
                      <AiOutlineClose className="text-red-600 text-xl mr-2" />
                      <p>Extra time will not be alloted in any case.</p>
                    </li>
                    <li className="flex flex-row items-center">
                      <AiOutlineClose className="text-red-600 text-xl mr-2" />
                      <p>No discussion is allowed between the game.</p>
                    </li>
                    <li className="flex flex-row items-center">
                      <AiOutlineClose className="text-red-600 text-xl mr-2" />
                      <p>No negative points for the wrong answer.</p>
                    </li>
                    <li className="flex flex-row items-center">
                      <AiOutlineClose className="text-red-600 text-xl mr-2" />
                      <p>You can't go to next level until and unless you solve the current level.</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center py-4">
                <p className="text-2xl text-center text-white my-2">
                  Available Quiz
                </p>
                <div className="flex flex-wrap justify-center items-center">
                {available?.length > 0 ? available.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSubmit(item)}
                    className="px-10 py-3 ml-2 mt-2 lg:mt-0 bg-teal-500 text-white text-xl font-semibold rounded-lg ease-in-out focus:border-1 focus:border-blue-600 hover:bg-teal-700 shadow-lg"
                    title={
                      data && data.correct && data.correct.length > 0
                        ? "You already gave the quiz"
                        : "Click to start your quiz"
                    }
                  >
                    {item.quizName}
                  </button>
                )): <div className="text-center">
                  <p className="text-white">No quiz available right now.</p>
                  </div>}
                </div>
              </div>
            </div>
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default Instruction;
