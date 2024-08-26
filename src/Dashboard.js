import React from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const { username, profileImageUrl } = location.state || {};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>대시보드</h1>
      <div>
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="프로필"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
        )}
        <h2>환영합니다, {username}님!</h2>
      </div>
    </div>
  );
}

export default Dashboard;
