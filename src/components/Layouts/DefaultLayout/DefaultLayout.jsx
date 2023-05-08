import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container-content">
        <div className="content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
