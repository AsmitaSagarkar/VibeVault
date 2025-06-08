'use client';
import { useState } from "react";


export default function Home() {


  const [mood, setMood] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");


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

    if(data.success){
      setToast("Mood submitted Successfully!");
      setMood("");
      setMessage("");
    }
    else{
      setToast(`Error submitting mood : ${data.message}` );
    }



  }
  return (

    <main>
      <form 
      onSubmit={handleSubmit} >
      
      <h1>Welcome to Vibe Vault</h1>
      <select 
      value={mood}
      onChange={(e)=>setMood(e.target.value)}
      required>
        <option value="">Select your mood</option>
        <option value="happy">😊 Happy</option>
        <option value="sad">😔 sad</option>
        <option value="angry">😡 Angry</option>
        <option value="excited">😄 Excited</option>
      </select>
      <textarea
      placeholder="Share your thoughts..."
      onChange={(e)=>setMessage(e.target.value)}
      value={message}
      required
      ></textarea>

      <button type="submit">Submit Mood</button>

      {toast && <div>{toast}</div>}
      </form>

    </main>
  )


} 