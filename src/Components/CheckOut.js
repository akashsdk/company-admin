import React, { useEffect, useState } from "react";
import "./HelpCart.css";
import { Button } from "antd";
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

export default function CheckOut() {
  const [page, setPage] = useState(1);

  const [userCount, setUserCount] = useState(0);
  const [seenCount, setSeenCount] = useState(0);
  const [unseenCount, setUnseenCount] = useState(0);

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
    input9: "",
    input10: "",

    selectOption: "",
    selectOption2: "",
    selectOption3: "",
    selectOption4: "",
    selectOption5: "",
  });

  const usersCollectionRef = collection(db, "checkout");

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
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
        input9: "",
        input10: "",

        selectOption: "",
        selectOption2: "",
        selectOption3: "",
        selectOption4: "",
        selectOption5: "",
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
        <h1>CheckOut</h1>
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
              <p>Full Name: " {user.input1} </p>
              <p>Email: " {user.input2} "</p>
              <p>Phone: " {user.input3} "</p>
              <p>Address: " {user.input4} "</p>
              <p>Message: " {user.input5} "</p>
              <p>Application Name: " {user.input6} "</p>
              <p>Project Proposal: " {user.input7} "</p>
              <p>Application Type: " {user.selectOption} "</p>
              <p>Admin Dashboard: " {user.selectOption2} "</p>
              <p>Core Programming Language : " {user.selectOption3} "</p>
              <p>Programming Language : " {user.selectOption4} "</p>
              <p>Package : " {user.selectOption5} "</p>
              <p>Custom Package: " {user.input10} "</p>
              <p>Project Budget: " {user.input8} "</p>
              <p>Project Details: " {user.input9} "</p>
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
          <div>
            <h2>Add User</h2>
            <label>First Name: </label>
            <input
              type="text"
              name="input1"
              value={newUser.input1}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Email Id: </label>
            <input
              type="text"
              name="input2"
              value={newUser.input2}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Phone No: </label>
            <input
              type="text"
              name="input3"
              value={newUser.input3}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Address: </label>
            <input
              type="text"
              name="input4"
              value={newUser.input4}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Message : </label>
            <input
              type="text"
              name="input5"
              value={newUser.input5}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <br />

            <label>Application Name: </label>
            <input
              type="text"
              name="input6"
              value={newUser.input6}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <br />

            <label>Project Proposal: </label>
            <input
              type="text"
              name="input7"
              value={newUser.input7}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <br />

            <select
              name="selectOption"
              value={newUser.selectOption}
              onChange={handleInputChange}
            >
              <option value="">Application Type (Optional)</option>
              <option value="Web Application">Web Application</option>
              <option value="Mobile Application">Mobile Application</option>
              <option value="Both (Web & Mobile)">Both (Web & Mobile)</option>
              <option value="Desktop Application">Desktop Application</option>
              <option value="Game Development">Game Development</option>
            </select>
            <br />
            <br />
            <br />

            <select
              name="selectOption2"
              value={newUser.selectOption2}
              onChange={handleInputChange}
            >
              <option value="">Admin Dashboard (Optional)</option>
              <option value="Website"> Website </option>
              <option value="Application"> Application</option>
              <option value="Both">Both</option>
              <option value="Without Admin Panel">Without Admin Panel</option>
            </select>
            <br />
            <br />
            <br />

            <select
              name="selectOption3"
              value={newUser.selectOption3}
              onChange={handleInputChange}
            >
              <option value="">Core Programming Language (Optional)</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="Java">Java</option>
            </select>

            <br />
            <br />
            <br />
            <select
              name="selectOption4"
              value={newUser.selectOption4}
              onChange={handleInputChange}
            >
              <option value="">Programming Language (Optional)</option>
              <option value="Only Front-End">Only Front-End</option>
              <option value="Only Back-End">Only Back-End</option>
              <option value="Front-End & Back-End">Front-End & Back-End</option>
            </select>

            <br />
            <br />
            <br />
            <select
              name="selectOption5"
              value={newUser.selectOption5}
              onChange={handleInputChange}
            >
              <option value="">Package (Optional)</option>
              <option value="Basic">Basic (1-5 page up to 6 sections)</option>
              <option value="Standard">Standard (1 to 10 pages)</option>
              <option value="Premium">Premium (1 to 20 pages)</option>
              <option value="Custom Package">Custom Package</option>
            </select>

            <br />
            <br />
            <br />
            <label>Custom Package: </label>
            <input
              type="text"
              name="input10"
              value={newUser.input10}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <br />

            <label> Project Budget: </label>
            <input
              type="text"
              name="input8"
              value={newUser.input8}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <br />

            <label> Project Details: </label>
            <input
              type="text"
              name="input9"
              value={newUser.input9}
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
