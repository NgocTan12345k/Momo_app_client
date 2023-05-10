import React from "react";
import "./History.scss";
import Table from "react-bootstrap/Table";
import DonationAPI from "../../../API/DonationAPI";
import { useEffect, useState } from "react";
import converMonney from "../../../convertMoney";
import dateFormat from "dateformat";
import PaginationComponent from "../../../pagination";

const History = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [historyPerPage] = useState(5);

  const user_id = localStorage.getItem("userID");
  useEffect(() => {
    const getHistory = async () => {
      await DonationAPI.getHistoryDonation(user_id)
        .then((res) => {
          setHistory(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getHistory();
  }, [user_id]);

  // Get current history
  const IndexOfLastHistory = currentPage * historyPerPage;
  const IndexOfFirstHistory = IndexOfLastHistory - historyPerPage;
  const currentHistorys = history.slice(
    IndexOfFirstHistory,
    IndexOfLastHistory
  );

  // Change page
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="history">
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Lịch sử quyên góp</h1>
        <div className="history__table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Chương trình đã quyên góp</th>
                <th>Ngày quyên góp</th>
                <th>Số tiền quyên góp</th>
                <th>Hình thức thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {currentHistorys &&
                currentHistorys.length > 0 &&
                currentHistorys.map((item, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{item.post_id.description}</td>
                      <td>{dateFormat(item.createdAt, "dd/mm/yyyy")}</td>
                      <td>{converMonney(item.amount)}&nbsp;VND</td>
                      <td>{item.payment}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <PaginationComponent
            total={history.length}
            itemPerPage={historyPerPage}
            handlePaginate={handlePaginate}
          />
        </div>
      </div>
    </div>
  );
};

export default History;
