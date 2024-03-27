import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-web.png";

function MainHeader() {
  return (
    <div className="shadow py-2 pl-24">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-10 w-20" />
      </Link>
    </div>
  );
}

export default MainHeader;
