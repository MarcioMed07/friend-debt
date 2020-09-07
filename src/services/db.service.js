let db;
let dbName = "friendDebtDB";
let friendStoreName = "friend";

export default function startDB(callback) {
	if (db) {
		callback(db);
	} else {
		if (window.indexedDB) {
			const request = window.indexedDB.open(dbName, 1);
			request.onerror = (event) => {
				console.error("Error Request", event);
			};
			request.onsuccess = (event) => {
				db = request.result;
				console.log("DB loaded");
				callback(db);
			};
			request.onupgradeneeded = (event) => {
				db = event.target.result;
				const objectStoreFriend = createFriendStore();
				if (!objectStoreFriend) {
					console.error("Error creating friend store");
				}
			};
		}
	}
}

function createFriendStore() {
	const objectStore = db.createObjectStore(friendStoreName, {
		keyPath: "id",
		autoIncrement: true,
	});

	objectStore.createIndex("name", "name", { unique: false });
	objectStore.createIndex("createdAt", "createdAt", { unique: false });
	objectStore.createIndex("debts", "debts", { unique: false });
	return objectStore;
}

export function addFriend(friend, success, error) {
	if (!db) {
		console.error("db not found");
		return;
	} else {
		const transaction = db.transaction([friendStoreName], "readwrite");
		const objectStore = transaction.objectStore(friendStoreName);
		let newFriend = {
			name: friend.name,
			createdAt: new Date(),
			debts: {},
		};
		objectStore.add(newFriend);
		transaction.oncomplete = (event) => {
			success(event);
		};
		transaction.onerror = (event) => {
			error(event);
		};
	}
}

export function removeFriend(friendId, success, error) {
	if (!db) {
		console.error("db not found");
		return;
	} else {
		const transaction = db.transaction([friendStoreName], "readwrite");
		const objectStore = transaction.objectStore(friendStoreName);
		objectStore.delete(friendId);
		transaction.oncomplete = (event) => {
			success(event);
		};
		transaction.onerror = (event) => {
			error(event);
		};
	}
}

export function getFriend(friendId, success, error) {
	if (!db) {
		console.error("db not found");
		return;
	} else {
		const transaction = db.transaction([friendStoreName], "readwrite");
		const objectStore = transaction.objectStore(friendStoreName);
		const request = objectStore.get(friendId);
		request.onsuccess  = (event) => {
			success(request.result);
		};
		request.onerror = (event) => {
			error(event);
		};
	}
}

export function getFriends(paginator, success, error) {
	if (!db) {
		console.error("db not found");
		return;
	} else {
		const transaction = db.transaction(friendStoreName);
		const objectStore = transaction.objectStore(friendStoreName);
		const countRequest = objectStore.count();
		countRequest.onsuccess = () => {
			const friends = [];
			const cursorOpener = objectStore.openCursor();
			let skipped = false;
			let counter = 0;
			cursorOpener.onsuccess = (event) => {
				let cursor = event.target.result;
				if (cursor) {
					let friend = cursor.value;
					if (paginator?.offset && !skipped) {
						skipped = true;
						cursor.advance(paginator?.offset);
					} else {
						friends.push(friend);
						counter++;
						if (
							!(paginator?.limit && counter >= paginator?.limit)
						) {
							cursor.continue();
						} else {
							cursor = null;
						}
					}
				}
				if (!cursor) {
					const response = {
						data: friends,
						total: countRequest.result,
						currPage: paginator?.offset / paginator?.limit + 1,
						pageSize: paginator?.limit,
					};
					success(response);
				}
			};

			cursorOpener.onerror = (event) => {
				error(event);
			};
		};
	}
}

export function addDebt(friendId, debt, success, error) {
	if (!db) {
		console.error("db not found");
		return;
	} else {
		const transaction = db.transaction([friendStoreName], "readwrite");
		const objectStore = transaction.objectStore(friendStoreName);
		const request = objectStore.get(friendId);
		request.onsuccess = (event) => {
			const friend = event.target.result;
			const newIndex =
				Object.values(friend.debts).length > 0
					? Math.max(...Object.keys(friend.debts)) + 1
					: 0;
			debt["id"] = newIndex;
			friend.debts[newIndex] = debt;
			const newRequest = objectStore.put(friend);
			newRequest.onsuccess = (event) => {
				success(event);
			};
		};
	}
}

export function removeDebt(friendId, debtId, success, error) {
	if (!db) {
		console.error("db not found");
		return;
	} else {
		getFriend(friendId, (friend) => {
			delete friend.debts[debtId]
			const transaction = db.transaction([friendStoreName], "readwrite");
			const objectStore = transaction.objectStore(friendStoreName);
			const request = objectStore.put(friend)
			request.onsuccess = (event) => {
				success(friend)
			}
		});
	}
}
