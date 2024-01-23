// UserCard.js
import React from "react";

const UserCard = ({ user }) => (
  <div className="user-card" key={user._id}>
    <h3>Username: {user.username}</h3>
    <p>Role: {user.role}</p>
    <div>
      <h4>Task List:</h4>
      <ul>
        {user.list.map((task) => (
          <li key={task._id}>
            <p>Title: {task.title}</p>
            <p>Body: {task.body}</p>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default UserCard;
