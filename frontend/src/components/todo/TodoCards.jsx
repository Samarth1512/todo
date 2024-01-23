import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({
  title,
  body,
  id,
  delid,
  display,
  updateId,
  toBeUpdate,
}) => {
  const [completed, setCompleted] = useState(false);

  const toggleCompletion = () => {
    setCompleted(!completed);
  };

  const cardStyle = {
    backgroundColor: completed ? "#c8e6c9" : "inherit",
    // Add any other styles you want for completed or non-completed tasks
  };

  return (
    <div className="p-3 todo-card" style={cardStyle}>
      <div>
        <h5>{title}</h5>
        <p className="todo-card-p">{body.split("", 77)}...</p>
      </div>
      <div className="d-flex justify-content-around ">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 "
          onClick={() => {
            display("block");
            toBeUpdate(updateId);
          }}
        >
          <GrDocumentUpdate className="card-icons" /> Update
        </div>
        <div
          className={`d-flex justify-content-center align-items-center card-icon-head px-2 py-1 ${
            completed ? "text-success" : "text-danger"
          }`}
          onClick={toggleCompletion}
        >
          {completed ? "Uncomplete" : "Complete"}
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-head  px-2 py-1 text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <AiFillDelete className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
};

export default TodoCards;
