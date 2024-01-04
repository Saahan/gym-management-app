import React, { useEffect, useState } from "react";
import "../styles/views.css";
import ReactTimeAgo from "react-time-ago";
import { Button } from "react-bootstrap";
import axios from "axios";
import ReactLoading from "react-loading";
import { domainName } from "../Functions/portVariable";

export default function Notifications(props) {
  const [notificationsArr, setNotificationsArr] = useState(null);

  useEffect(() => {
    //get notifications data from the backend database and save it as a state to be mapped in the return statement
    axios
      .get(`${domainName}/api/usernotifications`, {
        params: { uid: props.userData.uid },
      })
      .then((res) => {
        setNotificationsArr(res.data[0].notifications);
      });
  }, [props.userData.uid]);

  function clearNotifications() {
    // this function allows to clear the notification array in the database
    axios({
      method: "put",
      url: `${domainName}/api/clearnotifications`,
      data: {
        uid: props.userData.uid,
      },
      headers: { "content-type": "application/json" },
    }).then(props.refresh("Notifications"));
  }

  return (
    <div className="container">
      <h1>Notifications</h1> <hr />
      <Button
        variant="primary"
        className="btn-members"
        style={{ marginBottom: "20px" }}
        onClick={clearNotifications}
      >
        Clear
      </Button>
      {notificationsArr === null ? (
        <ReactLoading
          type="bubbles"
          color="rgb(209, 100, 50)"
          className="loading"
        />
      ) : notificationsArr.length !== 0 ? (
        notificationsArr.toReversed().map((item) => {
          return (
            <p key={item.id}>
              <ReactTimeAgo date={Date.parse(item.date)} locale="en-US" /> -{" "}
              {item.message}
            </p>
          );
        })
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
}
