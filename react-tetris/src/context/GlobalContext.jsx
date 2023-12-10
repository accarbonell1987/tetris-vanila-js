import { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
	const [audio, setAudio] = useState({ play: false, source: null });
	const [players, setPlayers] = useState({
		p1: {
			name: "",
			score: 0,
			counter: 0,
			time: 0,
			level: {
				number: 1,
				speed: 0.0,
			},
		},
		p2: {
			name: "",
			score: 0,
			counter: 0,
			time: 0,
			level: {
				number: 1,
				speed: 0.0,
			},
		},
	});

	return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
