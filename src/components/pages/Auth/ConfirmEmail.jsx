import React from "react";
import { Link, useParams } from "react-router-dom";
import verifyEmail from "../../../images/verifyEmail.svg";
import "./ConfirmEmail.scss";
import AuthAPI from "../../../API/AuthAPI";
import { useEffect, useState } from "react";

const ConfirmEmail = () => {
  const { token } = useParams();
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const res = await AuthAPI.ConfirmEmail(token);
        if (
          res &&
          res.data &&
          res.data.message === "confirm email successful!"
        ) {
          setValidUrl(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmailUrl();
  }, [token]);

  return (
    <>
      {validUrl ? (
        <div className="verifyEmail">
          <div className="verifyEmail__item">
            <img src={verifyEmail} alt="verify_Email_Image" />
            <h1>Email verified successfully!</h1>
            <Link to="/login">
              <button type="submit" className="btn btn-outline-success btn-lg">
                Login
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};
export default ConfirmEmail;
