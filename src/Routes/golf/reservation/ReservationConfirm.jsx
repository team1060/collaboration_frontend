import Head from "./Head";
import ReserveTable from "./ReserveTable";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

// 예약확인 
function ReservationConfirm () {
    const [user, setUser] = useState('');

    useEffect(() => {
        if (ACCESS_TOKEN) {
          const token = jwtDecode(ACCESS_TOKEN);
          const userEmail = token.email;
          setUser(userEmail);
          console.log(userEmail)
        }
      }, [user]);

    return(   
        <>
        <Head/>
        {/* 예약 확인 테이블 */}
        <ReserveTable user={user}/>
        </>
    )
}

export default ReservationConfirm;