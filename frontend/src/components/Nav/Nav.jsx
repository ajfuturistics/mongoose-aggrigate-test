import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex justify-center items-center py-4 gap-4 shadow-md sticky top-0">
      <Link className="font-semibold text-lg" to="/">
        Reports
      </Link>
      <Link className="font-semibold text-lg" to="/add-marks">
        Add Marks
      </Link>
    </nav>
  );
};

export default Nav;
