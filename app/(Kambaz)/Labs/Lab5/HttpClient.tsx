"use client";
import React, { useEffect, useState } from "react";
import * as client from "./client";

export default function HttpClient() {
  // State variables to hold messages
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");

  // Fetch when user clicks
  const fetchWelcomeOnClick = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnClick(message);
  };

  // Fetch automatically when component loads
  const fetchWelcomeOnLoad = async () => {
    const message = await client.fetchWelcomeMessage();
    setWelcomeOnLoad(message);
  };

  // useEffect runs once when the component first loads
  useEffect(() => {
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div>
      <h3>HTTP Client</h3>
      <hr />

      {/* 🔹 Requesting data when user clicks */}
      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button>
      <br />
      Response from server (on click): <b>{welcomeOnClick}</b>
      <hr />

      {/* 🔹 Requesting data automatically on load */}
      <h4>Requesting on Load</h4>
      Response from server (on load): <b>{welcomeOnLoad}</b>
      <hr />
    </div>
  );
}
