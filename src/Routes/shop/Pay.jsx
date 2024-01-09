import "./style/Pay.scss"
import InputField from "./product/InputField";
import { Button, Container, FormControlLabel, Grid, Modal, Radio, RadioGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SearchAddress from "./product/SearchAddress";
import axios from "axios";

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

function Pay() {
    // 이메일
    const [user, setUser] = useState('');

    // 받아온 상품
    const [product, setProduct] = useState(null);

    // 받아온 상품의 총 가격
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    // 로그인한 유저 
    useEffect(() => {
        if (ACCESS_TOKEN) {
            const token = jwtDecode(ACCESS_TOKEN);
            const userEmail = token.email;
            setUser(userEmail);
        }
        const productInfo = localStorage.getItem("productInfo");
        if (productInfo) {
            setProduct(JSON.parse(productInfo));
        }
    }, [user]);
    useEffect(() => {
        if (product) {
            console.log(product);

            // Calculate total amount
            const totalAmount = product.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^\d.]/g, '')), 0);
            setTotalAmount(totalAmount);

            // Calculate total quantity
            const totalQuantity = product.reduce((acc, item) => acc + parseInt(item.count, 10), 0);
            setTotalQuantity(totalQuantity);
            console.log(totalQuantity);
        }
    }, [product]);
    // 휴대폰 & 연락처
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');


    const formatPhoneNumber = (rawPhoneNumber) => {
        let formattedNumber = '';

        if (rawPhoneNumber.length === 10) {
            formattedNumber += rawPhoneNumber.substring(0, 3) + '-';
            formattedNumber += rawPhoneNumber.substring(3, 6) + '-';
            formattedNumber += rawPhoneNumber.substring(6, 10);
        } else if (rawPhoneNumber.length === 11) {
            formattedNumber += rawPhoneNumber.substring(0, 3) + '-';
            formattedNumber += rawPhoneNumber.substring(3, 7) + '-';
            formattedNumber += rawPhoneNumber.substring(7, 11);
        } else {
            formattedNumber = rawPhoneNumber;
        }

        return formattedNumber;
    };

    const handlePhoneNumberChange = (e) => {
        const rawPhoneNumber = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
        const formattedNumber = formatPhoneNumber(rawPhoneNumber);
        setPhoneNumber(formattedNumber);
    };

    const handleContactNumberChange = (e) => {
        const rawPhoneNumber = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
        const formattedNumber = formatPhoneNumber(rawPhoneNumber);
        setContactNumber(formattedNumber);
    };

    // 배송 핸들러
    const shippinghandler = async e => {
        e.preventDefault();

        // 주소 정보가 완전하지 않은 경우 처리
        if (!selectedAddress.zipNo || !selectedAddress.roadAddr) {
            // 주소 정보가 완전하지 않을 때 처리
            console.error('주소 정보가 완전하지 않습니다.');
            return;
        }

        // tbl_p_option 테이블에 대한 데이터 준비
        const optionData = product.map(item => ({
            option_no: item.option_no,
            product_no: item.product_no,
            name: item.option, // 각 상품의 옵션 정보를 가져오거나, 옵션 정보를 어떻게 표현할지에 따라 조정이 필요할 수 있습니다.
            count: item.count,
        }));

        // tbl_p_buy 테이블에 대한 데이터 준비
        const pBuyData = {
            status: '1', // 확인중(0), 배송중(1), 완료(2), 취소(3) 등
            product_no: optionData.map(option => option.product_no).join(','),  // 각 상품의 product_no를 가정합니다.
            payment_method: 'credit_card', // 결제 방법에 따라 조정이 필요할 수 있습니다.
            payment_date: new Date().toISOString(),
            option_no: optionData.map(option => option.option_no).join(','), // 각 상품의 option_no를 가정합니다.
            installment: null, // 현재는 placeholder이며 로직에 따라 조정이 필요할 수 있습니다.
            email: user,
            delivery_message: '', // 유저 입력에서 이 값을 가져와야 할 수도 있습니다.
            cencel_reason: null, // 현재는 placeholder이며 로직에 따라 조정이 필요할 수 있습니다.
            card: null, // 현재는 placeholder이며 로직에 따라 조정이 필요할 수 있습니다.
            cancel_date: null, // 현재는 placeholder이며 로직에 따라 조정이 필요할 수 있습니다.
            amount: totalAmount,
        };

        // tbl_shipping 테이블에 대한 데이터 준비
        const shippingData = {
            shipping_no: null, // 현재는 생성 중이며 나중에 배송 처리 과정에서 생성됩니다.
            email: user,
            recipient: document.getElementById('recipient').value, // 'recipient' id를 가진 입력 필드에서 값을 가져옵니다.
            destination: selectedAddress.roadAddr,
            contact_number: contactNumber, // contactNumber를 제대로 설정했다고 가정합니다.
            is_default_shipping: null, // 현재는 placeholder이며 로직에 따라 조정이 필요할 수 있습니다.
            roadAddrPart1: selectedAddress.roadAddrPart1,
            roadAddrPart2: selectedAddress.roadAddrPart2,
            zipNo: selectedAddress.zipNo,
            addrDetail: selectedAddress.addrDetail,
        };
    }

    // 결제 핸들러
    const KAKAO_PAY_READY_URL = "https://kapi.kakao.com/v1/payment/ready";
    const KAKAO_PAY_APPROVE_URL = "https://kapi.kakao.com/v1/payment/approve";
    const SERVICE_APP_ADMIN_KEY = "ff6bb12c12dceb7251e95224fc91846c"
    const [paymentResponse, setPaymentResponse] = useState(null);

    const handlePayment = async () => {
        // Prepare data for KakaoPay ready API
        const data = {
            cid: 'TC0ONETIME', // Your merchant ID
            partner_order_id: 132709, // Set your own order ID
            partner_user_id: user, // Set your own user ID
            item_name: product[0]?.product, // Set your item name
            quantity: totalQuantity, // Set the quantity
            total_amount: parseInt(totalAmount / 100, 10), // Set the total amount
            tax_free_amount: parseInt(totalAmount / 100, 10), // Set the VAT amount (if applicable)
            approval_url: `http://localhost:3000/payment/success`, // Set your success URL
            fail_url: 'http://localhost:3000/payment/fail', // Set your fail URL
            cancel_url: 'http://localhost:3000/payment/cancel', // Set your cancel URL
        };
        console.log(data);
        try {
            // KakaoPay ready API 호출
            const response = await axios.post(KAKAO_PAY_READY_URL, data, {
                headers: {
                    'Authorization': `KakaoAK ${SERVICE_APP_ADMIN_KEY}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            });

            localStorage.setItem('kakaoPayResponse', JSON.stringify(response.data));

            // 응답에서 정보 추출
            const {next_redirect_app_url, next_redirect_mobile_url, next_redirect_pc_url } = response.data;

            // 사용자를 해당 장치에 따라 적절한 결제 URL로 리디렉션
            const paymentUrl = determinePaymentUrl(next_redirect_app_url, next_redirect_mobile_url, next_redirect_pc_url);
           
            // 페이지 리디렉션하기 전에 로컬 스토리지에 저장된 데이터 확인
            const storedData = localStorage.getItem('kakaoPayResponse');
            console.log('Stored KakaoPay Response:', storedData);
            window.location.href = paymentUrl;
        } catch (error) {
            console.error('KakaoPay ready API 호출 중 오류:', error);
        }

    }
    const determinePaymentUrl = (appUrl, mobileUrl, pcUrl) => {
        // 사용자의 장치에 따라 적절한 결제 URL을 결정하는 논리 구현
        // 여기에서는 PC URL을 반환합니다.
        return pcUrl;
    };

    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');

    // 주소 검색 모달 상태
    const [addressModalOpen, setAddressModalOpen] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState({
        zipNo: '',
        roadAddr: '',
        roadAddrPart1: '',
        roadAddrPart2: '',
        addrDetail: ''
    });

    // 주소 검색 버튼 클릭 시 주소 검색 모달 열기
    const handleAddressSearchButtonClick = () => {
        openAddressModal();
    };

    // SearchAddress 컴포넌트에서 선택한 주소를 처리하는 콜백 함수
    const handleSelectAddress = (address) => {
        // 주소에서 ()로 나누기
        const addrParts = address.roadAddr.split(/[\(\)]/);

        // 주소 정보로 state 업데이트
        setSelectedAddress({
            zipNo: address.zipNo,
            roadAddr: address.roadAddr, // 전체 주소
            roadAddrPart1: addrParts[0].trim(), // 첫 번째 부분은 roadAddrPart1
            roadAddrPart2: addrParts[1] ? addrParts[1].trim() : '', // 두 번째 부분은 roadAddrPart2 (없으면 빈 문자열)
            addrDetail: '', // 두 번째 부분은 addrDetail (없으면 빈 문자열)
        });
        closeAddressModal();
    };

    // 주소 검색 모달 열기
    const openAddressModal = () => {
        setAddressModalOpen(true);
    };

    // 주소 검색 모달 닫기
    const closeAddressModal = () => {
        setAddressModalOpen(false);
    };

    return (
        <form onSubmit={shippinghandler}>
            <div id="productPay">
                <h2 className="payTitle">주문결제</h2>
                <div className="paySection">
                    <div className="title ">
                        <h3 className="">01. 주문상품</h3>
                    </div>
                    <div className="sellerContent bgGray ">
                        <Container>
                            <div className="sellerSection">
                                <span>골프의민족 스토어</span>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>상품정보</th>
                                        <th>옵션</th>
                                        <th>가격</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="sellerSectionInner">
                                                <div className="sellerSectionItem">
                                                    <img src={item.image} alt={`Product ${index}`} />
                                                </div>
                                                <div className="sellerSectionItem">
                                                    <div>{item.product}</div>
                                                </div>
                                            </td>
                                            <td>{item.option}<span className="count">{item.count}개</span></td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Container>
                    </div>
                    <div className="sellerSectionInner amountArea">
                        <div>주문금액</div>
                        <div>{totalAmount.toLocaleString()}원</div>
                    </div>
                </div>
                <div className="paySection">
                    <Container>


                        <div className="title">
                            <h3 className="">02. 고객정보</h3>
                        </div>
                        <div className="customerContent">
                            <InputField
                                label="이름"
                                placeholder="이름을 입력해주세요."
                                name="name"
                                id="name"
                            />
                            <InputField
                                label="이메일"
                                placeholder="이메일을 입력해주세요."
                                name="email"
                                id="email"
                                value={user}
                            />
                            <InputField
                                label="휴대폰"
                                placeholder="휴대폰 번호를 입력해주세요."
                                name="phoneNumber"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                    </Container>
                </div>
                <div className="paySection">

                    <Container>
                        <div className="title shippingTitle">
                            <h3 className=""> 03. 배송정보</h3> <Button size="large" variant="contained">배송지 추가</Button>
                        </div>
                        <div className="shippingContent">
                            <Grid className="inputhead" container>
                                <Grid className="inputheadInner" item xs={4} lg={3}>
                                    배송지 선택
                                </Grid>
                                <Grid className="inputtexthead" container direction="row" flexWrap="nowrap" item xs={8} lg={9}>
                                    <RadioGroup
                                        aria-label="배송지 선택"
                                        name="deliveryOption"
                                        value={selectedDeliveryOption}
                                        onChange={(e) => setSelectedDeliveryOption(e.target.value)}
                                        row
                                    >
                                        <FormControlLabel
                                            value="home"
                                            control={<Radio />}
                                            label="집"
                                        />
                                        <FormControlLabel
                                            value="company"
                                            control={<Radio />}
                                            label="회사"
                                        />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                            <InputField
                                label="받는사람"
                                placeholder="이름을 입력해주세요."
                                name="recipient"
                                id="recipient"
                            />
                            <InputField
                                label="연락처"
                                placeholder="전화번호를 입력해주세요."
                                name="contact"
                                id="contact"
                                value={contactNumber}
                                onChange={handleContactNumberChange}
                            />
                            <Grid className="inputhead" container>
                                <Grid className="inputheadInner" item xs={4} lg={3}>
                                    주소
                                </Grid>
                                <Grid className="inputtexthead" container item xs={8} lg={9}>
                                    <TextField className="inputAddr" style={{ width: "50%" }}
                                        fullWidth
                                        required
                                        placeholder=''
                                        name='zipNo'
                                        id='zipNo'
                                        // disabled
                                        value={selectedAddress.zipNo}
                                    />
                                    <Button size="large" variant="contained" onClick={handleAddressSearchButtonClick}>주소 검색</Button>
                                    <TextField
                                        className="inputAddr"
                                        fullWidth
                                        required
                                        placeholder=""
                                        name="roadAddr"
                                        id="roadAddr" // 변경
                                        // disabled
                                        value={selectedAddress.roadAddr}
                                    />
                                    <TextField className="inputAddr"
                                        fullWidth
                                        required
                                        placeholder='상세주소를 입력해주세요.'
                                        name='addrDetail'
                                        id='addrDetail'
                                        onChange={(e) => setSelectedAddress((prev) => ({ ...prev, addrDetail: e.target.value }))}
                                    />
                                </Grid>
                            </Grid>
                            <InputField
                                label="배송메세지"
                                placeholder="메세지를 입력해주세요."
                                name="contact"
                                id="contact"
                            />
                        </div>
                    </Container>

                </div>
                <div className="paymentButtonWrap">
                    <Button size="large" className="paymentButton" variant="contained" onClick={handlePayment}>결제하기</Button>
                </div>
            </div>

            {/* 주소 검색 모달 */}
            <Modal open={addressModalOpen} onClose={closeAddressModal}>
                <div>
                    {/* 주소 검색 화면의 내용을 구현 */}
                    <SearchAddress closeAddressModal={closeAddressModal} onSelectAddress={handleSelectAddress} />
                </div>
            </Modal>
        </form>
    )
}

export default Pay;