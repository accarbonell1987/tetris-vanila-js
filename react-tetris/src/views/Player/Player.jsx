import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import React from "react";
import useAssets from "../../hooks/useAssets";

const Player = () => {
	const { images } = useAssets();

	return (
		<div className="flex flex-col w-full gap-3">
			<Card className="max-w-[400px]">
				<CardHeader className="flex gap-3">
					<Image alt="nextui logo" height={40} radius="sm" src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4" width={40} />
					<div className="flex flex-col">
						<p className="text-md">Siguiente Ficha</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody className="flex justify-center w-full">
					<canvas id="nextfile" width="130" height="130" color="black"></canvas>
				</CardBody>
			</Card>
			<Card className="max-w-[400px]">
				<CardHeader className="flex gap-3">
					<Image alt="nextui logo" height={40} radius="sm" src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4" width={40} />
					<div className="flex flex-col">
						<p className="text-md">Booster</p>
					</div>
				</CardHeader>
				<Divider />
				<CardBody className="flex justify-center w-full">
					<canvas id="booster" width="130" height="130" color="black"></canvas>
				</CardBody>
			</Card>
		</div>
	);
};

export default Player;
