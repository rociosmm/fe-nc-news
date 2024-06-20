import {useEffect, useState} from "react";
import "./App.css";
import {Header} from "./components/Header";
import {Home} from "./components/Home";
import {NcRoutes} from "./router/NcRoutes";
import {getTopics} from "./utils/api";
import {Footer} from "./components/Footer";

function App() {
	const [topics, setTopics] = useState([]);
	useEffect(() => {
		getTopics().then((topics) => {
			setTopics(topics);
		});
	}, []);
	return (
		<>
			<Header topics={topics} />
			<div id="main-content">
				<NcRoutes />
			</div>
			<Footer topics={topics} />
		</>
	);
}

export default App;
