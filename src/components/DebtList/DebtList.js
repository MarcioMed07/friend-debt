import React from "react";
import { Modal, Button, Table, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { removeDebt } from "../../services/db.service";
import { format } from "date-fns";

function DebtList(props) {
	function handleOk(e) {
		props.setModalState({
			visible: false,
			friend: props.modalState.friend,
		});
	}

	const columns = [
		{
			title: "Value",
			dataIndex: "value",
			key: "value",
			render: (text, record) =>
				Intl.NumberFormat(navigator.language, {
					style: "currency",
					currency: props.currency,
				}).format(record.value),
		},
		{
			title: "Description",
			dataIndex: "description",
			key: "description",
			render: (text, record) => (
				<Tooltip placement="topLeft" title={record.description}>
					{record.description}
				</Tooltip>
			),
		},
		{
			title: "Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (text, record) =>
				format(record.createdAt, "Pp"),
		},
		{
			title: "Delete",
			dataIndex: "delete",
			key: "delete",
			render: (text, record) => (
				<Tooltip title={"Delete Debt"}>
					<Button
						onClick={() => {
							removeDebt(
								record.friendId,
								record.id,
								(response) => {
									props.setModalState({
										okDisabled: true,
										visible: true,
										friend: response,
									});
									props.reloadItems();
								}
							);
						}}
						shape="circle"
						icon={<DeleteOutlined />}
					/>
				</Tooltip>
			),
		},
	];

	return (
		<>
			<Modal
				title={props.modalState.friend?.name + " Debts"}
				visible={props.modalState.visible}
				onCancel={handleOk}
				onOk={handleOk}
				footer={[
					<Button key="ok" type="primary" onClick={handleOk}>
						Ok
					</Button>,
				]}
			>
				<Table
					pagination={false}
					columns={columns}
					dataSource={Object.values(
						props.modalState.friend?.debts || {}
					)}
				/>
			</Modal>
		</>
	);
}

export default DebtList;
