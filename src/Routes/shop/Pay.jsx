import "./style/Pay.scss"
import InputField from "./product/InputField";
import { Button, Checkbox, Container, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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

    console.log(user);
    console.log(product);
    const shippinghandler = async e => {
        e.preventDefault();

        const shippingData = {

        }
    }
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
                                    배송지선택
                                </Grid>
                                <Grid className="inputtexthead" container direction="row" flexWrap="nowrap" item xs={8} lg={9}>
                                    <Grid item>
                                        <Checkbox
                                            label="집"
                                            variant="outlined"
                                        /><span>집</span>
                                    </Grid>
                                    <Grid item>
                                        <Checkbox
                                            label="회사"
                                            variant="outlined"
                                        /><span>회사</span>
                                    </Grid>
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
                                        name=''
                                        id=''
                                        disabled
                                    />
                                    <Button size="large" variant="contained">주소 검색</Button>
                                    <TextField className="inputAddr"
                                        fullWidth
                                        required
                                        placeholder=''
                                        name=''
                                        id=''
                                        disabled
                                    />
                                    <TextField className="inputAddr"
                                        fullWidth
                                        required
                                        placeholder='상세주소를 입력해주세요.'
                                        name=''
                                        id=''
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
        </form>
    )
}

export default Pay;