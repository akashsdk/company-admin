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

export default function Career() {
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

    selectOption: "",
    selectOption2: "",
    selectOption3: "",
  });

  const usersCollectionRef = collection(db, "career");

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

        selectOption: "",
        selectOption2: "",
        selectOption3: "",
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
        <h1>Career</h1>
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
              <div className="HelpCart-Career-div">
                <p>Full Name: " {user.input1} </p>
                <p style={{ color: "green", marginLeft: "10px" }}>
                  {user.input2} "
                </p>
              </div>
              <p>Email: " {user.input3} "</p>
              <p>Phone: " {user.input4} "</p>
              <p>NID/Pass: " {user.input5} "</p>
              <p>Position: " {user.selectOption} "</p>
              <p>Category: " {user.selectOption2} "</p>
              <p>Experience: " {user.selectOption3} "</p>
              <p>GitHub Link: " {user.input6} "</p>
              <p>Address: " {user.input7} "</p>
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

            <label>Last Name: </label>
            <input
              type="text"
              name="input2"
              value={newUser.input2}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Email : </label>
            <input
              type="text"
              name="input3"
              value={newUser.input3}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>Phone: </label>
            <input
              type="text"
              name="input4"
              value={newUser.input4}
              onChange={handleInputChange}
            />
            <br />
            <br />

            <label>NID/Pass: </label>
            <input
              type="text"
              name="input5"
              value={newUser.input5}
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
              <option value="">Position</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Sr. Software Engineer">
                Sr. Software Engineer
              </option>
              <option value="UX Designer">UX Designer</option>
              <option value="Sr. UX Designer">Sr. UX Designer</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Sr. Graphic Designer">Sr. Graphic Designer</option>
              <option value="Digital Marketer">Digital Marketer</option>
              <option value="Content Writer">Content Writer</option>
            </select>
            <br />
            <br />
            <br />

            <select
              name="selectOption2"
              value={newUser.selectOption2}
              onChange={handleInputChange}
            >
              <option value="">Category</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="Golang">Golang</option>
              <option value="PHP">PHP</option>
              <option value="Node Js">Node Js</option>
              <option value="DevOps">DevOps</option>
              <option value="Database">Database</option>
              <option value="SQA">SQA</option>
              <option value="Game Development">Game Development</option>
              <option value="Server Security">Server Security</option>
              <option value="Other's">Other's</option>
            </select>
            <br />
            <br />
            <br />

            <select
              name="selectOption3"
              value={newUser.selectOption3}
              onChange={handleInputChange}
            >
              <option value="">Experience </option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5 Years">5 Years</option>
              <option value="5 Years +">5 Years +</option>
              <option value="Fresher or Internship">
                Fresher or Internship
              </option>
            </select>

            <br />
            <br />
            <br />

            <label> GitHub: </label>
            <input
              type="text"
              name="input6"
              value={newUser.input6}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <br />

            <label> Address: </label>
            <input
              type="text"
              name="input7"
              value={newUser.input7}
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
