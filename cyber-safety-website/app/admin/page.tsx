"use client";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => setTitle(data.title));
  }, []);

  const handleSave = async () => {
    await fetch("/api/content", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    alert("Saved!");
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}