import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ================================
// Your Firebase Config
// ================================
const firebaseConfig = {
  apiKey: "AIzaSyDdObYiS_2YMjdm6FVbBTb8gkLhlxUTF80",
  authDomain: "chat-c513e.firebaseapp.com",
  projectId: "chat-c513e",
  storageBucket: "chat-c513e.firebasestorage.app",
  messagingSenderId: "582031038798",
  appId: "1:582031038798:web:097347306588a31e44261f",
  measurementId: "G-YZ60MMJQ0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================================
// Chat System
// ================================

const chatRef = collection(db, "messages");
const msgInput = document.getElementById("msgInput");
const chatBox = document.getElementById("chatBox");

async function sendMessage() {
  const msg = msgInput.value.trim();
  if (!msg) return;

  await addDoc(chatRef, {
    text: msg,
    time: Date.now()
  });

  msgInput.value = "";
}

window.sendMessage = sendMessage;

onSnapshot(query(chatRef, orderBy("time")), (snapshot) => {
  chatBox.innerHTML = "";

  snapshot.forEach((doc) => {
    const p = document.createElement("p");
    p.innerText = doc.data().text;
    chatBox.appendChild(p);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
});
