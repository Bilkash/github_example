import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState
} from "react";
import {User} from "@saber2pr/types-github-api";
import axios from "axios";
import UserMinimal from "../UserMinimal";
import Index from "../PreviousResult";

import "./index.scss";

type FirstTypes = {
	setUser: Dispatch<SetStateAction<string>>,
	setUsername: Dispatch<SetStateAction<string>>,
	username: string,
}

export default function First({username, setUsername, setUser}: FirstTypes) {
	const [result, setResult] = useState<User | null>(null);
	const [error, setError] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const sendQuery = useCallback(async (query: string) => {
		setError(false);

		if (query) {
			try {
				const res = await axios.get(`https://api.github.com/users/${username}`);
				await setResult(res.data);
			} catch (err) {
				setError(Boolean(err));
			}
		}
	}, [username]);

	useEffect(() => {
		const cache = localStorage.getItem("cache");

		if (!cache) {
			localStorage.setItem("cache", JSON.stringify([result]));
		}
		if (cache && result) {
			const arrCache = JSON.parse(cache);
			const ids = arrCache.map((it: User) => it.id);

			console.log(arrCache);

			if (!ids.includes(result.id)) {
				localStorage.setItem("cache", JSON.stringify([...arrCache, result]));
			}
		}
	}, [result]);

	return (
		<div className={"wrapper"}>
			<div className={"search"}>
				<input
					type={"search"}
					placeholder={"Username"}
					value={username}
					onChange={event => handleChange(event)}
					className={"search_input"}
				/>

				<button
					className={"search_button"}
					onClick={() => sendQuery(username)}
				>
					search
				</button>
			</div>

			<div className={"results"}>
				<div>Result:</div>

				{result && !error ? <UserMinimal user={result} setUser={setUser}/> : <div/>}
			</div>

			<Index setUser={setUser}/>

			{error && <p>Error!</p>}
		</div>   
	);
}