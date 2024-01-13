import React, { useEffect, useState, useRef } from "react";
import Head from "./reservation/Head";
import Calendar from "./reservation/Calendar";
import Course from "./reservation/Course";

function Reservation() {
  const [view, setView] = useState(null);
  const [golf, setGolf] = useState("");
  const [index, setIndex] = useState();
  const [user, setUser] = useState("");

  const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
  const Render = useRef(true);

  // 캘린더에서 날짜 값 받아서 버튼에 주기
  const parentView = (view) => {
    setView(view);
  };

  const parentUser = (user) => {
    setUser(user);
  };

  const parentGolf = (golf, i) => {
    setGolf(golf);
    const plus = i + 1;
    setIndex(plus);
  };

  useEffect(() => {
    // console.log("useEffect");
    // if (!ACCESS_TOKEN && Render.current) {
    //   alert("로그인이 필요합니다.");
    //   window.location.href = '/';
    // }
    // Render.current = false;
  }, [ACCESS_TOKEN]);
  return (
    <div id="reserve">
      <Head />
      <Calendar parentView={parentView} parentGolf={parentGolf} parentUser={parentUser} />
      <Course golf={golf} view={view} index={index} user={user} />
    </div>
  );

}

export default Reservation;
