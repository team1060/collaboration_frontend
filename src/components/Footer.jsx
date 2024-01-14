import { Link } from "react-router-dom";
import "./style/FooterStyle.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare, faYoutubeSquare, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';



function Footer() {
  return(
   
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>회사 소개</h3>
            <ul>
              <li>회사 소개</li>
              <li>채용 안내</li>
              <li>윤리 경영</li>
            </ul>
          </div>
        
        
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li>고객 지원</li>
              <li>찾아오는 길</li>
              <li>법률 상담</li>
            </ul>
          </div>
          <div className="footer-section"> 
          <div className="sns">
                    <h3>S N S</h3>
                    <div className="social">
                <FontAwesomeIcon icon={faFacebookSquare} />
                
                <FontAwesomeIcon icon={faInstagramSquare} />
                <FontAwesomeIcon icon={faTwitterSquare} />
                <FontAwesomeIcon icon={faYoutubeSquare} />
                <FontAwesomeIcon icon={faWhatsappSquare} />
              </div>
           </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 GOLFZONE Collabo. All rights reserved.</p>
        </div>
      </footer>
   
            
   
  )
}

export default Footer;
