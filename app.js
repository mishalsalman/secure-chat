import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// FIREBASE CONFIG (I will generate for you later)
const firebaseConfig = {
  apiKey: "PLACE-YOUR-KEY",
  authDomain: "PLACE-YOUR-DOMAIN",
  projectId: "PLACE-YOUR-PROJECT-ID",
  storageBucket: "PLACE-YOUR-BUCKET",
  messagingSenderId: "PLACE-YOUR-ID",
  appId: "PLACE-YOUR-APP-ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

onSnapshot(query(chatRef, orderBy("time")), (snapshot) => {
  chatBox.innerHTML = "";
  snapshot.forEach((doc) => {
    const p = document.createElement("p");
    p.innerText = doc.data().text;
    chatBox.appendChild(p);
  });
});
