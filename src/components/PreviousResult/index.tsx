import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {User} from "@saber2pr/types-github-api";
import UserMinimal from "../UserMinimal";

type PreviousResultType = {
	setUser: Dispatch<SetStateAction<string>>,
}

export default function PreviousResult({setUser}: PreviousResultType) {
	const [list, setList] = useState<User[]>([]);

	useEffect(() => {
		const cache = localStorage.getItem("cache");

		if (cache) {
			const arrCache = JSON.parse(cache);

			setList(arrCache);
		}
	}, []);

	return (
		<div>
			<div>Previous result:</div>

			<div>
				{list.map((it: User ) => <UserMinimal key={it.id} user={it} setUser={setUser}/>)}
			</div>
		</div>
	);
}