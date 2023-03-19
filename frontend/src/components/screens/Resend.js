import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/quizActions";
import { resetUser } from "../../actions/userActions";
import { SmallLoader } from "../Loader";
import MetaData from "../MetaData";

const Resend = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isLoggedIn, message } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetUser({ email }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isLoggedIn) {
      navigate("/instruction");
    }
    if (message) {
      alert.success(message);
      navigate("/login");
    }
  }, [navigate, isLoggedIn, error, dispatch, alert, message]);
  return (
    <Fragment>
      <MetaData title={'Resend Password - CyberTronic'}/>
      {loading && (
        <div className="absolute flex justify-center items-center h-screen w-screen z-10 backdrop-blur-sm">
          <SmallLoader />
        </div>
      )}
      <div className="bg-gray-800">
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-gray-700 rounded-md shadow-md border-top lg:max-w-md">
            <h1 className="text-3xl font-semibold text-center text-cyan-500">
              Enter email to get password.
            </h1>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="relative mb-8">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full h-10 bg-transparent text-white placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-cyan-600"
                  placeholder="john@doe.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="Email"
                  className="absolute left-0 -top-3.5 text-cyan-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-cyan-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-cyan-500 peer-focus:text-sm"
                >
                  Email
                </label>
              </div>
              <Link
                to="/login"
                className="text-xs text-cyan-500 hover:underline"
              >
                Back to login
              </Link>
              <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-cyan-800 rounded-md hover:bg-cyan-600 focus:outline-none focus:bg-cyan-600">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Resend;
