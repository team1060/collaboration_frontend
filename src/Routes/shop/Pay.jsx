import "./style/Pay.scss"
import InputField from "./product/InputField";
import { Button, Container, FormControlLabel, Grid, Modal, Radio, RadioGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SearchAddress from "./product/SearchAddress";

const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

function Pay() {
    // 이메일
    const [user, setUser] = useState('');

    // 받아온 상품
    const [product, setProduct] = useState(null);

    // 받아온 상품의 총 가격
    const [totalAmount, setTotalAmount] = useState(0);

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
            // Calculate total amount
            const total = product.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^\d.]/g, '')), 0);
            setTotalAmount(total);
        }
    }, [product]);

    // 휴대폰
    const [phoneNumber, setPhoneNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');


    const handlePhoneNumberChange = (e) => {
        const rawPhoneNumber = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
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

        setPhoneNumber(formattedNumber);
        setContactNumber(formattedNumber);
    };

    const shippinghandler = async e => {
        e.preventDefault();

        const shippingData = {
            roadAddrPart1: selectedAddress.roadAddrPart1,
            roadAddrPart2: selectedAddress.roadAddrPart2,
        }
    }

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
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                                onChange={(e) => setContactNumber(e.target.value)}
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
                                        disabled
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
                                        disabled
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