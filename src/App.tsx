import React, {useState} from "react";
import First from "./components/First";
import Second from "./components/Second";
import Title from "./components/Title";

import "./App.scss";

export default function App() {
	const [user, setUser] = useState("");
	const [username, setUsername] = useState<string>("");

	return (
		<div className={"main"}>
			<Title/>

			{user ?
				<Second
					setUser={setUser}
					user={user}
				/>
				: <First
					setUser={setUser}
					username={username}
					setUsername={setUsername}
				/>
			}
		</div>
	);
}
