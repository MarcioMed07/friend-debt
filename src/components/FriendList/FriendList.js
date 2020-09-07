import React, { useEffect } from "react";
import {
	Table,
	Pagination,
	Space,
	Button,
	Tooltip,
	Popconfirm,
	message,
} from "antd";
import { removeFriend } from "../../services/db.service";
import {
	DeleteOutlined,
	PlusCircleOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";

import "./FriendList.css";
import DebtModal from "../DebtModal/DebtModal";
import DebtList from "../DebtList/DebtList";

function FriendList(props) {
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Last Debt Date",
			dataIndex: "date",
			key: "date",
		},
		{
			title: "Total owed",
			dataIndex: "total",
			key: "total",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<Tooltip title={"List " + record.friend.name + "'s Debts"}>
						<Button
							onClick={() =>
								props.setListDebtState({
									okDisabled: true,
									visible: true,
									friend: record.friend,
								})
							}
							shape="circle"
							icon={<UnorderedListOutlined />}
						/>
					</Tooltip>
					<Tooltip title={"Add Debt to " + record.friend.name}>
						<Button
							onClick={() =>
								props.setDebtModalState({
									okDisabled: true,
									visible: true,
									friend: record.friend,
								})
							}
							shape="circle"
							icon={<PlusCircleOutlined />}
						/>
					</Tooltip>
					<Popconfirm
						title={
							"Are you sure you want to delete " +
							record.friend.name +
							" and all its debts? This cannot be undone"
						}
						onConfirm={() => confirm(record.friend)}
						onCancel={cancel}
						okText="Yes"
						cancelText="No"
					>
						<Tooltip title={"Delete " + record.friend.name}>
							<Button shape="circle" icon={<DeleteOutlined />} />
						</Tooltip>
					</Popconfirm>
				</Space>
			),
		},
	];

	function confirm(friend) {
		removeFriend(
			friend.id,
			() => {
				message.success(friend.name + " deleted");
				props.reloadItems();
			},
			() => {}
		);
	}

	function cancel() {}
	function showTotal(total) {
		return "Total " + total.toString();
	}

	function changePage(page, pageSize) {
		props.dispatch({
			currPage: page,
			pageSize: pageSize,
			total: props.friendListState.total,
			items: props.friendListState.items,
		});
	}

	useEffect(props.reloadItems, [
		props.friendListState.currPage,
		props.friendListState.pageSize,
	]);

	return (
		<>
			<Table
				pagination={false}
				columns={columns}
				dataSource={props.friendListState.items}
			/>
			<Pagination
				size="small"
				total={props.friendListState.total}
				defaultCurrent={props.initialState.currPage}
				current={props.friendListState.currPage}
				pageSize={props.friendListState.pageSize}
				showTotal={showTotal}
				onChange={changePage}
				onShowSizeChange={changePage}
				showSizeChanger
			/>
			<DebtModal
				setModalState={props.setDebtModalState}
				modalState={props.debtModalState}
				reloadItems={props.reloadItems}
				currency={props.currency}
			></DebtModal>
			<DebtList
				setModalState={props.setListDebtState}
				modalState={props.listDebtState}
				reloadItems={props.reloadItems}
				currency={props.currency}
			></DebtList>
		</>
	);
}

export default FriendList;
