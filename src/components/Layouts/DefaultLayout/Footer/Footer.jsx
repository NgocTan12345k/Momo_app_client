import React, { useEffect, useState } from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  BsFacebook,
  BsTwitter,
  BsGoogle,
  BsInstagram,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";
import "./Footer.scss";
import { AiOutlineArrowUp } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DonationAPI from "../../../../API/DonationAPI";
import { useForm, Controller } from "react-hook-form";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { Label } from "reactstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import PostAPI from "../../../../API/PostAPI";

const Footer = () => {
  // const [display, setDisplay] = useState("block");
  const email = localStorage.getItem("email");
  const user_id = localStorage.getItem("userID");
  const [posts, setPosts] = useState([]);

  const handleScrollTop = () => {
    // setDisplay("none");
    window.scrollTo(0, 0);
  };
  // console.log("display-->", display);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ mode: "all" });

  useEffect(() => {
    const getAllPost = async () => {
      await PostAPI.getAllPost()
        .then((res) => {
          setPosts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllPost();
  }, []);

  const handleSubmitForm = async (data) => {
    if (!user_id) {
      alert("Bạn phải đăng nhập tài khoản để thực hiện quyên góp!");
      window.location.assign("/login");
    } else {
      const post_id_list =
        posts && posts.length > 0 && posts.map((item) => item._id);
      const post_id = post_id_list[Math.round(Math.random() * posts.length)];
      const formData = {
        email: email,
        user_id: user_id,
        post_id: post_id,
        amount: data.amount,
        payment: data.payment.value,
      };

      await DonationAPI.addDonation(formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "add donation successful") {
            alert("Chúc mừng bạn đã quyên góp thành công!");
            setShow(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Quyên góp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleSubmitForm)}>
            <Label>Số tiền quyên góp</Label>
            <Controller
              name="amount"
              type="number"
              control={control}
              rules={{ required: "Vui lòng nhập số tiền quyên góp!" }}
              render={({ field: { onChange, value } }) => (
                <MDBInput onChange={onChange} value={value} />
              )}
            />
            {errors.amount && (
              <p style={{ color: "red" }}>{errors?.amount.message}</p>
            )}
            <Label>Phương thức thanh toán</Label>
            <Controller
              name="payment"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "Credit Card", label: "Credit Card" },
                    { value: "Paypal", label: "Paypal" },
                    { value: "Banking", label: "Banking" },
                  ]}
                />
              )}
            />

            <MDBBtn
              style={{ width: "8rem", height: "2.5rem" }}
              className="mt-4"
              variant="primary"
              type="submit"
            >
              Quyên góp
            </MDBBtn>
          </Form>
        </Modal.Body>
      </Modal>
      <MDBFooter className="text-center text-lg-start text-light bg-dark">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div style={{ display: "flex" }}>
            <a href="#/" className="me-4 text-reset">
              <BsFacebook />
            </a>
            <a href="#/" className="me-4 text-reset">
              <BsTwitter />
            </a>
            <a href="#/" className="me-4 text-reset">
              <BsGoogle />
            </a>
            <a href="#/" className="me-4 text-reset">
              <BsInstagram />
            </a>
            <a href="#/" className="me-4 text-reset">
              <BsLinkedin />
            </a>
            <a href="#/" className="me-4 text-reset">
              <BsGithub />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Công Ty Cổ Phần Dịch Vụ Di Động Trực Tuyến
                </h6>
                <p>
                  Lầu 6, Toà nhà Phú Mỹ Hưng, số 8 Hoàng Văn Thái, khu phố 1,
                  Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" />
                  Địa chỉ: Tầng M, Tòa nhà Victory Tower, Số 12 Tân Trào, Phường
                  Tân Phú, Quận 7, Thành phố Hồ Chí Minh
                </p>
                <p>
                  <MDBIcon icon="envelope" />
                  Email: hotro@momo.vn
                </p>
                <p>
                  <MDBIcon icon="phone" /> Hotline: 1900 5454 41 (1000 đ/phút)
                </p>
                <p>
                  <MDBIcon icon="print" /> Tổng đài gọi ra: 028.7306.5555 -
                  028.9999.5555
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          ©Copyright M_Service 2023
        </div>
        <div
          className="scroll__top"
          onClick={handleScrollTop}
          // style={{ display: display }}
        >
          <div className="scroll__top-item">
            <AiOutlineArrowUp size="1.25rem" />
          </div>
        </div>
        <div
          className="footer__btn"
          // style={{ display: display }}
        >
          <div className="footer__btn-item">
            <Button onClick={handleShow}>Quyên góp ngay</Button>
          </div>
        </div>
      </MDBFooter>
    </>
  );
};

export default Footer;
