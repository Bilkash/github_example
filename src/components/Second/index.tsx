import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState
} from "react";
import {User} from "@saber2pr/types-github-api";
import axios from "axios";
import Repositories from "../Repositories";

import "./index.scss";

type Second = {
	user: string,
	setUser: Dispatch<SetStateAction<string>>
}

export default function Second({user, setUser}: Second) {
	const [result, setResult] = useState<User | null>(null);

	const sendQuery = useCallback(async () => {
		if (user) {
			const res = await axios.get(`https://api.github.com/users/${user}`);
			await setResult(res.data);
		}
	}, [user]);

	useEffect(() => {
		sendQuery();
	}, []);

	if (!result) {
		return null;
	}

	const {
		name,
		email,
		location,
		created_at,
		followers,
		following,
		avatar_url,
		bio,
		repos_url,
	} = result;

	return (
		<div>
			<button onClick={() => setUser("")}>To Search</button>

			<div className={"mainInfo"}>
				<img
					src={avatar_url}
					className={"avatar"}
				/>

				<div className={"info"}>
					<div>{`Name: ${name}`}</div>
					<div>{`Email: ${email}`}</div>
					<div>{`Location: ${location}`}</div>
					<div>{`Join Dt: ${created_at}`}</div>
					<div>{`${followers} Followers`}</div>
					<div>{`Following ${following}`}</div>
				</div>
			</div>

			<div className={"bio"}>
				Bio: {bio}
			</div>

			<Repositories repos_url={repos_url}/>
		</div>

	);
}