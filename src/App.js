import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSelection from "./LoginSelection";
import KakaoLogin from "./KakaoLogin";
import GoogleLoginComponent from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelection />} />
        <Route path="/kakao-login" element={<KakaoLogin />} />
        <Route path="/Naver-login" element={<NaverLogin />} />
        <Route path="/google-login" element={<GoogleLoginComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./Login";
// import Dashboard from "./Dashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 로그인 페이지 */}
//         <Route path="/" element={<Login />} />
//         {/* 대시보드 페이지 */}
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
