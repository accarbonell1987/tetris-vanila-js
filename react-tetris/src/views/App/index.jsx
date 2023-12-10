import { useState } from "react";

import "./App.css";

import { Image, User, Link, Button } from "@nextui-org/react";

const App = () => {
	return (
		<main className="flex flex-col gap-1">
			<div className="flex flex-row gap-1 align-middle">
				<Image src="logo-tetris.png" width={60} alt="Tetris" radius="none" />
				<div className="flex flex-row fixed right-0 mr-10">
					<User
						name="Alberto Carlos"
						description={
							<Link href="https://twitter.com/accarbonell" size="sm" isExternal>
								@accarbonell
							</Link>
						}
						avatarProps={{
							src: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
							isBordered: true,
							color: "success",
						}}
					/>
				</div>
			</div>
			<div className="flex flex-row gap-1 grow pt-3">
				<article className="flex-none border-1 border-white">Left</article>
				<article className="flex justify-center grow w-14 border-1 border-white">
					<canvas width="320" height="640" id="game"></canvas>
				</article>
				<article className="flex-none border-1 border-white">Right</article>
			</div>
		</main>
	);
};

export default App;
