import React from "react";
import momo_banner from "../../../images/momo_banner.jpeg";
import momo_sub_banner from "../../../images/momo_sub_banner.jpeg";
import { Link } from "react-router-dom";
import momo_pic1 from "../../../images/momo_pic1.jpeg";
import { Accordion } from "react-bootstrap";
import { AiOutlineArrowDown } from "react-icons/ai";
import PostAPI from "../../../API/PostAPI";
import { useEffect, useState } from "react";
import DonationAPI from "../../../API/DonationAPI";
import CardComponent from "../Card/CardComponent";
import "./Home.scss";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await Promise.all([
          PostAPI.getAllPost(),
          DonationAPI.getAllDonation(),
        ]);
        setLoading(false);
        setPosts(res[0].data);
        setDonations(res[1].data);
      } catch (error) {
        throw Error("Promise failed!");
      }
    };
    fetchAll();
  }, []);

  const listPostIds = posts.map((item) => {
    return item._id;
  });
  // Đếm số lượt quyên góp, số tiền theo post_id
  const count = listPostIds.map((item) => {
    return {
      id: item,
      donations: donations.filter((donation) => donation.post_id._id === item)
        .length,
      amount: donations
        .filter((donation) => donation.post_id._id === item)
        .map((data) => data.amount),
    };
  });
  if (loading) {
    return (
      <h1 style={{ marginTop: "7.5rem", textAlign: "center" }}>Loading...</h1>
    );
  } else {
    return (
      <div className="home">
        <section>
          <div className="banner">
            <div className="banner__img">
              <img src={momo_banner} alt="banner__img" />
            </div>
            <div className="banner__content container">
              <div className="banner__content-detail ">
                <h1>Nền tảng quyên góp từ thiện Trái tim MoMo</h1>
                <p>
                  Trái Tim MoMo là nền tảng giúp bạn dễ dàng chung tay quyên góp
                  tiền cùng hàng triệu người, giúp đỡ các hoàn cảnh khó khăn
                  trên khắp cả nước.
                </p>
                <div className="banner__content-data">
                  <div className="content-data__item">
                    <h4>
                      <span>427</span>
                    </h4>
                    <p>dự án được gây quỹ thành công</p>
                  </div>
                  <div className="content-data__item">
                    <h4>
                      <span>57+ tỷ</span>
                    </h4>
                    <p>đồng được quyên góp</p>
                  </div>
                  <div className="content-data__item">
                    <h4>
                      <span>14+ triệu</span>
                    </h4>
                    <p>lượt quyên góp</p>
                  </div>
                </div>
                <div className="banner__content-link">
                  <a href="#home__content">
                    <span
                      style={{
                        backgroundColor: "var(--pinkmomo)",
                        color: "#fff",
                      }}
                    >
                      Quyên góp
                    </span>
                  </a>
                  <a
                    href="#home__advertisement"
                    style={{ color: "var(--pinkmomo)" }}
                  >
                    <span>Giới thiệu</span>
                  </a>
                </div>
              </div>
              <div className="momo__content-img">
                <img src={momo_sub_banner} alt="momo_sub_banner" />
              </div>
            </div>
          </div>
        </section>
        <section id="home__content">
          <div className="home__content">
            <div className="home__content-title">
              <h2>Các hoàn cảnh Quyên góp</h2>
            </div>

            <div className="container">
              <div className="row">
                {posts &&
                  posts.length > 0 &&
                  posts.slice(0, 6).map((item, index) => {
                    return (
                      <div
                        className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch home__content-detail mb-4"
                        key={index + 1}
                      >
                        <CardComponent
                          item={item}
                          index={index}
                          count={count}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="home__content-btn">
              <button>
                <Link to="/allPosts">
                  <AiOutlineArrowDown />
                  Xem thêm
                </Link>
              </button>
            </div>
          </div>
        </section>
        <section id="home__advertisement">
          <div className="home__advertisement">
            <div className="home__advertisement-title">
              <h2>Trái tim MoMo - Việc tốt không khó</h2>
            </div>
            <div className="container">
              <div className="row">
                <div className="home__advertisement-content">
                  <div className="advertisement-content__left">
                    <div className="advertisement__detail">
                      <div className="advertisement__detail-img">
                        <div className="detail-img__item">
                          <img
                            className="h-10"
                            alt="Quyên góp nhanh chóng, dễ dàng"
                            src="https://static.mservice.io/fileuploads/svg/momo-file-211217034336.svg"
                            width="auto"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="advertisement__detail-description">
                        <h3>Quyên góp nhanh chóng, dễ dàng</h3>
                        <p>
                          Chỉ với vài chạm, bạn đã góp phần giúp đỡ 1 hoàn cảnh
                          khó khăn có cuộc sống tốt đẹp hơn.
                        </p>
                      </div>
                    </div>
                    <div className="advertisement__detail">
                      <div className="advertisement__detail-img">
                        <div className="detail-img__item">
                          <img
                            className="h-10"
                            alt="1000đ cũng là đáng quý"
                            src="https://static.mservice.io/fileuploads/svg/momo-file-211217034312.svg"
                            width="auto"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="advertisement__detail-description">
                        <h3>1000đ cũng là đáng quý</h3>
                        <p>
                          Với mức ủng hộ tối thiểu 1.000 đồng, bạn đã cùng hàng
                          triệu nhà hảo tâm khác của “Trái tim MoMo” giúp đỡ
                          những mảnh đời khó khăn.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="advertisement-content__center">
                    <img src={momo_pic1} alt="momo_advertisement" />
                  </div>
                  <div className="advertisement-content__right">
                    <div className="advertisement__detail">
                      <div className="advertisement__detail-img">
                        <div className="detail-img__item">
                          <img
                            className="h-10"
                            alt="Minh bạch, công khai mọi khoản đóng góp"
                            src="https://static.mservice.io/fileuploads/svg/momo-file-211217034305.svg"
                            width="auto"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="advertisement__detail-description">
                        <h3>Minh bạch, công khai mọi khoản đóng góp</h3>
                        <p>
                          Mọi thông tin về hoạt động đóng góp, tài trợ đều được
                          công khai và cập nhật liên tục.
                        </p>
                      </div>
                    </div>
                    <div className="advertisement__detail">
                      <div className="advertisement__detail-img">
                        <div className="detail-img__item">
                          <img
                            className="h-10"
                            alt="Đối tác của các cơ quan, tổ chức hảo tâm uy tín"
                            src="https://static.mservice.io/fileuploads/svg/momo-file-211217034206.svg"
                            width="auto"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="advertisement__detail-description">
                        <h3>Đối tác của các cơ quan, tổ chức hảo tâm uy tín</h3>
                        <p>
                          “Trái tim MoMo” đã và đang kết nối được với rất nhiều
                          đơn vị bảo trợ, báo chí, đơn vị hảo tâm uy tín trên cả
                          nước.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="home__question">
                <div className="home__question-title">
                  <h2>Câu hỏi thường gặp</h2>
                </div>
                <div className="home__question-content">
                  <Accordion flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Trái tim MoMo là gì?</Accordion.Header>
                      <Accordion.Body>
                        Trái tim MoMo là tính năng gây quỹ từ thiện của MoMo.
                        Các dự án được đăng tải trong Trái Tim MoMo đều là những
                        dự án đã được lựa chọn cẩn trọng bởi đội ngũ MoMo, và
                        được bảo trợ bởi các tổ chức uy tín.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        MoMo có thu lợi nhuận từ việc gây quỹ không?
                      </Accordion.Header>
                      <Accordion.Body>
                        MoMo hoàn toàn không thu lợi nhuận từ việc gây quỹ.
                        Ngoại trừ phí chuyển khoản ngân hàng, 100% số tiền của
                        người dùng được chuyển tới cho các tổ chức bảo trợ.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Sau bao lâu từ khi quyên góp, tiền sẽ được chuyển đến
                        tay hoàn cảnh cảnh?
                      </Accordion.Header>
                      <Accordion.Body>
                        Trong vòng 1 tuấn kể từ khi dự án quyên góp thành công,
                        tiền sẽ được chuyển tới đối tác. Trong những trường hợp
                        khẩn cấp, chúng tôi có thể chuyển sớm hơn.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        Ai có thể gây quỹ trên Trái Tim MoMo?
                      </Accordion.Header>
                      <Accordion.Body>
                        Để có thể gây quỹ trên MoMo, hoàn cảnh cần được bảo trợ
                        bởi một tổ chức có pháp nhân là Quỹ, tổ chức phi chính
                        phủ, Doanh nghiệp xã hội hoặc một cơ quan nhà nước có
                        chức năng tiếp nhận tài trợ.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        Nếu hoàn cảnh gây quỹ không thành công thì sao?
                      </Accordion.Header>
                      <Accordion.Body>
                        Nhà tài trợ vẫn sẽ chuyển số tiền tương ứng với số Heo
                        Vàng đã quyên góp. Trong một số trường hợp, chúng tôi sẽ
                        kéo dài thêm thời gian gây quỹ
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header>
                        Làm thế nào để liên hệ và gửi hoàn cảnh tới MoMo?
                      </Accordion.Header>
                      <Accordion.Body>
                        Tổ chức đủ điều kiện vui lòng gửi email thông tin của tổ
                        chức tới địa chỉ <Link>donation@mservice.com.vn</Link>
                        &nbsp; để được nhận hướng dẫn.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default Home;
