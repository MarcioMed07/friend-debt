import React, { useState, useReducer, useEffect } from "react";
import { Modal, Row, Col, Input, Switch, message, DatePicker } from "antd";
import { addDebt } from "../../services/db.service";

function DebtModal(props) {
	function handleOk(e) {
		props.setModalState({
			confirmLoading: true,
			visible: true,
			friend: props.modalState.friend,
			cancelDisabled: true,
		});
		createDebt(
			props.modalState.friend.id,
			parse(formState.value),
			formState.description,
			formState.switch ? new Date() : formState.date
		);
	}

	function handleCancel(e) {
		dispatchForm(initialValue);
		props.setModalState({
			visible: false,
			friend: props.modalState.friend,
		});
	}

	function createDebt(friendId, value, description, date) {
		let newDebt = {
			description: description,
			value: typeof value === "string" ? parse(value) : value,
			friendId: friendId,
			createdAt: date,
		};
		addDebt(
			friendId,
			newDebt,
			(response) => {
				props.reloadItems();
				props.setModalState({
					visible: false,
					friend: props.modalState.friend,
				});
				dispatchForm(initialValue);
				message.success("Debt created");
			},
			(error) => {
				console.error(error);
			}
		);
	}

	function parse(value) {
		return (
			Number.parseFloat(value.replaceAll(".", "").replaceAll(",", "")) /
			100
		);
	}

	function onSwitchChange(e) {
		dispatchForm({
			switch: e,
		});
	}

	function onDateChange(e) {
		dispatchForm({
			date: e.toDate(),
		});
	}

	function onDescriptionChange(e) {
		let { value } = e.target;

		dispatchForm({
			description: value,
		});
	}

	function onValueChange(e) {
		let { value } = e.target;
		if (value === "") {
			value = 0.0;
		} else {
			value = parse(value);
		}
		if (!Number.isNaN(value)) {
			if (value === 0) {
				props.setModalState({
					okDisabled: true,
					visible: true,
					friend: props.modalState.friend,
				});
			} else {
				props.setModalState({
					okDisabled: false,
					visible: true,
					friend: props.modalState.friend,
				});
			}
			dispatchForm({
				value: Intl.NumberFormat(navigator.language, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}).format(value),
			});
		}
	}
	function reducerForm(state, newState) {
		if (newState.value !== undefined) {
			state.value = newState.value;
		}
		if (newState.description !== undefined) {
			state.description = newState.description;
		}
		if (newState.date !== undefined) {
			state.date = newState.date;
		}
		if (newState.switch !== undefined) {
			state.switch = newState.switch;
			if (state.switch) {
				state.dateForm = <></>;
			} else {
				state.dateForm = (
					<Col span={12}>
						<Row>Date</Row>
						<DatePicker showTime onChange={onDateChange} />
					</Col>
				);
			}
		}
		console.log(parse(state.value));
		return { ...state };
	}
	const initialValue = {
		value: "0.00",
		description: "",
		date: new Date(),
		switch: true,
		dateForm: <></>,
	};
	const [, forceUpdate] = useState();
	useEffect(() => {
		forceUpdate({});
	}, []);
	const [formState, dispatchForm] = useReducer(reducerForm, initialValue);
	return (
		<>
			<Modal
				title={"Add Debt to " + props.modalState.friend?.name}
				visible={props.modalState.visible}
				confirmLoading={props.modalState.confirmLoading}
				onOk={handleOk}
				onCancel={handleCancel}
				okButtonProps={{
					disabled: props.modalState.okDisabled,
				}}
				cancelButtonProps={{
					disabled: props.modalState.cancelDisabled,
				}}
				closable={false}
				maskClosable={false}
			>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Row>Value</Row>
						<Input
							value={formState.value}
							onChange={onValueChange}
							prefix="$"
							maxLength={12}
						/>
					</Col>
					<Col span={12}>
						<Row>Description</Row>
						<Input.TextArea
							value={formState.description}
							onChange={onDescriptionChange}
						/>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Row>Current Date</Row>
						<Switch checked={formState.switch} onChange={onSwitchChange} />
					</Col>

					{formState.dateForm}
				</Row>
			</Modal>
		</>
	);
}

export default DebtModal;
