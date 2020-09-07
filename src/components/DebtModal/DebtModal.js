import React, { useState, useReducer } from "react";
import { Modal, Row, Col, Input, Switch, message } from "antd";
import { addDebt } from "../../services/db.service";
import Form from "antd/lib/form/Form";

function DebtModal(props) {
	function handleOk(e) {
		setValueState("0,00");
		props.setModalState({
			confirmLoading: true,
			visible: true,
			friend: props.modalState.friend,
			cancelDisabled: true,
		});
	}

	function handleCancel(e) {
		setValueState("0,00");
		props.setModalState({
			visible: false,
			friend: props.modalState.friend,
		});
	}

	function createDebt(friendId, value, description, date) {
		let newDebt = {
			description: description,
			value: parse(value),
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

	function onSwitchChange(e) {}

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
			setValueState(
				Intl.NumberFormat("pt-Br", {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}).format(value)
			);
		}
	}
	function reducerForm(state, newState) {
		if(newState.value){
			state.value = newState.value
		}
		if(newState.description){
			state.description = newState.description
		}
		if(newState.description){
			state.description = newState.description
		}
	}
	const initialValue = {
		value: 0.0,
		description: "",
		date: new Date(),
	};
	const [valueState, setValueState] = useState("0,00");
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
							value={valueState}
							onChange={onValueChange}
							prefix="$"
							maxLength={12}
						/>
					</Col>
					<Col span={12}>
						<Row>Description</Row>
						<Input.TextArea />
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Row>Current Date</Row>
						<Switch defaultChecked onChange={onSwitchChange} />
					</Col>

					<Col span={12}>
						<Row>Date</Row>
						<Input />
					</Col>
				</Row>
			</Modal>
		</>
	);
}

export default DebtModal;
