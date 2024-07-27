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

// Firebase Authentication 및 Realtime Database 가져오기
const auth = firebase.auth();
const database = firebase.database();

// 회원가입 및 이메일 인증
document
  .getElementById("registersubmit")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 폼의 기본 제출 동작 방지

    const 이메일 = document.getElementById("email").value;
    const 패스워드 = document.getElementById("password").value;
    const 확인패스워드 =
      document.getElementById("confirm_password").value;
    const 이름 = document.getElementById("id").value;
    const wrongtext = `<h5 style="color: red;">비밀번호가 일치하지 않습니다</h5>`;

    if (패스워드 === 확인패스워드) {
      auth
        .createUserWithEmailAndPassword(이메일, 패스워드)
        .then((userCredential) => {
          const user = userCredential.user;

          return user.sendEmailVerification().then(() => {
            console.log("인증 이메일이 발송되었습니다.");
            alert(
              "회원가입이 완료되었습니다. 꼭 이메일을 확인하여 인증해 주세요."
            );
            checkEmailVerification(user, 이름);
          });
        })
        .catch((error) => {
          console.error("오류:", error.message);
        });
    } else {
      document.getElementById("wrongtxtwrap").innerHTML = wrongtext;
    }
  });

// 이메일 인증 확인 및 사용자 데이터 저장
function checkEmailVerification(user, 이름) {
  user.reload().then(() => {
    const userRef = database.ref("users/" + user.uid); // 사용자 데이터 저장 경로
    userRef
      .set({
        email: user.email,
        name: 이름,
      })
      .then(() => {
        console.log(
          "사용자 데이터가 Realtime Database에 저장되었습니다."
        );
        location.href = 'index.html'
      })
      .catch((error) => {
        console.error("데이터 저장 오류:", error.message);
      });
  });
}

// function checkEmailVerification(user) {
//     var checkInterval = setInterval(function() {
//         user.reload().then(() => {
//             if (user.emailVerified) {
//                 clearInterval(checkInterval);
//                 alert("이메일 인증이 완료되었습니다.");
//                 // 인증 완료 후 페이지를 이동할 수 있습니다.
//                 location.href = "index.html";
//             }
//         }).catch((error) => {
//             console.error("오류:", error.message);
//         });
//     }, 3000); // 3초마다 인증 상태를 확인합니다.
// }