"use client"
import axios from "axios";

export async function useConnect() {

    // Vous devez utiliser les identifiants "abc" et "123".
    const response = await axios.post("http://localhost:5143/api/Users/Login", {
        username: "abc",
        password: "123"
    });
    console.log(response.data);

    localStorage.setItem("token", response.data.token) // ... ou dans le stockage local.
    return response.data.token
}