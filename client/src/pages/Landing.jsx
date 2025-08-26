import React, { useState } from "react";
import Navbar from "./Navbar";

export default function UrlShortener() {
  const [id, setId] = useState(null);
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");

  const API_BASE = "http://localhost:8000"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (res.ok) {
        setId(data.shortid); 
        setUrls((prev) => [...prev, data]);
      } else {
        setError(data.message || "Failed to shorten URL");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }

    setUrl("");
  };

  const handleDelete = async (shortid) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) return;

    try {
      await fetch(`${API_BASE}/url/${shortid}`, { method: "DELETE" });
      setUrls((prev) => prev.filter((u) => u.shortid !== shortid));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-indigo-100 min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10">
          <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
            🔗 URL Shortener
          </h1>

          {id && (
            <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6 text-center">
              <p className="font-medium">Generated URL:</p>
              <a
                href={`${API_BASE}/url/${id}`}
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-600"
              >
                {`${API_BASE}/url/${id}`}
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mb-10">
            <label
              htmlFor="url"
              className="block text-gray-700 font-semibold mb-2"
            >
              Enter your Original URL
            </label>
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <input
                type="text"
                id="url"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
              >
                Generate
              </button>
            </div>
          </form>

          {error && (
            <p className="text-red-500 font-medium text-center mb-4">{error}</p>
          )}

          {urls.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                All Shortened URLs
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-sm">
                  <thead className="bg-indigo-600 text-white">
                    <tr>
                      <th className="py-2 px-4 text-left">SL NO.</th>
                      <th className="py-2 px-4 text-left">Short ID</th>
                      <th className="py-2 px-4 text-left">Redirect URL</th>
                      <th className="py-2 px-4 text-left">Clicks</th>
                      <th className="py-2 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {urls.map((urlItem, index) => (
                      <tr
                        key={urlItem.shortid}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4 font-mono text-indigo-600">
                          {urlItem.shortid}
                        </td>
                        <td className="py-2 px-4">
                          <a
                            href={urlItem.redirecturl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline break-words"
                          >
                            {urlItem.redirecturl}
                          </a>
                        </td>
                        <td className="py-2 px-4 text-center">
                          {urlItem.viewHistory?.length || 0}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleDelete(urlItem.shortid)}
                            className="text-red-600 hover:text-red-800 font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No URLs have been shortened yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
