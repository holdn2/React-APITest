import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;

function KakaoLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoApiKey); // 실제 JavaScript 키를 입력하세요.
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("로그인 성공:", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            console.log("사용자 정보:", res);
            // 로그인 후 대시보드로 이동
            navigate("/dashboard", {
              state: {
                username: res.kakao_account.profile.nickname,
                profileImageUrl: res.kakao_account.profile.profile_image_url,
              },
            });
          },
          fail: function (error) {
            console.error("사용자 정보 요청 실패:", error);
          },
        });
      },
      fail: function (err) {
        console.error("로그인 실패:", err);
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        카카오 로그인
      </button>
    </div>
  );
}

export default KakaoLogin;

//Chat GPT와 대화하기
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://developers.kakao.com/sdk/js/kakao.js";
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       if (window.Kakao && !window.Kakao.isInitialized()) {
//         window.Kakao.init("11634659c4339fbc16c4c6dee6d17d05"); // 실제 JavaScript 키를 입력하세요.
//       }
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleLogin = () => {
//     window.Kakao.Auth.login({
//       success: function (authObj) {
//         console.log("로그인 성공:", authObj);
//         window.Kakao.API.request({
//           url: "/v2/user/me",
//           success: function (res) {
//             console.log("사용자 정보:", res);
//             // 로그인 후 대시보드로 이동
//             navigate("/chat");
//           },
//           fail: function (error) {
//             console.error("사용자 정보 요청 실패:", error);
//           },
//         });
//       },
//       fail: function (err) {
//         console.error("로그인 실패:", err);
//       },
//     });
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>카카오 소셜 로그인</h1>
//       <button
//         onClick={handleLogin}
//         style={{ padding: "10px 20px", fontSize: "16px" }}
//       >
//         카카오 로그인
//       </button>
//     </div>
//   );
// }

// export default Login;
