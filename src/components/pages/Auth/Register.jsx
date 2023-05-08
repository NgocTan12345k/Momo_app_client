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
import { useState } from "react";
import AuthAPI from "../../../API/AuthAPI";
import { Label } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Navigate } from "react-router-dom";

const Register = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });
  const [redirect, setRedirect] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const handleSubmitForm = (data) => {
    const formData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: "client",
    };
    const Register = async () => {
      await AuthAPI.Register(formData)
        .then((res) => {
          console.log("res-->", res);
          if (res.data.message === "register successful") {
            setRedirect(true);
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("erros-->", error.response.data.message);
          if (error.response.data.message === "email already exists") {
            setIsErrorEmail(true);
          }
        });
    };
    Register();
  };
  return (
    <div>
      <MDBContainer className="auth" fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Register</h2>

                <Form onSubmit={handleSubmit(handleSubmitForm)}>
                  <Label>Full Name</Label>
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{
                      required: "Full Name is required!",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <MDBInput size="lg" onChange={onChange} value={value} />
                    )}
                  />
                  {errors.fullName && (
                    <p style={{ color: "red" }}>{errors?.fullName.message}</p>
                  )}

                  <Label>Email</Label>
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
                      <MDBInput
                        size="lg"
                        type="email"
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.email && (
                    <p
                      style={{
                        color: "red",
                      }}
                    >
                      {errors?.email.message}
                    </p>
                  )}
                  {isErrorEmail && (
                    <p
                      style={{
                        color: "red",
                      }}
                    >
                      Email already exist!
                    </p>
                  )}

                  <Label>Password</Label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required!",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password require minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!",
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <MDBInput
                        size="lg"
                        type="password"
                        onChange={onChange}
                        value={value}
                      />
                    )}
                  />
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors?.password.message}</p>
                  )}

                  {redirect && <Navigate to="/login" />}

                  <MDBBtn
                    className="mt-4 w-100"
                    variant="primary"
                    type="submit"
                    style={{ height: "3.5rem" }}
                  >
                    Register
                  </MDBBtn>
                </Form>
                <hr className="my-4" />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Register;
