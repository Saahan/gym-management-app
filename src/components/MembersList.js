import React, { useEffect, useState } from "react";
import "../styles/views.css";
import axios from "axios";
import ReactLoading from "react-loading";

export default function MembersList(props) {
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/memberdetails").then((docs) => {
      console.log(docs.data);
      setMemberData(docs.data);
    });
  }, []);

  function editMember(member) {
    console.log(member);
  }

  function removeMember(uid) {
    axios({
      method: "put",
      url: "http://localhost:5000/api/cancelmembership",
      data: {
        uid: uid,
      },
      headers: { "content-type": "application/json" },
    }).then((res) => console.log(res));

    props.refresh("Members");
  }

  return (
    <div className="container">
      <h1>Members:</h1>
      <hr />
      <div>
        {memberData !== null ? (
          <table className="members-table">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Actions</th>
              </tr>
              {memberData.map((item) => {
                return (
                  <tr key={item.uid}>
                    <td>{item.fname + " " + item.lname}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn-members"
                        onClick={() => editMember(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-members"
                        onClick={() => removeMember(item.uid)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <ReactLoading
            type="bubbles"
            color="rgb(209, 100, 50)"
            className="loading"
          />
        )}
      </div>
    </div>
  );
}
