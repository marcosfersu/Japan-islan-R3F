import { Link } from "react-router-dom";

const InfoBox = ({ text, link, btnText }) => (
	<div className="info-box cursor-auto">
		<p className="font-medium sm:text-xl text-center">{text}</p>
		<Link to={link} className="neo-brutalism-white neo-btn">
			{btnText}{" "}
		</Link>
	</div>
);

const renderContent = {
	1: (
		<h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-4 cursor-auto">
			Lorem, ipsum dolor sit amet.
			<br />
			pariatur harum beatae ab iste.
		</h1>
	),
	2: (
		<InfoBox
			text={"Lorem, ipsum dolor sit amet.2"}
			link={"/about"}
			btnText={"more"}
		/>
	),
	3: (
		<InfoBox
			text={"Lorem, ipsum dolor sit amet.3"}
			link={"/about"}
			btnText={"more"}
		/>
	),
	4: (
		<InfoBox
			text={"Lorem, ipsum dolor sit amet.4"}
			link={"/about"}
			btnText={"more"}
		/>
	),
	5: (
		<InfoBox
			text={"Lorem, ipsum dolor sit amet.5"}
			link={"/about"}
			btnText={"more"}
		/>
	),
};

const HomeInfo = ({ currentStage }) => {
	return renderContent[currentStage] || null;
};

export default HomeInfo;
