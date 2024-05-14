import Head from "./reservation/Head.jsx";
import ReserveCancelTable from "./reservation/ReserveCancelTable";

// 취소확인
function ReservationCancel() {
  return (
    <div id="reserve">
      <Head />
      <ReserveCancelTable />
    </div>
  );
}

export default ReservationCancel;
