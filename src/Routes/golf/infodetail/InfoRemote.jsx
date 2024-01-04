// InfoRemote.jsx

import React, { useState } from "react";
import { Box } from "@mui/material";
import "../style/InfoRemote.scss";
import { Link, ScrollLink } from "react-scroll";

const InfoRemote = ({ regions }) => {
  return (
    <Box id="infoRemote" className="infoRemote" style={{ position: "fixed", top: 190, left: 50, zIndex: 1000 }}>
      골프장 소개
      <ul className="infoLinkWrap">
        {regions?.map((region, idx) => (
          <li key={region}>
            
            <Link className="infoLink" to={region} smooth={true} offset={-150} duration={500}>
              - {region}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default InfoRemote;
