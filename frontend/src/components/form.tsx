'use client';
import { useEffect, useState } from "react";


export default function Form() {


  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");
  const [quote, setQuote] = useState("");



  const handleSubmit = async (e: any) => {

    e.preventDefault();
    setToast("");


    const res = await fetch("http://localhost:5000/api/mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mood,
        message,
        sentiments: mood === "sad" ? "negative" : "positive"
      }),

    });


    const data = await res.json();

    if (data.success) {
      setToast("Mood submitted Successfully!");
      setMood("");
      setMessage("");


      if (mood === 'sad') {
        const quoteRes = await fetch("http://localhost:5000/api/mood/quote");
        console.log("22222",quoteRes);
        const json = await quoteRes.json();
        setQuote(json.quote);
      }
    }
    else {
      setToast(`Error submitting mood : ${data.message}`);
    }



  }
  return (

    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg space-y-6 border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700">
          Welcome to <span className="text-pink-500">VibeVault</span> 💖
        </h1>

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="">✨ Select your mood</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😔 Sad</option>
          <option value="angry">😡 Angry</option>
          <option value="excited">😄 Excited</option>
        </select>

        <textarea
          placeholder="Share your thoughts..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
          className="w-full h-28 p-3 border border-gray-300 rounded-xl bg-white resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow hover:from-indigo-600 hover:to-pink-600 transition"
        >
          Submit Mood 💌
        </button>

        {toast && (
          <div className="text-center text-sm text-green-600 font-medium">
            {toast}
          </div>
        )}

         {quote && (
          <div className="mt-4 bg-indigo-50 p-4 rounded-xl text-center text-indigo-700 italic text-sm shadow">
            {quote}
          </div>
        )}
      </form>
    </main>
  )


} 