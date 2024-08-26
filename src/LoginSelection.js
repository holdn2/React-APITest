import React from "react";
import { useNavigate } from "react-router-dom";

function LoginSelection() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    navigate("/kakao-login");
  };

  const handleGoogleLogin = () => {
    navigate("/google-login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>로그인 선택</h1>
      <button
        onClick={handleKakaoLogin}
        style={{ padding: "10px 20px", fontSize: "16px", marginRight: "20px" }}
      >
        카카오 로그인
      </button>
      <button
        onClick={handleGoogleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        구글 로그인
      </button>
    </div>
  );
}

export default LoginSelection;
