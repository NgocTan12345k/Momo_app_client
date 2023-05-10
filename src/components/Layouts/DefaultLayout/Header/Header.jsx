import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import app_store from "../../../../images/app_store.jpeg";
import google_play from "../../../../images/google_play.jpeg";
import handle_touch from "../../../../images/handle_touch.png";
import hand_shake from "../../../../images/hand_shake2.png";
import logo from "../../../../images/momo_icon.png";
import momo_wallet from "../../../../images/momo-wallet.jpeg";
import React, { Fragment, useState } from "react";
import "./Header.scss";
import { BsClockHistory } from "react-icons/bs";
import { MdLogout, MdOutlineChangeCircle } from "react-icons/md";
import AuthAPI from "../../../../API/AuthAPI";

import { Link } from "react-router-dom";

const Header = () => {
  const [active, setActive] = useState("default");
  const user = localStorage.getItem("currentUser");

  const handleLogout = async () => {
    await AuthAPI.Logout()
      .then((res) => {
        console.log("res-->", res.data);
        const result =
          res && res.data && res.data.message ? res.data.message : "";
        if (result === "logged out successfully") {
          localStorage.clear();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="wrapper">
      <Navbar
        expand="xl"
        activekey={active}
        onSelect={(selectedKey) => setActive(selectedKey)}
        // fixed="top"
      >
        <Container>
          <Navbar.Brand href="/">
            <div className="navbar-logo">
              <div className="logo">
                <img src={logo} alt="Momo__logo" />
              </div>
              <div className="logo__wallet">
                <img src={momo_wallet} alt="momo__wallet" />
                <span>Ví Nhân Ái</span>
              </div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-md" href="#/">
                Trái Tim MoMo
              </Nav.Link>
              <Nav.Link href="#/">Heo Đất MoMo</Nav.Link>

              <NavDropdown title="Hoàn Cảnh Quyên Góp">
                <NavDropdown.Item href="#/">Vì Trẻ Em</NavDropdown.Item>
                <NavDropdown.Item href="#/">Bệnh Hiểm Nghèo</NavDropdown.Item>
                <NavDropdown.Item href="#/">Hỗ Trợ Giáo Dục</NavDropdown.Item>
                <NavDropdown.Item href="#/">Cứu Trợ Động Vật</NavDropdown.Item>
                <NavDropdown.Item href="#/">
                  Người Già, Người Khuyết Tật
                </NavDropdown.Item>
                <NavDropdown.Item href="#/">
                  Hoàn Cảnh Khó Khăn
                </NavDropdown.Item>
                <NavDropdown.Item href="#/">
                  Đầu Tư Cơ Sở Vật Chất
                </NavDropdown.Item>
                <NavDropdown.Item href="#/">Bảo Vệ Môi Trường</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="#/">Đối Tác Đồng Hành</Nav.Link>
              <Nav.Link href="#/">Tin Tức Cộng Đồng</Nav.Link>

              <NavDropdown title="Blog Cuộc Sống">
                <NavDropdown.Item href="#/">Sống tốt</NavDropdown.Item>
                <NavDropdown.Item href="#/">Sống thông minh</NavDropdown.Item>
                <NavDropdown.Item href="#/">Sống khỏe</NavDropdown.Item>
                <NavDropdown.Item href="#/">Sống vui</NavDropdown.Item>
              </NavDropdown>
              <div className="openNav__footer">
                <h4>TẢI VÀ ĐĂNG KÝ</h4>
                <div className="footer__link">
                  <Link>
                    <div className="footer__link-item">
                      <img src={app_store} alt="app_store" />
                    </div>
                  </Link>
                  <Link>
                    <div className="footer__link-item">
                      <img src={google_play} alt="google_play" />
                    </div>
                  </Link>
                </div>
                <div className="footer__contact">
                  <h4>HỖ TRỢ KHÁCH HÀNG</h4>
                  <ul>
                    <li>Hotline: 1900 545 441</li>
                    <li>Email: hotro@momo.vn</li>
                  </ul>
                  <Link>
                    <div className="footer__contact-link">
                      <div className="contact-link__img">
                        <img src={handle_touch} alt="handle__touch" />
                      </div>
                      <div className="contact-link__content">
                        <div style={{ fontSize: "0.75rem" }}>
                          Hướng dẫn trợ giúp trên
                        </div>
                        <div
                          style={{ fontSize: "0.8125rem", fontWeight: "700" }}
                        >
                          Ứng dụng Ví MoMo
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="footer__contact">
                  <h4>HỢP TÁC DOANH NGHIỆP</h4>
                  <ul>
                    <li>Hotline: 1900 636 652</li>
                    <li>Email: merchant.care@momo.vn</li>
                  </ul>
                  <Link>
                    <div className="footer__contact-link">
                      <div className="contact-link__img">
                        <img src={hand_shake} alt="hand_shake" />
                      </div>
                      <div className="contact-link__content">
                        <div style={{ fontSize: "0.75rem" }}>
                          Hợp tác doanh nghiệp
                        </div>
                        <div style={{ fontWeight: "700" }}>Đăng ký hợp tác</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <div className="nav__user">
          <div className="nav__user-item">
            {user ? (
              <>
                <NavDropdown className="ms-3" title={`Xin chào ${user}`}>
                  <NavDropdown.Item href="/history">
                    {" "}
                    <BsClockHistory className="icon" /> <span>History</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/changePassword">
                    {" "}
                    <MdOutlineChangeCircle className="icon" />{" "}
                    <span>Change Password</span>{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/login" onClick={handleLogout}>
                    {" "}
                    <MdLogout className="icon" /> <span>Log out</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav>
                <Nav.Item>
                  <Nav.Link href="/register">Register &nbsp;&nbsp; /</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
              </Nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
