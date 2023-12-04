import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<header className="header">
			<NavLink
				to="/"
				className="w-10 h-10 rounded-lg bg-while  items-center justify-center flex font-bold shadow-md"
			>
				<p className="blue-gradient_text">AH</p>
			</NavLink>
			<nav className="flex text-lg gap-7 font-medium">
				<NavLink
					to="/about"
					className={({ isActive }) =>
						isActive ? "text-blue-500" : "text-white"
					}
				>
					About
				</NavLink>
				<NavLink
					to="/projects"
					className={({ isActive }) =>
						isActive ? "text-blue-500" : "text-white"
					}
				>
					Projects
				</NavLink>
				<NavLink
					to="/contact"
					className={({ isActive }) =>
						isActive ? "text-blue-500" : "text-white"
					}
				>
					Contact
				</NavLink>
			</nav>
		</header>
	);
};

export default NavBar;
