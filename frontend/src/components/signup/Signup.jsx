import React, { useState } from "react";
import axios from "axios";
import HeadingComp from "./HeadingComp";
import "./signup.css";
import { Container, Row, Col } from "react-grid-system";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "user", // default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/register", formData);
      console.log(response.data);
      // You can handle success here, e.g., redirect to a new page
    } catch (error) {
      console.error("Error signing up:", error.response.data.message);
      // Handle error, show a message, etc.
    }
  };

  return (
    <section className="signup">
      <Container>
        <Row>
          <Col lg={8} className="d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-3">
              <form onSubmit={handleSubmit}>
                <input
                  className="p-2 my-3 input-signup"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 my-3 input-signup"
                  type="text"
                  name="username"
                  placeholder="Enter Your Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-2 my-3 input-signup"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label>
                  Role:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
                <button className="btn-signup p-2" type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </Col>
          <Col lg={4} className="col-left d-flex justify-content-center align-items-center d-none">
            <HeadingComp first="Sign" second="Up" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
