import React, { useState } from "react";
import "./Home.css";

import { Button, message } from "antd";

import Career from "../Components/Career";
import CheckOut from "../Components/CheckOut";
import Contacts from "../Components/Contacts";
import FeedBack from "../Components/FeedBack";
import HelpCart from "../Components/HelpCart";

export default function Home() {
  const [page, setPage] = useState(1);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Action in progress..',
        duration: 1.5,
      })
      .then(() => message.success('Loading finished', 2.5))
  };

  return (
    <div className="home-Body">
      {contextHolder}

      <div className="home-Left-Side">
        <Button
          style={{ marginTop: "20px" }}
          onClick={() => {
            setPage(1);
            success();
          }}
          size="large"
          type={page === 1 ? "primary" : "default"}
          danger
        >
          Career
        </Button>

        <Button
          style={{ marginTop: "20px" }}
          onClick={() => {
            setPage(2);
            success();
          }}
          size="large"
          type={page === 2 ? "primary" : "default"}
          danger
        >
          CheckOut
        </Button>

        <Button
          style={{ marginTop: "20px" }}
          onClick={() => {
            setPage(3);
            success();
          }}
          type={page === 3 ? "primary" : "default"}
          size="large"
          danger
        >
          Contacts
        </Button>

        <Button
          style={{ marginTop: "20px" }}
          onClick={() => {
            setPage(4);
            success();
          }}
          size="large"
          type={page === 4 ? "primary" : "default"}
          danger
        >
          FeedBack
        </Button>

        <Button
          style={{ marginTop: "20px" }}
          onClick={() => {
            setPage(5);
            success();
          }}
          size="large"
          type={page === 5 ? "primary" : "default"}
          danger
        >
          HelpCart
        </Button>
      </div>
      <div className="home-Right-Side">
        {page === 1 ? (
          <Career></Career>
        ) : page === 2 ? (
          <CheckOut></CheckOut>
        ) : page === 3 ? (
          <Contacts></Contacts>
        ) : page === 4 ? (
          <FeedBack></FeedBack>
        ) : page === 5 ? (
          <HelpCart></HelpCart>
        ) : (
          <h1> Error page</h1>
        )}
      </div>
    </div>
  );
}
