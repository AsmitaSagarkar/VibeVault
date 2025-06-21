'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'

export default function Register(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [toast,setToast]=useState('');

    const router = useRouter();

    const handleRegister = async(e:any)=>{

        e.preventDefault();
        setToast('');

        const res = await fetch('http://localhost:5000/api/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password})
        });
        const data = await res.json();
        if(res.status === 201){
            setToast("Registeration Successful! Redirecting to login...");
            setTimeout(()=>{
                router.push('/login');
            },200);
        }else{
            setToast(`${data.message}`);
        }
    }


    return(
        <main className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-center text-pink-600">Register</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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

        <button type="submit" className="w-full bg-pink-500 text-white p-3 rounded-lg hover:bg-pink-600 transition">
          Sign Up
        </button>

        {toast && <p className="text-center text-sm text-red-600">{toast}</p>}
      </form>
    </main>
    )
}