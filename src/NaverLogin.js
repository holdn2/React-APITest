import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const { naver } = window;
  const navigate = useNavigate();

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = "http://localhost:3000/login";

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: true, // 팝업창으로 로그인
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });

    naverLogin.init();

    // 네이버 로그인 상태 확인
    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        // 로그인 성공 시 사용자 정보 가져오기
        const user = naverLogin.user;
        const username = user.getName();
        const profileImageUrl = user.getProfileImage();

        // 대시보드로 사용자 정보 전달
        // navigate("/dashboard", {
        //   state: { username, profileImageUrl },
        // });
      } else {
        console.log("로그인 실패");
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;

// function Login() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://static.nid.naver.com/js/naverLogin.js";
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       if (window.naver && window.naver.LoginWithNaverId) {
//         window.naver.LoginWithNaverId = new window.naver.LoginWithNaverId({
//           clientId: naverClientId,
//           callbackUrl: "http://localhost:3000/oauth",
//           isPopup: false,
//           loginButton: { color: "green", type: 1, height: 40 },
//         });

//         window.naver.LoginWithNaverId.init();
//       } else {
//         console.error("네이버 SDK가 로드되지 않았습니다.");
//       }
//     };

//     script.onerror = () => {
//       console.error("네이버 SDK 스크립트 로드 오류");
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleLogin = () => {
//     if (window.naver && window.naver.LoginWithNaverId) {
//       window.naver.LoginWithNaverId.login();
//       navigate("/dashboard");
//     } else {
//       console.error("네이버 SDK가 로드되지 않았습니다.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>네이버 소셜 로그인</h1>
//       <button
//         onClick={handleLogin}
//         style={{ padding: "10px 20px", fontSize: "16px" }}
//       >
//         네이버 로그인
//       </button>
//     </div>
//   );
// }

// export default Login;
