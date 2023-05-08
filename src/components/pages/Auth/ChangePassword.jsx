import { useState } from "react";
import AuthAPI from "../../../API/AuthAPI";
import { Navigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Label } from "reactstrap";

const ChangePassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });

  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState(false);

  const [redirect, setRedirect] = useState(false);
  const userID = localStorage.getItem("userID");

  const initialValue = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const [formValue, setFormValue] = useState(initialValue);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmitForm = async () => {
    const data = {
      userID: userID,
      password: formValue.password,
      newPassword: formValue.newPassword,
      confirmNewPassword: formValue.confirmNewPassword,
    };
    await AuthAPI.ChangePassword(data)
      .then((res) => {
        console.log("res-->", res);
        if (res.data.message === "change password successful") {
          alert("Change password successful!");
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === "wrong password") {
          setIsErrorPassword(true);
        } else if (
          error.response.data.message ===
          "Confirm New Password does not match New Password"
        ) {
          setIsErrorPassword(false);
          setIsErrorConfirmPassword(true);
        }
      });
  };
  return (
    <MDBContainer className="auth" fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Change Password</h2>
              <Form onSubmit={handleSubmit(handleSubmitForm)}>
                <Label>Current Password</Label>
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  size="lg"
                  id="formControlLg"
                  type="password"
                  name="password"
                  value={formValue.password}
                  {...register("password", {
                    required: "Current password is required",
                    onChange: (e) => {
                      handleOnChange(e);
                    },
                  })}
                />
                {errors.password && (
                  <p style={{ color: "red", marginLeft: "0.5rem" }}>
                    {errors?.password.message}
                  </p>
                )}
                {isErrorPassword && (
                  <p style={{ color: "red" }}>Wrong Password</p>
                )}
                <Label>New Password</Label>
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  name="newPassword"
                  value={formValue.newPassword}
                  {...register("newPassword", {
                    required: "New Password is required!",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password require minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
                    },
                    onChange: (e) => {
                      handleOnChange(e);
                    },
                  })}
                />
                {errors.newPassword && (
                  <p style={{ color: "red", marginLeft: "0.5rem" }}>
                    {errors?.newPassword.message}
                  </p>
                )}

                <Label>Confirm New Password</Label>
                <MDBInput
                  wrapperClass="mb-2 w-100"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  name="confirmNewPassword"
                  value={formValue.confirmNewPassword}
                  {...register("confirmNewPassword", {
                    required: "Confirm New Password is required!",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password require minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
                    },
                    onChange: (e) => {
                      handleOnChange(e);
                    },
                  })}
                />
                {errors.confirmNewPassword && (
                  <p style={{ color: "red", marginLeft: "0.5rem" }}>
                    {errors?.confirmNewPassword.message}
                  </p>
                )}
                {isErrorConfirmPassword && (
                  <p style={{ color: "red" }}>
                    Confirm New Password does not match New Password!
                  </p>
                )}
                {redirect && <Navigate to="/" />}
                <MDBBtn
                  style={{
                    width: "100%",
                    transition: "none",
                    height: "3.5rem",
                  }}
                  size="lg"
                >
                  Change Password
                </MDBBtn>
              </Form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ChangePassword;
