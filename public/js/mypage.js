
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
          $("#name").html(userData.name);
          $("#price").html(userData.point);
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

  
});

const auth = firebase.auth();
const database = firebase.database();

$(document).ready(function() {
  $('#getmile').click(function() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        const uid = user.uid;
        const userRef = database.ref('users/' + uid + '/point');

        userRef.transaction(function(currentScore) {
          if (currentScore === null) {
            return 1000; // 기본값 설정
          } else {
            return currentScore + 1000; // 현재 점수에 1000 추가
          }
        }).then(function() {
          console.log('Score updated successfully.');
          location.href="mypage.html"
        }).catch(function(error) {
          console.error('Error updating score: ', error);
        });
      } else {
        console.log('No user is signed in.');
      }
    });
  });
});

$("#loogout").click(function () {
  firebase
    .auth()
    .signOut()
    .then(function () {
      location.href = "index.html"
      //alert("로그아웃 되었습니다")
      //메인 페이지로 이동시키고 세션 저장시키기/
    })
    .catch(function (error) {
      if (error) {
        alert("로그인 실패");
      }
    });
});