
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3K_Z7dUWHb7vrorDTYK-dVJTwNKxXf6U",
  authDomain: "portfoliogit-35b9b.firebaseapp.com",
  projectId: "portfoliogit-35b9b",
  storageBucket: "portfoliogit-35b9b.firebasestorage.app",
  messagingSenderId: "681787938498",
  appId: "1:681787938498:web:16626784104d06811b0d5b",
  measurementId: "G-WJ7D1HNQQX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();

export { auth, githubProvider };