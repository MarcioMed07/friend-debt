import React, { useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import FriendForm from "./components/FriendForm/FriendForm";
import FriendList from "./components/FriendList/FriendList";
import startDB, { getFriends } from "./services/db.service";
import { format, max } from "date-fns";
import { Layout } from "antd";

function reducer(state, action) {
	let newState = {
		currPage: action.currPage,
		pageSize: action.pageSize,
		total: action.total,
		items: action.items,
	};
	return newState;
}
const initialState = {
	currPage: 1,
	pageSize: 10,
	total: 0,
	items: [],
};

function App() {
	function reloadItems() {
		startDB(() => {
			getFriends(
				{
					limit: friendListState.pageSize,
					offset:
						friendListState.pageSize *
						(friendListState.currPage - 1),
				},
				(response) => {
					const friendList = [];
					for (let friend of response.data) {
						friendList.push({
							key: friend.id.toString(),
							name: friend.name,
							date:
								Object.values(friend.debts).length > 0
									? format(
											max(
												Object.values(friend.debts).map(
													(d) => d.createdAt
												)
											),
											"Pp"
									  )
									: "-",
							total: Intl.NumberFormat(navigator.language, {
								style: "currency",
								currency: currency,
							}).format(
								Object.values(friend.debts).reduce(
									(acc, cur) => (acc += cur.value),
									0
								)
							),
							friend: friend,
						});
					}
					dispatch({
						currPage: response.currPage,
						pageSize: response.pageSize,
						total: response.total,
						items: friendList,
					});
				}
			);
		});
	}
	function reloadFriendList() {
		reloadItems();
	}
	const [friendListState, dispatch] = useReducer(reducer, initialState);
	const [debtModalState, setDebtModalState] = useState({
		visible: false,
		friend: undefined,
		okDisabled: true,
	});
	const [listDebtState, setListDebtState] = useState({
		visible: false,
		friend: undefined,
		okDisabled: true,
	});
	const [currency, setCurrency] = useState("BRL");

	return (
		<Layout className="layout">
			<Header></Header>
			<Layout.Content className="content">
				<div className="content-wrapper">
					<FriendForm
						reloadFriendList={reloadFriendList}
					></FriendForm>
					<FriendList
						friendListState={friendListState}
						dispatch={dispatch}
						initialState={initialState}
						reloadItems={reloadItems}
						debtModalState={debtModalState}
						setDebtModalState={setDebtModalState}
						listDebtState={listDebtState}
						setListDebtState={setListDebtState}
						currency={currency}
					></FriendList>
				</div>
			</Layout.Content>
			<Layout.Footer className="footer">
				<div>Made with ReactJs and Ant Design by Márcio Medeiros</div>
				<div>
					<a href="https://github.com/MarcioMed07/Friend-Debt">
						This project is open source under the MIT license.
					</a>
				</div>
			</Layout.Footer>
		</Layout>
	);
}

export default App;
