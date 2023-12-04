import { Link } from "react-router-dom";

import "../styles.css";

const InfoBox = ({ text, link, btnText, num }) => (
	<div className="space-card info-box cursor-auto select-none">
		<p className="text-card sm:text-xl text-center">{text}</p>
		<h3 className="num-card">{num} </h3>
		<Link to={link} className="btn-card">
			{btnText}{" "}
		</Link>
	</div>
);

const renderContent = {
	1: (
		<div className="space-card">
			<h3 className="num-card">01</h3>
			<h1 className="text-card sm:text-xl sm:leading-snug text-center py-4 px-8 text-white mx-4 cursor-auto select-none">
				Lorem, ipsum dolor sit amet.
				<br />
				pariatur harum beatae ab iste.
			</h1>
		</div>
	),
	2: (
		<InfoBox
			text={"Lorem, ipsum dolor sit amet.2"}
			num={"05"}
			link={"/about"}
			btnText={"more"}
		/>
	),
	3: (
		<InfoBox
			text={"Lorem, ipsum dolor sit amet.2"}
			num={"04"}
			link={"/about"}
			btnText={"more"}
		/>
	),
	4: (
		<InfoBox
			text={"Lorem, ipsum dolor sit amet.2"}
			num={"03"}
			link={"/about"}
			btnText={"more"}
		/>
	),
	5: (
		<InfoBox
			text={"Lorem, ipsum dolor sit amet.2"}
			num={"02"}
			link={"/about"}
			btnText={"more"}
		/>
	),
};

const HomeInfo = ({ currentStage }) => {
	return renderContent[currentStage] || null;
};

export default HomeInfo;
