import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const { kakao } = window;

function Dashboard() {
  const location = useLocation();
  const { username, profileImageUrl, loginMethod } = location.state || {};
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [curAddr, setCurAddr] = useState("카카오 기본 주소");

  useEffect(() => {
    if (loginMethod === "kakao" && mapRef.current) {
      const loadMap = () => {
        const options = {
          center: new kakao.maps.LatLng(33.45071, 126.570667),
          level: 3,
        };
        const mapInstance = new kakao.maps.Map(mapRef.current, options);
        setMap(mapInstance);
      };

      setTimeout(loadMap, 100);
    }
  }, [loginMethod]);

  const addressView = (address) => {
    setCurAddr(address);
  };

  // Daum 주소 검색 API를 통한 주소 검색 함수
  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // kakao.maps.services 객체가 로드된 후 Geocoder를 사용합니다.
        const geocoder = new kakao.maps.services.Geocoder();

        console.log(data.address);
        addressView(data.address);

        geocoder.addressSearch(data.address, function (result, status) {
          if (status === kakao.maps.services.Status.OK && map) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            map.setCenter(coords);

            new kakao.maps.Marker({
              map: map,
              position: coords,
            });
          }
        });
      },
    }).open();
  };

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
              position: "relative", // 부모 요소를 기준으로 절대 위치를 설정하기 위해 relative 사용
            }}
          >
            <div>
              <h3>카카오맵</h3>
              <div
                style={{
                  display: "block",
                  backgroundColor: "lightblue",
                }}
              >
                {curAddr}
              </div>
              <div
                ref={mapRef}
                style={{
                  width: "500px",
                  height: "500px",
                  position: "relative",
                }}
              >
                <button
                  onClick={searchAddress}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: "1000",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  주소 검색
                </button>
              </div>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
