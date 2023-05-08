import { Link } from "react-router-dom";

const PaginationComponent = ({ total, itemPerPage, handlePaginate }) => {
  let pageNumbers = [];
  const IndexOfLastpage = Math.ceil(total / itemPerPage);
  for (let i = 1; i <= IndexOfLastpage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-end">
        {pageNumbers &&
          pageNumbers.length > 0 &&
          pageNumbers.map((item, index) => {
            return (
              <li key={index + 1} className="page-item">
                <Link
                  className="page-link"
                  onClick={() => handlePaginate(item)}
                >
                  {item}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default PaginationComponent;
