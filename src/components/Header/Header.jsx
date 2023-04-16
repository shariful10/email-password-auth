import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav>
			{/* <Link className="menu" to="/">Home</Link> */}
			<Link className="menu" to="/login">Login</Link>
			{/* <Link className="menu" to="/register">Register</Link> */}
			<Link className="menu" to="/registertc">Register</Link>
		</nav>
	);
};

export default Header;
