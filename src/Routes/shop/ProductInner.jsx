import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Rating, Select, Typography } from "@mui/material";
import ProductHead from "./product/ProductHead";
import "./style/ProductInner.scss"
import { useState } from "react";

function ProductInner() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [quantities, setQuantities] = useState({});

    const handleChange = (event) => {
        const selectedOptionValues = event.target.value;
        setSelectedOptions(selectedOptionValues);

        const initialQuantities = selectedOptionValues.reduce((acc, option) => {
            acc[option] = 1;
            return acc;
        }, {});
        setQuantities(initialQuantities);
    };

    const handleIncreaseQuantity = (option) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [option]: (prevQuantities[option] || 0) + 1,
        }));
    };

    const handleDecreaseQuantity = (option) => {
        if (quantities[option] > 1) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [option]: prevQuantities[option] - 1,
            }));
        }
    };

    const handleRemoveOption = (option) => {
        const updatedOptions = selectedOptions.filter((selectedOption) => selectedOption !== option);
        const { [option]: removedOption, ...updatedQuantities } = quantities;

        setSelectedOptions(updatedOptions);
        setQuantities(updatedQuantities);
    };

    const renderSelectedOptions = () => {
        return selectedOptions.map((option) => (

            <Grid container alignItems="center" key={option} style={{ padding: "10px 30px" }}>
                <Grid item xs={6}>
                    <Typography variant="h6">{option}</Typography>
                </Grid>
                <Grid item xs={6} textAlign="end">
                    <Button
                        size="small"
                        style={{ width: "30px", marginLeft: "10px" }}
                        onClick={() => handleRemoveOption(option)}
                    >
                        x
                    </Button>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: "15px" }}>
                    <Grid container alignItems="center" justifyContent="flex-start">
                        <Grid item>
                            <Button
                                size="small"
                                variant="outlined"
                                style={{ width: "30px" }}
                                onClick={() => handleDecreaseQuantity(option)}
                            >
                                -
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                size="small"
                                variant="disabled"
                                style={{ width: "30px" }}
                                onClick={() => handleDecreaseQuantity(option)}
                            >
                                {quantities[option]}
                            </Button>

                        </Grid>
                        <Grid item>
                            <Button
                                size="small"
                                variant="outlined"
                                style={{ width: "30px" }}
                                onClick={() => handleIncreaseQuantity(option)}
                            >
                                +
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        ));
    };
    return (

        <div id="ProductInner">
            <Grid>
                <div style={{ paddingTop: "30px" }}></div>
                <hr></hr>
            </Grid>
            <Grid>
                <Container style={{ marginBottom: "50px" }}>
                    <div style={{ margin: "20px 0" }}>
                        <h2>[핑] G425 max 드라이버</h2>
                    </div>
                    <Grid container style={{ justifyContent: "center" }}>
                        <Grid item md={6} style={{ textAlign: "center" }}>
                            <Grid className="" style={{paddingRight :"20px"}}>
                                <img style={{ objectFit: "cover", width: "100%" }} src="/img/product/1/20221014110804591_640.jpg"></img>
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
                            <Grid className="" style={{ padding: "30px 30px" }} container>
                                <Grid className="" style={{ padding: "15px 0" }} container>
                                    <Grid className="" item xs={6}>할인가</Grid>
                                    <Grid item xs={6} className="">459,000</Grid>
                                </Grid>
                                <Grid className="" style={{ padding: "15px 0" }} container>
                                    <Grid className="" item xs={6}>판매가</Grid>
                                    <Grid item xs={6} className="">790,000</Grid>
                                </Grid>
                                <Grid className="" style={{ padding: "15px 0" }} container>
                                    <Grid className="" item xs={6}>카드혜택</Grid>
                                    <Grid item xs={6} className="">국민 최대 10% 할인</Grid>
                                </Grid>
                                <Grid className="" style={{ padding: "15px 0" }} container>
                                    <Grid className="" item xs={6}>무이자할부</Grid>
                                    <Grid item xs={6} className="">2~6개월 카드 무이자</Grid>
                                </Grid>
                            </Grid>
                            <hr></hr>
                            <Grid className="" style={{ padding: "20px 30px" }} container>
                                <Grid className="" item xs={3}>
                                    옵션 선택
                                </Grid>
                                <Grid className="" item xs={9}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-select-label">Options</InputLabel>
                                        <Select
                                            labelId="demo-multiple-select-label"
                                            id="demo-multiple-select"
                                            multiple
                                            value={selectedOptions}
                                            onChange={handleChange}
                                            label="Options"
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {renderSelectedOptions()}
                            <Grid className="" style={{ padding: "30px 30px" }} container alignItems="center">
                                <Grid className="" item xs={6}>총 상품 금액</Grid>
                                <Grid className="" item xs={6}>1,000원</Grid>
                            </Grid>
                            <Grid className="" container>
                                <Grid className="" item xs={4}><Button size="large" variant="outlined" style={{ width: "100%" }}>관심상품</Button></Grid>
                                <Grid className="" item xs={4}><Button size="large" variant="contained" color="secondary" style={{ width: "100%" }}>장바구니</Button></Grid>
                                <Grid className="" item xs={4}><Button size="large" variant="contained" style={{ width: "100%" }}>바로구매</Button></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <ProductHead></ProductHead>
            </Grid>



        </div>

    )

}

export default ProductInner;