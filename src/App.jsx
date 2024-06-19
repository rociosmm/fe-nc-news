import {useEffect, useState} from "react";
import "./App.css";
import {Header} from "./components/Header";
import {Home} from "./components/Home";
import {NcRoutes} from "./router/NcRoutes";

function App() {
	return (
		<>
			<Header />
			<div id="main-content">
				<NcRoutes />
			</div>
		</>
	);
}

export default App;
