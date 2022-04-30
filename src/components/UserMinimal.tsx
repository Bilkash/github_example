import React, {Dispatch, SetStateAction} from "react";
import {User} from "@saber2pr/types-github-api";

import "./UserMinimal.scss";

type UserMinimalType = {
	user: User,
	setUser: Dispatch<SetStateAction<string>>
}

export default function UserMinimal({user: {login, avatar_url, public_repos}, setUser}: UserMinimalType) {

	return (
		<div
			className={"item"}
			onClick={() => setUser(login)}
		>
			<img className={"img"} src={avatar_url}/>

			<div>{`Username: ${login}`}</div>

			<div>{`Repos: ${public_repos}`}</div>
		</div>
	);
}