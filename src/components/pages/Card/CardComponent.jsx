import convertMoney from "../../../convertMoney";
import { Link } from "react-router-dom";
import { ProgressBar, Card } from "react-bootstrap";
import "./CardComponent.scss";

const CardComponent = ({ item, index, count }) => {
  const DetailPost = (postID) => {
    window.location.assign(`/PostDetail/${postID}`);
  };

  let now = new Date();
  let endDate = new Date(item.dateEnd);
  const diffTime = endDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (
    <div className="d-flex align-items-stretch home__content-detail mb-4">
      <Card
        className="content-detail__item"
        onClick={() => DetailPost(item._id)}
        // style={{ cursor: "pointer" }}
      >
        <Card.Img
          variant="top"
          src={item.photos[0]}
          alt="content_detail__img"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="detail__description">
            {item.description}
          </Card.Title>
          <Card.Text className="mt-auto ">
            <div className="detail__footer">
              <div className="detail__footer-top">
                <div className="footer-top__creator">
                  {item.user_id.fullName}
                </div>
                <div className="footer-top__counter">
                  <span
                    style={{
                      backgroundColor: "#ffe8e1",
                      color: "#fc923c",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "1rem",
                    }}
                  >
                    {diffDays && diffDays <= 0
                      ? "Finished"
                      : `Còn ${diffDays} ngày`}
                  </span>
                </div>
              </div>
              <div className="detail__footer-middle">
                <div className="footer-middle__money">
                  <span style={{ fontWeight: "800" }}>
                    {convertMoney(
                      count[index].amount.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )
                    )}
                    đ
                  </span>{" "}
                  /{" "}
                  <span style={{ color: "var(--gray-700)" }}>
                    {convertMoney(item.target)}đ
                  </span>
                </div>
                <div className="footer-middle__toolbar">
                  <ProgressBar
                    now={(
                      (count[index].amount.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      ) /
                        item.target) *
                      100
                    ).toFixed(2)}
                  />
                </div>
              </div>
              <div className="detail__footer-bottom">
                <div className="footer-bottom__item">
                  <div className="item-donation">Lượt quyên góp</div>
                  <div className="data-count">{count[index].donations}</div>
                </div>
                <div className="footer-bottom__item">
                  <div className="item-donation">Đạt được</div>
                  <div className="item-count">
                    {(
                      (count[index].amount.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      ) /
                        item.target) *
                      100
                    ).toFixed(2)}
                    %
                  </div>
                </div>{" "}
                <div className="footer-bottom__item">
                  <Link>Quyên góp</Link>
                </div>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default CardComponent;
