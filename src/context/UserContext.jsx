import {createContext, useState, useEffect} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
	const [username, setUsername] = useState("");

	if (username === "" && localStorage.getItem("username")) {
		setUsername(localStorage.getItem("username"));
	}

	useEffect(() => {
		localStorage.setItem("username", username);
	}, [username]);

	return (
		<UserContext.Provider value={{username, setUsername}}>
			{children}
		</UserContext.Provider>
	);
};
