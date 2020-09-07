import React, { useState, useEffect } from "react";
import "./FriendForm.css";
import { addFriend } from "../../services/db.service";
import { Form, Input, Button } from "antd";

function FriendForm(props) {


	function onSubmit(value) {
		console.log(value.friendName);
		let friend = {
			name: value.friendName,
			createdAt: new Date(),
		};
		addFriend(
			friend,
			(response) => {
				props.reloadFriendList();
			},
			(response) => {
				console.error("Fail");
				console.error(response);
			}
		);
	}
	const [form] = Form.useForm();
	const [, forceUpdate] = useState();
	useEffect(() => {
		forceUpdate({});
	}, []);
	return (
		<div className="formWrapper">
			<div>
				<h2>Create a new Friend</h2>

				<Form form={form} onFinish={onSubmit} layout="inline">
					<Form.Item label="Friend Name" name="friendName" required>
						<Input />
					</Form.Item>

					<Form.Item shouldUpdate>
						{() => (
							<Button
								type="primary"
								htmlType="submit"
								disabled={
									!form.isFieldsTouched(true) ||
									form
										.getFieldsError()
										.filter(({ errors }) => errors.length)
										.length
								}
							>
								Create
							</Button>
						)}
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}

export default FriendForm;
