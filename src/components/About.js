import React from "react";
import "../styles/views.css";

export default function About() {
  return (
    <div className="container">
      <h1>About</h1> <hr />
      <img
        src="/img/generic_gym.jpg"
        className="generic-gym"
        alt="gym"
      ></img>
      <p>
        We at Planet Fit strive to provide access to the best in class gym
        equipment and services to our customers. We have all major gym
        equipment, a cardio area, a sports training area and a sauna bath area.
        We have helpful, dedicated trainers and dieticians to help you achieve
        your fitness goals.
      </p>
    </div>
  );
}
