import { Container, Grid } from "@mui/material";
import MemberTop from "../MemberTop";
import Menu from "../Menu";
import ReserveTable from "../../golf/reservation/ReserveCancelTable";

function GolfReserveCancel() {
  return (
    <Container>
      <div className="parent">
        <div className="internet">
          <h2>예약관리</h2>
          <br />
        </div>
        {/* 박스 */}
      </div>
      <MemberTop />

      <Grid container className="menu">
        <Grid
          item
          lg={2}
          md={2}
          xs={3}
          className="menuinner"
          style={{ marginTop: "30px" }}
        >
          <Menu />
        </Grid>

        <Grid item lg={10} md={10} xs={12} className="content">
          <ReserveTable />
        </Grid>
      </Grid>

      <div className="footer"></div>
    </Container>
  );
}

export default GolfReserveCancel;
