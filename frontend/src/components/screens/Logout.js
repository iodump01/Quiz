import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const alert = useAlert()
  useEffect(() => {
    dispatch(logout());
    alert.success('Logged Out Successfully.')
    navigate('/login')
  }, [navigate, dispatch, alert]);
  return <div>Logout</div>;
};

export default Logout;
