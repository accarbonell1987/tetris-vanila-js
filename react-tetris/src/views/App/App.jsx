import "./App.css";

import { Image } from "@nextui-org/react";

const App = () => {
	return (
		<main className="flex flex-col gap-1">
			<div className="flex flex-row gap-1">
				<Image src="logo-tetris.png" width={70} alt="Tetris" radius="none" />
			</div>
			<div className="flex flex-row gap-1 grow">
				<article className="flex-none w-14">Left</article>
				<article className="grow w-14">Game</article>
				<article className="flex-none w-14">Right</article>
			</div>
		</main>
	);
};

export default App;
