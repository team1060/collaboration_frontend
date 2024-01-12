import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getGolfByRegion } from "../../services/golf/apiGolf";
import "./style/Info.scss"
import Print from "@mui/icons-material/Print";
import Call from "@mui/icons-material/Call";
import LocationOn from "@mui/icons-material/LocationOn";
import InfoRemote from "./infodetail/InfoRemote";
import InfoHead from "./infodetail/InfoHead";

function Info() {
  const [golfInfo, setGolfInfo] = useState(null);
  const theme = useTheme();
  const isMdViewport = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const fetchGolfInfo = async () => {
      try {
        const dataGyeonggi = await getGolfByRegion("경기");
        const dataChungcheong = await getGolfByRegion("충청");
        const dataGyeongsang = await getGolfByRegion("경상");

        const mergedData = [...dataGyeonggi, ...dataChungcheong, ...dataGyeongsang];

        setGolfInfo(mergedData);
      } catch (error) {
        console.error("에러", error);
      }
    };

    fetchGolfInfo();
  }, []);

  const groupByRegion = (data) => {
    return data?.reduce((acc, golf) => {
      const region = golf.region;
      if (!acc[region]) {
        acc[region] = [];
      }
      acc[region].push(golf);
      return acc;
    }, {});
  };

  const groupedByRegion = groupByRegion(golfInfo);
  const regions = groupedByRegion ? Object.keys(groupedByRegion) : [];

  return (
    <div id="info">


      <InfoHead regions={regions}></InfoHead>
      <Container >
        <Grid className="golfInfo">
          <h2>골프장 소개</h2>

        </Grid>
        {groupedByRegion &&
          regions.map((region) => (
            <Grid key={region} id={`${region}`}>
              <Grid className="region">
                <h3>{region}</h3>

              </Grid>
              <Grid container

                justifyContent="space-around"
                className="regionInner" >

                {groupedByRegion[region].map((golf, index) => (
                  <Grid container item xs={11} md={5.5} key={golf.golf_no} className="golf"  >
                    <Grid className="golfImage">
                      <a className="golfImageInner" href={`/golf/info/${golf.golf_no}`}>

                        <img src={`/img/golf/${index + 1}.jpg`} alt={`Golf Course ${index + 1}`} />

                      </a>
                    </Grid>
                    <Grid className="golfInner">
                      <h3><a href={`/golf/info/${golf.golf_no}`}>{golf.name}</a></h3>
                      <p>{golf.description}</p>
                      <br></br>
                      <p>홀: {golf.holes}, 파: {golf.pars}, 전장: {golf.land_area?.toLocaleString()}m²</p>
                      <br></br>
                      <p><LocationOn /><span>{golf.address}</span></p>
                      <p><Call /> <span>{golf.contact}</span></p>
                      <p> <Print /> <span>{golf.fax}</span></p>
                    </Grid>
                  </Grid>
                ))}
                {groupedByRegion[region].length % 2 === 1 && (
                  <Grid container item xs={11} md={5.5} className="golf" style={{ visibility: 'hidden', display: isMdViewport ? 'block' : 'none' }}>
                    <Grid className="golfImage">
                      <div className="golfImageInner">
                        <img src="https://via.placeholder.com/500" alt="Placeholder" />
                      </div>
                    </Grid>
                    <Grid className="golfInner">
                    </Grid>
                  </Grid>
                )}

              </Grid>
            </Grid>
          ))}
      </Container>
    </div>
  );
}

export default Info;
