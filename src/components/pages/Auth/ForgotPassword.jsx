import { Link, Navigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import AuthAPI from "../../../API/AuthAPI";

const ForgotPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });
  const [redirect, setRedirect] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const handleSubmitForm = async (data) => {
    const formData = {
      email: data.email,
    };
    await AuthAPI.ForgotPassword(formData)
      .then((res) => {
        console.log("res-->", res);
        if (res.data.message === "reset password successful") {
          alert("Reset password successful! Please check your email!");
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === "wrong email") {
          setIsErrorEmail(true);
        }
      });
  };

  return (
    <div
      className="card text-center"
      style={{ width: "300px", margin: "70px auto" }}
    >
      <div className="card-header h5 text-white bg-primary">Password Reset</div>
      <div className="card-body px-5">
        <p className="card-text py-2">
          Enter your email address and we'll send you an email with instructions
          to reset your password.
        </p>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="form-outline">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email!",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  className="form-control my-3"
                  type="email"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors?.email.message}</p>
            )}
            {isErrorEmail && <p style={{ color: "red" }}>Wrong Email!</p>}
            <label className="form-label" htmlFor="typeEmail">
              Email input
            </label>
          </div>
          {redirect && <Navigate to="/login" />}
          <button type="submit" className="btn btn-primary w-100">
            Reset password
          </button>
        </form>
        <div className="d-flex justify-content-between mt-4">
          <Link style={{ textDecoration: "none" }} to="/login">
            Login
          </Link>
          <Link style={{ textDecoration: "none" }} to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
