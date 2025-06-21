'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login(){


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [toast,setToast]=useState('');
    const router = useRouter();

    const handleLogin = async(e:any)=>{
        e.preventDefault();
        setToast('');

        const res = await fetch('http://localhost:5000/api/login',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({email,password}),
            credentials: 'include'
        })
        const data = await res.json();

        if(res.status === 200){
            setToast("Login successful! Redirecting to home...");
            setTimeout(()=>{
                router.push('/dashboard');
            },2000)

        }else{
            setToast(`${data.message}`);
        }
    }

    return (
         <main className="min-h-screen flex items-center justify-center bg-indigo-50 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-center text-indigo-600">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition">
          Log In
        </button>

        {toast && <p className="text-center text-sm text-red-600">{toast}</p>}
      </form>
    </main>
    )
}