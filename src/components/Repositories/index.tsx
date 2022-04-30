import React, {useCallback, useEffect, useState} from "react";
import {Repository} from "@saber2pr/types-github-api";
import axios from "axios";

import "./index.scss";

type RepositoriesType = {
    repos_url: string
}

export default function Repositories({repos_url}: RepositoriesType) {
	const [list, setList] = useState<Repository[] | null>(null);
	const [searchStr, setSearchStr] = useState("");
	const [filterList, setFilterList] = useState<Repository[] | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchStr(e.target.value);
	};

	const sendQuery = useCallback(async () => {
		try {
			const res = await axios.get(repos_url, {params: {per_page: 100}});
			await setList(res.data);
		} catch (err) {
			setList(null);
		}
	}, [repos_url]);

	useEffect(() => {
		sendQuery();
	}, []);

	useEffect(() => {
		if (list) {
			setFilterList(list.filter((it:Repository) => it.name.includes(searchStr)));
		}
	}, [searchStr]);

	if (!list) {
		return null;
	}

	return (
		<div>
			<input
				type={"search"}
				className={"repo_search"}
				value={searchStr}
				onChange={event => handleChange(event)}
			/>

			{
				searchStr && filterList ?
					<div>
						{filterList.map(({forks, name, stargazers_count, id, html_url}: Repository) => {
							return (
								<a
									key={id}
									className={"link"}
									href={html_url}
									target={"blank"}
								>
									<div className={"repo"}>
										<div>
											{name}
										</div>

										<div>
											<div>
												{`${forks} Forks`}
											</div>

											<div>
												{`${stargazers_count} Star`}
											</div>
										</div>
									</div>
								</a>
							);
						})}
					</div>
					: <div>
						{list.map(({forks, name, stargazers_count, id, html_url}: Repository) => {
							return (
								<a
									key={id}
									className={"link"}
									href={html_url}
									target={"blank"}
								>
									<div className={"repo"}>
										<div>
											{name}
										</div>

										<div>
											<div>
												{`${forks} Forks`}
											</div>

											<div>
												{`${stargazers_count} Star`}
											</div>
										</div>
									</div>
								</a>
							);
						})}
					</div>
			}
			<div>
				{list.map(({forks, name, stargazers_count, id, html_url}: Repository) => {
					return (
						<a
							key={id}
							className={"link"}
							href={html_url}
							target={"blank"}
						>
							<div className={"repo"}>
								<div>
									{name}
								</div>

								<div>
									<div>
										{`${forks} Forks`}
									</div>

									<div>
										{`${stargazers_count} Star`}
									</div>
								</div>
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
}