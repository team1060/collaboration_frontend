
import { Button, Container, Grid, Rating, Typography } from "@mui/material";
import "../style/InfoInner.scss"
import LocationOn from "@mui/icons-material/LocationOn";
import Call from '@mui/icons-material/Call';
import Print from '@mui/icons-material/Print';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGolfInfo } from "../../../services/golf/apiGolf";
import InfoRemote from "./InfoRemote";

// 골프장 상세페이지
function Infoinner() {

    let { golf_no } = useParams();

    const [golfInfo, setGolfInfo] = useState(null);

    useEffect(() => {
        const fetchGolfInfo = async () => {
            try {
                const post = await getGolfInfo(golf_no)
                console.log(post)
                setGolfInfo(post)
            } catch (error) {
                console.error("에러", error)
            }
        }
        fetchGolfInfo();
    }, [golf_no])

    return (
        <div id="infoInner">
            <Container>
                <Grid className="title" >
                    <h2>{golfInfo?.name}<span>{golfInfo?.region}</span></h2>
                </Grid>
                <Grid container className="golfSec1">
                    <Grid item md={6} className="golfImage">
                        <img src={`/img/golf/${golf_no}.jpg`} alt="" />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        item md={6} className="golfCont">
                        <div className="tit">{golfInfo?.name}</div>
                        <p className="">
                            {golfInfo?.description}
                        </p>
                    </Grid>
                </Grid>
                <Grid>
                    <div className="reserve">
                        <a href="/reservation/detail">
                            <Button className="reserveButton" variant="contained">예약하기</Button>
                        </a>
                    </div>
                </Grid>
                <Grid container className="golfSec2">
                    <Grid item md={5} xs={12} className="Sec2Inner">
                        <Grid className=" courseIntroducing">
                            <h3>코스 소개</h3>
                        </Grid>
                        <Grid container className="golfSec2Inner">

                            <Grid item xs={4} container direction="column" className="tholes">
                                <div className="tit">홀</div>
                                <div>{golfInfo?.holes}</div>
                            </Grid>
                            <Grid item xs={4} container direction="column" className="tpars">
                                <div className="tit">파</div>
                                <div>{golfInfo?.pars}</div>
                            </Grid>
                            <Grid item xs={4} container direction="column" className="tpars">
                                <div className="tit">전장</div>
                                <div>{golfInfo?.land_area?.toLocaleString()}<span>m</span></div>
                            </Grid>

                        </Grid>
                        <Grid className="rating">
                            <Grid className="ratingInner" item container justifyContent="space-between"
                                alignItems="center">
                                <Typography component="legend">난이도</Typography>
                                <Rating name="read-only" value={parseInt("4", 10)} readOnly />
                            </Grid>
                            <Grid className="ratingInner" item container justifyContent="space-between"
                                alignItems="center">
                                <Typography component="legend">레이디티 난이도</Typography>
                                <Rating name="read-only" value={parseInt("3", 10)} readOnly />
                            </Grid>
                            <Grid className="ratingInner" item container justifyContent="space-between"
                                alignItems="center">
                                <Typography component="legend">그린 난이도</Typography>
                                <Rating name="read-only" value={parseInt("5", 10)} readOnly />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid
                        container
                        direction="column"
                        item md={5} xs={12} className="">
                        <Grid className="Sec2Inner directions">
                            <h3>오시는 길</h3>
                        </Grid>
                        <Grid className="">
                            <Grid className=" directionsInner" item container>
                                <div className="locationEmo"><LocationOn></LocationOn></div>
                                <div className="location tit">{golfInfo?.address}</div>
                            </Grid>
                            <Grid className=" directionsInner" item container>
                                <div className="callEmo"><Call></Call></div>
                                <div className="call tit">{golfInfo?.contact}</div>
                            </Grid>
                            <Grid className=" directionsInner" item container>
                                <div className="printEmo"><Print></Print></div>
                                <div className="print tit">{golfInfo?.fax}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Infoinner;
