import React, { useEffect, useState } from "react";
import "../styles/views.css";
import axios from "axios";
import ReactLoading from "react-loading";

export default function AddMembers(props) {
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
        )}
      </div>
    </div>
  );
}
