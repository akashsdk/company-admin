import React, { useEffect, useState } from "react";
import "./HelpCart.css";
import { Button, Modal } from "antd";
import { EditOutlined, DiffOutlined } from "@ant-design/icons";

import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

export default function HelpCart() {
  const [page, setPage] = useState(1);

  const [userCount, setUserCount] = useState(0);
  const [seenCount, setSeenCount] = useState(0);
  const [unseenCount, setUnseenCount] = useState(0);

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    lastName: "",
    phone: "",
    text: "",
  });

  const usersCollectionRef = collection(db, "helpcart");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(usersCollectionRef);
        const fetchedUsers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedUsers);
        setUsers(fetchedUsers);

        // Set the user count
        setUserCount(querySnapshot.size);

        // Count seen and unseen messages
        const seenMessages = fetchedUsers.filter(
          (user) => user.color === "Seen"
        );
        setSeenCount(seenMessages.length);
        setUnseenCount(querySnapshot.size - seenMessages.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, [usersCollectionRef]);

  const handleDeleteUser = async (userId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (confirmed) {
        await deleteDoc(doc(usersCollectionRef, userId));
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        console.log("User deleted successfully!");
      } else {
        console.log("User deletion cancelled.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      await addDoc(usersCollectionRef, { ...newUser, color: "Unseen" });
      console.log("User added successfully!");
      setNewUser({
        email: "",
        name: "",
        lastName: "",
        phone: "",
        text: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateColor = async (userId) => {
    try {
      await updateDoc(doc(usersCollectionRef, userId), { color: "Seen" });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, color: "Seen" } : user
        )
      );
      console.log(`Color updated to 'Seen' for user ${userId}`);
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  return (
    <div className="HelpCart-Body">
      <div className="HelpCart-TopBox">
        <Button
          type="primary"
          size="large"
          icon={<DiffOutlined />}
          onClick={() => {
            setPage(1);
          }}
        >
          Read
        </Button>
        <h1>HelpCart</h1>
        <Button
          type="primary"
          size="large"
          icon={<EditOutlined />}
          onClick={() => {
            setPage(2);
          }}
        >
          Write
        </Button>
      </div>

      <div className="HelpCart-Div">
        <p style={{ color: "blue" }}>Total Message: ({userCount})</p>
        <p style={{ color: "green" }}>Seen: ({seenCount})</p>
        <p style={{ color: "red" }}>Unseen: ({unseenCount})</p>
      </div>

      {page === 1 ? (
        <div className="HelpCart-Box">
          {users.map((user) => (
            <div className="HelpCart-Box-Div" key={user.id}>
              <p>
                Full Name: " {user.name} {user.lastName} "
              </p>
              <p>Email: " {user.email} "</p>
              <p>Phone: " {user.phone} "</p>
              <p>Text: " {user.text} "</p>
              <p
                style={{
                  color: user.color === "Unseen" ? "red" : "green",
                }}
              >
                Message Status: '{user.color}'
              </p>
              <div>
                <Button
                  type="primary"
                  onClick={() => handleUpdateColor(user.id)}
                >
                  Message Seen
                </Button>

                <Button
                  type="primary"
                  danger
                  onClick={() => handleDeleteUser(user.id)}
                  style={{ marginLeft: "30px" }}
                >
                  Delete
                </Button>
              </div>
              <div className="HelpCart-Box-Line" />
            </div>
          ))}
        </div>
      ) : page === 2 ? (
        <div className="HelpCart-Box">
          {" "}
          <div>
            <h2>Add User</h2>
            <label>Email: </label>
            <input
              type="text"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Last Name: </label>
            <input
              type="text"
              name="lastName"
              value={newUser.lastName}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Phone: </label>
            <input
              type="text"
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Text: </label>
            <input
              type="text"
              name="text"
              value={newUser.text}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <br />

            <button onClick={handleAddUser}>Add User</button>
          </div>
        </div>
      ) : (
        <h1> Error page</h1>
      )}
    </div>
  );
}
