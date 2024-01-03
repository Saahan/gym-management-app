import React, { useEffect, useState } from "react";
import "../styles/views.css";
import axios from "axios";
import ReactLoading from "react-loading";
import { Card } from "react-bootstrap";

export default function AddMembers(props) {
  // this is an admin-only view which allows the admin to allot a membership to guest users. A guest user account must exist for the admin to add him/her as a member.
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/userlist").then((docs) => {
      console.log(docs.data);
      setUserList(docs.data);
    });
  }, []);

  function allotMembership(uid) {
    axios({
      method: "put",
      url: "http://localhost:5000/api/allotmembership",
      data: {
        uid: uid,
      },
      headers: { "content-type": "application/json" },
    }).then((res) => {
      console.log(res);
    });

    props.refresh("Add Members");
  }

  return (
    <div className="container">
      <h1>Gym Guest Accounts:</h1> <hr />
      <div>
        {userList === null ? (
          <ReactLoading
            type="bubbles"
            color="rgb(209, 100, 50)"
            className="loading"
          />
        ) : userList.length === 0 ? (
          <p>
            No guest accounts found, please register users as guests before
            adding assigning them membership.
          </p>
        ) : (
          <div>
            <table className="members-table">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No.</th>
                  <th>Actions</th>
                </tr>
                {userList.map((item) => {
                  return (
                    <tr key={item.uid}>
                      <td>{item.fname + " " + item.lname}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn-add-member"
                          onClick={() => allotMembership(item.uid)}
                        >
                          Add Member
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {userList.map((item) => {
              return (
                <Card
                  key={item.uid}
                  className="members-card"
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <Card.Body>
                    <span>Name: {item.fname + " " + item.lname}</span> <br />
                    <span>Email: {item.email}</span>
                    <br />
                    <span>Phone: {item.phoneNumber}</span>
                    <br />
                    <button
                      style={{ marginTop: "20px" }}
                      className="btn-add-member"
                      onClick={() => allotMembership(item.uid)}
                    >
                      Add Member
                    </button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
