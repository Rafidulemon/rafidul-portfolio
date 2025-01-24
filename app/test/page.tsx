"use client";

import { error } from "console";
import { useState } from "react";

export default function Test() {
  const [result, setResult] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const sendEmail = () => {
    setLoading(true);

    fetch("/api/emails", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => setResult(error))
      .finally(() => setLoading(false));
  };
  return (
    <div className="p-4">
      <div className="my-4">{JSON.stringify(result)}</div>

      {loading && <div className="my-4">Loading...</div>}
      <button
        onClick={sendEmail}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Email
      </button>
    </div>
  );
}
