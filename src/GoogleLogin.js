import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const googleApiKey = process.env.REACT_APP_OPENAI_API_KEY_GOOGLE;

function GoogleLoginComponent() {
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("구글 로그인 성공:", decoded);

    // 프로필 정보와 사용자 이름을 대시보드로 전달
    navigate("/dashboard", {
      state: {
        username: decoded.name,
        profileImageUrl: decoded.picture,
      },
    });
  };

  const handleError = () => {
    console.error("구글 로그인 실패");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <GoogleOAuthProvider clientId={googleApiKey}>
        {" "}
        {/* 실제 Google Client ID를 입력하세요 */}
        <h1>구글 소셜 로그인</h1>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleLoginComponent;
