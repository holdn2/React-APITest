import React from "react";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import GoogleLogin from "./GoogleLogin";

function LoginSelection() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>로그인 선택</h1>

      <div
        style={{
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px", // 로그인 버튼 간 간격 조정
        }}
      >
        {/* 바로 로그인 되게 변경 */}
        <KakaoLogin />
        <NaverLogin />
        <GoogleLogin />
      </div>
    </div>
  );
}

export default LoginSelection;

// const navigate = useNavigate();
// const handleKakaoLogin = () => {
//   navigate("/kakao-login");
// };
// const handleNaverLogin = () => {
//   navigate("/Naver-login");
// };

// const handleGoogleLogin = () => {
//   navigate("/google-login");
// };

{
  /* <button
  onClick={handleKakaoLogin}
  style={{ padding: "10px 20px", fontSize: "16px", marginRight: "20px" }}
>
  카카오 로그인
</button> */
}
{
  /* <button
          onClick={handleNaverLogin}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginRight: "20px",
          }}
        >
          네이버 로그인
        </button> */
}
{
  /* <button
          onClick={handleGoogleLogin}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          구글 로그인
        </button> */
}
