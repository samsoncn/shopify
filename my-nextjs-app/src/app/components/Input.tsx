"use client";

import React, { useState } from "react";

const UrlShortener = () => {
  // State for holding the original and shortened URLs
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: url }),
    });

    const data = await response.json();
    setShortenedUrl(data.shortenedUrl);
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        {/* Input field for entering the original URL */}
        <input
          type="text"
          placeholder="Enter URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ padding: "10px", marginRight: "10px" }}
        />
        {/* Submit button */}
        <button type="submit" style={{ padding: "10px" }}>
          Shorten URL
        </button>
      </form>

      {/* Display the shortened URL */}
      {shortenedUrl && (
        <div style={{ marginTop: "20px" }}>
          <h2>Shortened URL:</h2>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
