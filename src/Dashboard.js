import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

const { kakao } = window;

function Dashboard() {
  const location = useLocation();
  const { username, profileImageUrl, loginMethod } = location.state || {};
  const mapRef = useRef(null);

  useEffect(() => {
    if (loginMethod === "kakao" && mapRef.current) {
      const loadMap = () => {
        const options = {
          center: new kakao.maps.LatLng(33.45071, 126.570667),
          level: 3,
        };
        new kakao.maps.Map(mapRef.current, options);
      };

      // 지도 초기화를 약간 지연시킵니다.
      setTimeout(loadMap, 100);
    }
  }, [loginMethod]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>대시보드</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="프로필"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
        )}
        <h2>환영합니다, {username}님!</h2>

        {loginMethod === "kakao" && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <div>
              <h3>카카오맵</h3>
              <div
                ref={mapRef}
                style={{ width: "500px", height: "500px" }}
              ></div>
            </div>
          </div>
        )}
        {loginMethod === "google" && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <h3>구글맵</h3>

            {/* <Wrapper apiKey="AIzaSyCuqQROPsfe_9yg6VNX-aEVNlCJ-lw4Y6U" /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
