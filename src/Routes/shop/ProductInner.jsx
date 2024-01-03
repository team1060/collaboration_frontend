import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Rating, Select, Typography } from "@mui/material";
import ProductHead from "./product/ProductHead";
import "./style/ProductInner.scss"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductInner } from "../../services/shop/apiProduct";
import ProductImgSwiper from "./product/ProductImgSwiper";
import { Add, Clear, Remove } from "@mui/icons-material";
import styled from "@emotion/styled";

function ProductInner() {

    let { product_no } = useParams();

    const [prop, setProp] = useState(null);
    const [selectedOption, setSelectedOption] = useState([]);

    // 배달버튼 
    const StyledDelivery = styled(Box)`
        width: 70px;
        height: 20px;
        border-radius: 10px;
        color: white;
        background-color: #2bc0ba;
        font-size: 13px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        margin-right: 5px;
    `;
    // 픽업버튼
    const StyledPickup = styled(Box)`
        width: 70px;
        height: 20px;
        border-radius: 10px;
        color: white;
        background-color: #268ad5;
        font-size: 13px;
        font-weight: bold;
        display: flex;
        justify-content: center;
    `;


    const handleChange = (event) => {
        const { value } = event.target;
        const selectedOption = prop?.product_options.find(option => option.option_no === value);

        // 수량이 0 이하로 내려가지 않도록 조절
        const quantity = Math.max(selectedOption?.quantity || 0 + 1, 0);

        // 옵션에 대한 수량 업데이트
        setSelectedOption((prevOptions) => ({
            ...prevOptions,
            [selectedOption.option_no]: { quantity },
        }));
    };
    useEffect(() => {
        const fetchGolfInfo = async () => {
            try {
                const post = await getProductInner(product_no)
                // console.log(post)
                post[0].image_details = JSON.parse(post[0].image_details);
                post[0].image_prdts = JSON.parse(post[0].image_prdts);
                post[0].product_options = JSON.parse(post[0].product_options)
                const filteredResult = post.map(item => ({
                    ...item,
                    image_details: Array.isArray(item.image_details) ? item.image_details.filter(img => img !== null) : [],
                    image_prdts: Array.isArray(item.image_prdts) ? item.image_prdts.filter(img => img !== null) : []
                }));

                console.log(filteredResult)
                setProp(filteredResult[0])
            } catch (error) {
                console.error("에러", error)
            }
        }
        fetchGolfInfo();
    }, [product_no])

    const calculateDiscountedPrice = () => {
        // Calculate the discounted price based on selected options and quantities
        const totalPrice = prop?.price || 0;
        const totalDiscount = prop?.discount || 0;

        const discountedPrice = totalPrice * (1 - totalDiscount);
        const roundedPrice = Math.floor(discountedPrice);

        return roundedPrice;
    };
    const originalPrice = prop?.price;
    const discount = prop?.discount * 100;
    const discountedPrice = calculateDiscountedPrice();
    const calculateTotalPrice = () => {
        let totalPrice = 0;

        for (const option of prop?.product_options || []) {
            // 각 옵션에 대한 수량 * 가격 누적
            totalPrice += (selectedOption[option.option_no]?.quantity || 0) * discountedPrice;
        }

        return totalPrice?.toLocaleString();
    };

    const handleQuantityChange = (optionNo, change) => {
        // 수량이 0 미만이 되지 않도록 조절
        const newQuantity = Math.max((selectedOption[optionNo]?.quantity || 0) + change, 0);

        // 옵션에 대한 수량 업데이트
        setSelectedOption((prevOptions) => ({
            ...prevOptions,
            [optionNo]: { quantity: newQuantity },
        }));
    };

    const handleRemoveOption = (optionNo) => {
        // 선택된 옵션에서 해당 옵션 삭제
        const { [optionNo]: removedOption, ...restOptions } = selectedOption;
        setSelectedOption(restOptions);
    };
    return (

        <div id="ProductInner">
            <Grid>
                <Container className="mainContainer">
                <div className='pickup'>
                    {prop?.is_shop_delivery ? <StyledDelivery>배달가능</StyledDelivery> : ''}
                    {prop?.is_shop_pickup ? <StyledPickup>픽업가능</StyledPickup> : ''}
                </div>
                    <div className="titleWrap" >
                        <h2>{prop?.product}</h2>
                    </div>
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid item md={6} style={{ textAlign: "center" }}>
                            <Grid className="productImgSwiperWrap">
                                <ProductImgSwiper prop={prop}></ProductImgSwiper>
                            </Grid>
                            <Grid className="rating">
                                <Grid className="ratingInner" item container justifyContent="flex-start"
                                    alignItems="center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <Typography component="legend">{2.5}(46)</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" item md={6} >
                            <hr></hr>
                            <Grid className="productInfo" container>
                                <Grid className="productInfoInner" container>
                                    <Grid className="" item xs={6}>
                                        판매가
                                    </Grid>
                                    <Grid item xs={6} className="" style={{ textDecoration: originalPrice !== discountedPrice ? 'line-through' : 'none' }}>
                                        {originalPrice?.toLocaleString()}원
                                    </Grid>
                                </Grid>
                                {originalPrice !== discountedPrice && (
                                    <Grid className="productInfoInner discountedPriceWrap" container>
                                        <Grid className="discountedPrice" item xs={6}>
                                            할인가
                                        </Grid>
                                        <Grid item xs={6} className="discountedPrice">
                                            {discountedPrice?.toLocaleString()}원 ({discount}%)
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid className="productInfoInner" container>
                                    <Grid className="" item xs={6}>카드혜택</Grid>
                                    <Grid item xs={6} className="">국민 최대 10% 할인</Grid>
                                </Grid>
                                <Grid className="productInfoInner" container>
                                    <Grid className="" item xs={6}>무이자할부</Grid>
                                    <Grid item xs={6} className="">2~6개월 카드 무이자</Grid>
                                </Grid>
                            </Grid>
                            <hr></hr>
                            <Grid className="optionWrap" container>
                                <Grid className="optionTit" item xs={3}>
                                    옵션 선택
                                </Grid>
                                <Grid className="option" item xs={9}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-select-label">Options</InputLabel>
                                        <Select
                                            labelId="demo-select-label"
                                            id="demo-select"
                                            value={selectedOption?.option_no || ""}
                                            onChange={handleChange}
                                            label="Options"
                                        >
                                            {prop?.product_options?.map((option) => (
                                                <MenuItem
                                                    key={option.option_no}
                                                    value={option.option_no}
                                                    disabled={option.option_count === 0}
                                                >
                                                    {[option.option_count === 0 ? "[품절]" : ""]}{option.option_name}({option.option_count}개)
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <hr></hr>
                            {prop?.product_options?.map((option) => (
                                selectedOption[option.option_no]?.quantity > 0 && (
                                    <div className="optionInner" key={option.option_no} >
                                        <div>


                                            <Grid container justifyContent="space-between">
                                                <Grid item>
                                                    <Typography className="optionInnerTit" variant="h6">{option.option_name}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        color="primary"

                                                        onClick={() => handleRemoveOption(option.option_no)}
                                                    >
                                                        <Clear></Clear>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            <Grid className="options" container alignItems="center" justifyContent="space-between" spacing={2}>
                                                <Grid item>
                                                    <Typography variant="body2">
                                                        <Button variant="outlined" onClick={() => handleQuantityChange(option.option_no, -1)}><Remove></Remove></Button>
                                                        <Button className="productCount" variant="disabled">{selectedOption[option.option_no]?.quantity}</Button>
                                                        <Button variant="outlined" onClick={() => handleQuantityChange(option.option_no, 1)}><Add></Add></Button>
                                                    </Typography>
                                                </Grid>
                                                <Grid item >
                                                    <Typography variant="body2">
                                                        {((selectedOption[option.option_no]?.quantity || 0) * discountedPrice)?.toLocaleString()}원
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <hr></hr>
                                    </div>
                                )
                            ))}
                            {/* {renderSelectedOptions()} */}
                            <Grid className="totalWrap" container alignItems="center">
                                <Grid className="" item xs={6}>총 상품 금액</Grid>
                                <Grid className="" item xs={6}>{calculateTotalPrice()}원</Grid>
                            </Grid>
                            <Grid className="" container>
                                <Grid className="productInnerButton" item xs={4}><Button size="large" variant="outlined " >관심상품</Button></Grid>
                                <Grid className="productInnerButton" item xs={4}><Button size="large" variant="contained" color="secondary" >장바구니</Button></Grid>
                                <Grid className="productInnerButton" item xs={4}><Button size="large" variant="contained">바로구매</Button></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <ProductHead prop={prop}></ProductHead>
            </Grid>



        </div>

    )

}

export default ProductInner;