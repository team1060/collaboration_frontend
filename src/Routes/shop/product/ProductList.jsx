import React, { useEffect, useState } from 'react';
import '../style/ProductList.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from '@emotion/styled';
import { Button, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { getBrand, getProductList } from '../../../services/shop/apiProduct';

// 상품 갯수 
const ITEMS_PAGE_LARGE = 30;
const ITEMS_PAGE_SMALL = 10;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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

function ProductList({ clubName }) {
    const [productLists, setProductLists] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [brandName, setBrandName] = useState([]);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);

    // getBrandName 함수를 useEffect 밖으로 빼면서 brandData에 의존성을 추가함
    const getBrandName = (brandNo) => {
        const brand = brandData.find((item) => item.brand_no === brandNo);
        return brand ? brand.brand_name : '';
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 실제 API 호출 부분은 실제 API에 맞게 수정해야 합니다.
                // 아래는 가상의 함수로 실제 동작하지 않습니다.
                const brandList = await getBrand();
                const productList = await getProductList();
                
                setBrandData(brandList);
                const productListWithBrandNames = productList.map((product) => ({
                    ...product,
                    brand_name: getBrandName(product.brand_no),
                }));
                
                setProductLists(productListWithBrandNames);

                let filtered = productListWithBrandNames;

                if (clubName === undefined || clubName === '전체') {
                    filtered = productListWithBrandNames;
                } else {
                    filtered = productListWithBrandNames.filter(ProductList =>
                        ProductList.product.includes(clubName)
                    );
                }

                setProductLists(filtered);

                // 페이징 
                const startIndex = (page - 1) * (isSmallScreen ? ITEMS_PAGE_SMALL : ITEMS_PAGE_LARGE);
                const endIndex = startIndex + (isSmallScreen ? ITEMS_PAGE_SMALL : ITEMS_PAGE_LARGE);
                const currentPageData = filtered.slice(startIndex, endIndex);
                setData(currentPageData);

                // 최초 실행 시 한 번 강제로 handleChange 호출
                if (brandData.length > 0) {
                    handleChange({
                        target: {
                            value: brandData[0].brand_name,
                        },
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [page, clubName, brandData]);

    const isSmallScreen = useMediaQuery('(max-width: 550px)');

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setBrandName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    //페이징
    return (
        <div id="productLists">
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <div className="all">
                            <h3>{`총상품갯수 ${productLists.length} 개`}</h3>
                            <div className='but'>
                                <FormControl sx={{ m: 1, width: 300 }} size="small">
                                    <InputLabel
                                        id="demo-multiple-name-label"
                                        sx={{
                                            textAlign: 'center',
                                        }}
                                    >브랜드</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={brandName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={{ ...MenuProps, disableScrollLock: true }}
                                    >
                                        {brandData.map((brand) => (
                                            <MenuItem
                                                key={brand.brand_no}
                                                value={brand.brand_name}
                                            >
                                                {brand.brand_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button variant="contained" href="#contained-buttons" style={{ height: '40px' }}>
                                    검색
                                </Button>
                            </div>
                        </div>
                    </Grid>

                    {data.map((list) => (
                        <Grid item key={list.product_no}>
                            <Card sx={{ width: { lg: 230, xs: 225 }, height: 420 }} className='card'>
                                <CardContent>
                                    <img src={`http://localhost:8081${list.path}`} alt="Product Image" />
                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold', mt: 1 }} color="text.dark" gutterBottom>
                                        {list.brand_name}
                                    </Typography>

                                    <div className='pickup'>
                                        {list.is_shop_delivery ? <StyledDelivery>배달가능</StyledDelivery> : ''}
                                        {list.is_shop_pickup ? <StyledPickup>픽업가능</StyledPickup> : ''}
                                    </div>

                                    <div className="title">
                                        <Typography sx={{ fontSize: 14, mb: 1.5 }} component="div">
                                            {list.product}
                                        </Typography>
                                    </div>
                                    <div className="discount">
                                        <Typography color="text.secondary" sx={{ fontSize: 13, fontWeight: '500' }}>
                                            {list.discount > 0 ? <span style={{ textDecoration: 'line-through' }}>{Number(list.price).toLocaleString()}원</span> : ''}
                                        </Typography>
                                    </div>

                                    <Typography className='benefit' sx={{ fontSize: 16, fontWeight: 'bold' }}>
                                        {Number(list.price * (1 - list.discount)).toLocaleString()}원
                                        <span>{Number((1 - list.discount) * 100).toLocaleString() == 100 ? '' : '[' + Number((1 - list.discount) * 100).toLocaleString() + '%' + ']'}</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <div className="page">
                    <Stack spacing={2}>
                        <Pagination
                            showFirstButton
                            showLastButton
                            count={isSmallScreen ? Math.ceil(productLists.length / ITEMS_PAGE_SMALL) : Math.ceil(productLists.length / ITEMS_PAGE_LARGE)}
                            color="primary"
                            onChange={handlePageChange}
                            boundaryCount={isSmallScreen ? 1 : 0}
                            siblingCount={isSmallScreen ? 0 : 4}
                        />
                    </Stack>
                </div>
            </Container>
        </div>
    );
}

export default ProductList;
