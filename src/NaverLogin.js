import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.nid.naver.com/js/naverLogin.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.naver && window.naver.LoginWithNaverId) {
        window.naver.LoginWithNaverId = new window.naver.LoginWithNaverId({
          clientId: naverClientId,
          callbackUrl: "http://localhost:3000/callback",
          isPopup: false,
          loginButton: { color: "green", type: 1, height: 40 },
        });

        window.naver.LoginWithNaverId.init();
      } else {
        console.error("네이버 SDK가 로드되지 않았습니다.");
      }
    };

    script.onerror = () => {
      console.error("네이버 SDK 스크립트 로드 오류");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = () => {
    if (window.naver && window.naver.LoginWithNaverId) {
      window.naver.LoginWithNaverId.login();
    } else {
      console.error("네이버 SDK가 로드되지 않았습니다.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>네이버 소셜 로그인</h1>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        네이버 로그인
      </button>
    </div>
  );
}

export default Login;
