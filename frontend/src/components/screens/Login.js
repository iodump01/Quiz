import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/quizActions";
import { login } from "../../actions/userActions";
import Loader from "../Loader";
import MetaData from "../MetaData";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = {
      username,
      password,
    };
    dispatch(login(form));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isLoggedIn) {
      alert.success("Login Successful");
      navigate("/instruction");
    }
  }, [navigate, isLoggedIn, error, dispatch, alert]);
  return (
    <Fragment>
      <MetaData title={'Login - CyberTronic'}/>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-800">
          <div className="relative flex flex-col justify-center min-h-[calc(100vh_-_11rem)] overflow-hidden">
            <div className="w-full p-6 m-auto bg-gray-700 rounded-md shadow-md border-top lg:max-w-md">
              <h1 className="text-3xl font-semibold text-center text-cyan-500">
                Login to give the quiz
              </h1>
              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="relative mb-8">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="w-full h-10 bg-transparent text-white placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-cyan-600"
                    placeholder="john@doe.com"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-0 -top-3.5 text-cyan-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-cyan-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-cyan-500 peer-focus:text-sm"
                  >
                    Username
                  </label>
                </div>
                <div className="relative mb-4">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full h-10 bg-transparent text-white placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-cyan-600"
                    placeholder="john@doe.com"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="Password"
                    className="absolute left-0 -top-3.5 text-cyan-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-cyan-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-cyan-500 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <Link
                  to="/get-password"
                  className="text-xs text-cyan-500 hover:underline"
                >
                  Don't have password?
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
      )}
    </Fragment>
  );
};

export default Login;
