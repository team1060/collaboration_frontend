import { Link } from "react-router-dom";
import "./style/FooterStyle.scss"
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
            <h3>골프 마켓 협력업체</h3>
            <ul>
              <li>조은 컴퓨터</li>
              <li>촐싹이는 배그를 하고싶어</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li>세상 제일 꼰대 길부장</li>
              <li>FPS 고수 촐싹</li>
              <li>지갑전사 JYP</li>
            </ul>
          </div>
          <div className="footer-section"> 
          <div className="sns">
              <div>
                <Link to={"https://redapgod.netlify.app/"} className="facebook" target="_blank">
                {/* <img src="./img/i_fbook.png" alt="" />facebook */}
                </Link>
              {/* </div>
              <div> */}
                <Link to={"https://redapgod.netlify.app/"} className="instagram" target="_blank">
                {/* <img src="./img/i_instagram.png" alt="" />instagram */}
                </Link>
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