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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      const uid = user.uid;
      const db = firebase.database();

      db.ref(`users/${uid}`)
        .once("value")
        .then((snapshot) => {
          const userData = snapshot.val();
          $("#userwrapper").append(`
      <div id="logined" style="display: flex; margin: 0 auto; margin-left: 1rem;">
        <h4 id="useremail" style="color: rgb(66, 66, 66); font-size: 1.4rem;">${userData.name}</h4>
        <h4 style="color: rgb(66, 66, 66); font-size: 1.4rem;">&nbsp;님</h4>
      </div>
    `);
          $("#loginbtn").remove();
        })
        .catch((error) => {
          console.error("사용자 데이터 가져오기 오류:", error);
        });
    } else {
      alert("사용자의 이메일이 인증되지 않았습니다.");
    }
  } else {
    console.log("로그인된 사용자가 없습니다.");
  }

  $("#deleteuser").click(function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .delete()
          .then(() => {
            firebase
              .database()
              .ref("users/" + user.uid)
              .remove()
              .then(() => {
                console.log("User deleted successfully");
                location.href = "/index.html";
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          }); // 사용자 삭제 시도
      } else {
        console.log("No user is logged in.");
      }
    });
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    } else {
      // 로그인된 사용자가 없는 경우
      console.log("No user is logged in.");
    }
  });

  $("#loogout").click(function () {
    firebase
      .auth()
      .signOut()
      .then(function () {
        $("#logined").remove();
        $("#loginbtn").remove();
        $(
          "#userwrapper"
        ).append(`<a id="loginbtn" href="sign-in.html" class="bi-person custom-icon me-3 " style="margin-left: 1rem;"
      >&nbsp;로그인</a
    >`);

        //alert("로그아웃 되었습니다")
        //메인 페이지로 이동시키고 세션 저장시키기/
      })
      .catch(function (error) {
        if (error) {
          alert("로그인 실패");
        }
      });
  });
});