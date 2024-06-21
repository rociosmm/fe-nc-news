import {useContext, useEffect, useState} from "react";
import "./App.css";
import {Header} from "./components/Header";
import {Home} from "./components/Home";
import {NcRoutes} from "./router/NcRoutes";
import {getTopics} from "./utils/api";
import {Footer} from "./components/Footer";
import {UserContext} from "./context/UserContext";
import {SignIn} from "./components/SignIn";

function App() {
	const [topics, setTopics] = useState([]);
	const {username, setUsername} = useContext(UserContext);
	useEffect(() => {
		getTopics().then((topics) => {
			setTopics(topics);
		});
	}, []);
	return (
		<>
			<Header topics={topics} />
			{/* <div id="main-content">
				<NcRoutes />
			</div> */}
			<div className="main-content">
				{username ? <NcRoutes /> : <SignIn setUsername={setUsername} />}
			</div>
			<Footer topics={topics} />
		</>
	);
}

export default App;
