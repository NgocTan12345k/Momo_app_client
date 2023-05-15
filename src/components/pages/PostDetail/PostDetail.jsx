import React, { useEffect, useState, memo } from "react";
import "./PostDetail.scss";
import PostAPI from "../../../API/PostAPI";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import parse from "html-react-parser";
import { Button, Card, ProgressBar } from "react-bootstrap";
import convertMoney from "../../../convertMoney";
import DonationAPI from "../../../API/DonationAPI";
import { Link } from "react-router-dom";
import CardComponent from "../Card/CardComponent";
import { AiOutlineArrowRight, AiOutlineClose } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { useForm, Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Label } from "reactstrap";
import Select from "react-select";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const [donations, setDonations] = useState([]);
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const email = localStorage.getItem("email");
  const user_id = localStorage.getItem("userID");
  const [slideNumber, setSlideNumber] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ mode: "all" });

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  const { id } = useParams();
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await Promise.all([
          PostAPI.getPostDetail(id),
          DonationAPI.getAllDonation(),
          PostAPI.getAllPost(),
        ]);
        setLoading(false);
        setPost(res[0].data);
        setDonations(res[1].data);
        setPosts(res[2].data);
      } catch {
        throw Error("Promise failed");
      }
    };
    fetchAll();
  }, [id]);

  let now = new Date();
  let endDate = new Date(post.dateEnd);
  const diffTime = endDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const donationDetail =
    donations &&
    donations.length > 0 &&
    donations.filter((item) => {
      return item.post_id._id === post._id;
    });

  const postsDifferentID = posts.filter((item) => item._id !== id);
  const onePost = postsDifferentID.slice(0, 1);
  const threePosts = postsDifferentID.slice(1, 4);

  // onePost
  const onePostID = onePost.map((item) => {
    return item._id;
  });
  // Đếm số lượt quyên góp, số tiền theo post_id
  const onePostCount = onePostID.map((item) => {
    return {
      id: item,
      donations: donations.filter((donation) => donation.post_id._id === item)
        .length,
      amount: donations
        .filter((donation) => donation.post_id._id === item)
        .map((data) => data.amount),
    };
  });

  // threePosts
  const threePostsID = threePosts.map((item) => {
    return item._id;
  });
  // Đếm số lượt quyên góp, số tiền theo post_id
  const threePostsCount = threePostsID.map((item) => {
    return {
      id: item,
      donations: donations.filter((donation) => donation.post_id._id === item)
        .length,
      amount: donations
        .filter((donation) => donation.post_id._id === item)
        .map((data) => data.amount),
    };
  });

  const htmlPost = post.content;
  const handleSubmitForm = async (data) => {
    if (!user_id) {
      alert("Bạn phải đăng nhập tài khoản để thực hiện quyên góp!");
      window.location.assign("/login");
    } else {
      const formData = {
        email: email,
        user_id: user_id,
        post_id: id,
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
  const handleSlider = (index) => {
    setSlideNumber(index);
    setOpenSlider(true);
  };

  const handleMove = (direction) => {
    let newSliderNumber;
    if (direction === "l") {
      newSliderNumber =
        slideNumber === 0 ? post.photos.length - 1 : slideNumber - 1;
    } else {
      newSliderNumber =
        slideNumber === post.photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSliderNumber);
  };
  const handleOpenAllImage = () => {
    setOpenSlider(true);
    setSlideNumber(0);
  };
  if (loading) {
    return (
      <h1 style={{ marginTop: "7.5rem", textAlign: "center" }}>Loading...</h1>
    );
  } else {
    return (
      <div className="postDetail">
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

              <MDBBtn className="mt-4" variant="primary" type="submit">
                Quyên góp
              </MDBBtn>
            </Form>
          </Modal.Body>
        </Modal>
        {openSlider && (
          <div className="slider">
            <div className="slider__wrapper">
              <BsArrowLeft
                size="2rem"
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <AiOutlineClose
                size="2rem"
                className="close"
                onClick={() => setOpenSlider(false)}
              />
              {post && post.photos && post.photos.length > 0 && (
                <img
                  src={post.photos[slideNumber]}
                  alt={post.photos[slideNumber]}
                />
              )}
              <BsArrowRight
                size="2rem"
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className="postDetail__title">
              <h1 className="fw-bold">{post.description}</h1>
              <p className="text-muted">❤️&nbsp; {post.title}</p>
            </div>
            <div className="postDetail__figure d-flex justify-content-between text-muted align-items-center mb-4">
              <div className="postDetail__figure-date">
                {dateFormat(post.dateStart, "dd/mm/yyyy")}
              </div>
              <div className="postDetail__figure-share">
                <button className="btn btn-sm text-muted rounded-pill border border-1">
                  <span>Chia sẻ</span>
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="jsx-ea51e03070354ffb h-4 w-4"
                  >
                    <g className="jsx-ea51e03070354ffb">
                      <path
                        fill="none"
                        d="M0 0h24v24H0z"
                        className="jsx-ea51e03070354ffb"
                      ></path>
                      <path
                        d="M13 14h-2a8.999 8.999 0 0 0-7.968 4.81A10.136 10.136 0 0 1 3 18C3 12.477 7.477 8 13 8V3l10 8-10 8v-5z"
                        className="jsx-ea51e03070354ffb"
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className="postDetail__img mb-4 position-relative">
              {post &&
                post.photos &&
                post.photos.length > 0 &&
                post.photos.slice(0, 3).map((item, index) => {
                  return (
                    <>
                      <img
                        className=" col-md-12 col-lg-4 p-2"
                        key={index + 1}
                        src={item}
                        alt={item}
                        onClick={() => handleSlider(index)}
                      />
                    </>
                  );
                })}
              <div
                className="postDetail__img-btn position-absolute "
                style={{ bottom: "1rem", right: "2rem" }}
              >
                <button
                  className="btn btn-sm border border-1 border-dark py-2 px-3 bg-white"
                  onClick={() => handleOpenAllImage()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    className=" mr-2 w-5 me-2"
                    width="20px"
                    height="20px"
                  >
                    <path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v208c0 44.112 35.888 80 80 80h336zm96-80V80c0-26.51-21.49-48-48-48H144c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h384c26.51 0 48-21.49 48-48zM256 128c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-96 144l55.515-55.515c4.686-4.686 12.284-4.686 16.971 0L272 256l135.515-135.515c4.686-4.686 12.284-4.686 16.971 0L512 208v112H160v-48z"></path>
                  </svg>
                  {post && post.photos && post.photos.length > 0
                    ? `Xem ${post.photos.length} hình`
                    : null}
                </button>
              </div>
            </div>
            <div className="postDetail__content">
              <div className="row">
                <article className="col-md-12 col-xl-7 ">
                  {parse(`${htmlPost}`)}
                </article>
                <div className="aside__right col-md-12 col-xl-5">
                  <aside>
                    {donationDetail && (
                      <Card className="mb-4">
                        <Card.Body>
                          <Card.Title className="mb-4">
                            Thông tin quyên góp
                          </Card.Title>
                          <Card.Text>
                            <div>
                              <div className="donation">
                                <div className="donation__money">
                                  <span
                                    style={{
                                      fontWeight: "800",
                                      fontSize: "1.5rem",
                                    }}
                                  >
                                    {convertMoney(
                                      donationDetail
                                        .map((item) => item.amount)
                                        .reduce(
                                          (accumulator, currentValue) =>
                                            accumulator + currentValue,
                                          0
                                        )
                                    )}
                                    đ
                                  </span>{" "}
                                  <span style={{ color: "var(--gray-700)" }}>
                                    quyên góp / {convertMoney(post.target)}đ
                                  </span>
                                </div>
                                <div className="donation__toolbar">
                                  <ProgressBar
                                    now={(
                                      (donationDetail
                                        .map((item) => item.amount)
                                        .reduce(
                                          (accumulator, currentValue) =>
                                            accumulator + currentValue,
                                          0
                                        ) /
                                        post.target) *
                                      100
                                    ).toFixed(2)}
                                  />
                                </div>
                              </div>
                              <div className="donation__info mt-2">
                                <div className="donation__info-item">
                                  <div className="info-item__text">
                                    Lượt quyên góp
                                  </div>
                                  <div className="info-item__number">
                                    {donationDetail.length}
                                  </div>
                                </div>
                                <div className="donation__info-item">
                                  <div className="info-item__text">
                                    Đạt được
                                  </div>
                                  <div className="info-item__number">
                                    {(
                                      (donationDetail
                                        .map((item) => item.amount)
                                        .reduce(
                                          (accumulator, currentValue) =>
                                            accumulator + currentValue,
                                          0
                                        ) /
                                        post.target) *
                                      100
                                    ).toFixed(2)}
                                    %
                                  </div>
                                </div>{" "}
                                <div className="donation__info-item">
                                  <div className="info-item__text">
                                    {" "}
                                    Thời hạn còn
                                  </div>
                                  <div className="info-item__number">
                                    {diffDays && diffDays <= 0
                                      ? "Finished"
                                      : `${diffDays} ngày`}
                                  </div>
                                </div>
                              </div>
                              <div className="donation__btn">
                                <Button onClick={handleShow}>Quyên góp</Button>
                              </div>
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    )}
                    <div id="chuongtrinhdangdienra" className="mb-4">
                      <h2>Chương trình đang diễn ra</h2>
                      {onePost && onePost.length > 0 && (
                        <CardComponent
                          item={onePost[0]}
                          index={0}
                          count={onePostCount}
                        />
                      )}
                    </div>
                  </aside>
                </div>
              </div>
            </div>
            <div className="postDetail__anotherPosts">
              <h2>Các chương trình quyên góp khác</h2>
              <div className="row">
                {threePosts &&
                  threePosts.length > 0 &&
                  threePosts.map((item, index) => {
                    return (
                      <div
                        id="chuongtrinhkhac"
                        className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch"
                        key={index + 1}
                      >
                        <CardComponent
                          item={item}
                          index={index}
                          count={threePostsCount}
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="home__content-btn">
                <button>
                  <Link to="/allPosts">
                    Xem thêm
                    <AiOutlineArrowRight />
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default memo(PostDetail);
