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

let currency = "BRL";

const { antdHeader, Footer, Sider, Content } = Layout;

function App() {
	const [firendListState, dispatch] = useReducer(reducer, initialState);
	const [modalState, setModalState] = useState({
		visible: false,
		friend: undefined,
		okDisabled: true,
	});
	function reloadItems() {
		startDB(() => {
			getFriends(
				{
					limit: firendListState.pageSize,
					offset:
						firendListState.pageSize *
						(firendListState.currPage - 1),
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
											"HH:mm dd/MM/yyyy"
									  )
									: "-",
							total: Intl.NumberFormat("pt-Br", {
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

	return (
		<Layout className="layout">
			<Header></Header>
			<Content className="content">
				<div className="content-wrapper">
					<FriendForm
						reloadFriendList={reloadFriendList}
					></FriendForm>
					<FriendList
						firendListState={firendListState}
						dispatch={dispatch}
						initialState={initialState}
						reloadItems={reloadItems}
						modalState={modalState}
						setModalState={setModalState}
					></FriendList>
				</div>
			</Content>
			<Footer className="footer">
				<span>Made with ReactJs and Ant Design by Márcio Medeiros</span>
			</Footer>
		</Layout>
	);
}

export default App;
