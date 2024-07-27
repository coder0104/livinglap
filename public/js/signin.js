var firebaseConfig = {
  apiKey: "AIzaSyCg0Cl6lIajKPUXgnZKCcF6eok8vzXkJ_E",
  authDomain: "livinlap.firebaseapp.com",
  databaseURL: "https://livinlap-default-rtdb.firebaseio.com",
  projectId: "livinlap",
  storageBucket: "livinlap.appspot.com",
  messagingSenderId: "572384266053",
  appId: "1:572384266053:web:d205255bcb05fcf578602c",
  measurementId: "G-K1F81N4YET",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      location.href = "index.html";
    })
    .catch((error) => {
      alert("로그인 실패");
    });
}
