import "./AllPosts.scss";
import CardComponent from "../Card/CardComponent";
import { useState, useEffect } from "react";
import PostAPI from "../../../API/PostAPI";
import DonationAPI from "../../../API/DonationAPI";
import PaginationComponent from "../../../pagination";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [donations, setDonations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
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

  // Get current history
  const IndexOfLastHistory = currentPage * postPerPage;
  const IndexOfFirstHistory = IndexOfLastHistory - postPerPage;
  const currentPosts = posts.slice(IndexOfFirstHistory, IndexOfLastHistory);

  // Change page
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (loading) {
    return (
      <h1 style={{ marginTop: "7.5rem", textAlign: "center" }}>Loading...</h1>
    );
  } else {
    return (
      <div className="allPosts">
        <div className="container">
          <div className="row">
            <h1 style={{ textAlign: "center" }}>Tất cả các đợt quyên góp</h1>
            {currentPosts &&
              currentPosts.length > 0 &&
              currentPosts.map((item, index) => {
                return (
                  <div
                    className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch mb-4"
                    key={index + 1}
                  >
                    <CardComponent
                      item={item}
                      index={(currentPage - 1) * postPerPage + index}
                      count={count}
                    />
                    ;
                  </div>
                );
              })}
            <PaginationComponent
              total={posts.length}
              itemPerPage={postPerPage}
              handlePaginate={handlePaginate}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default AllPosts;
