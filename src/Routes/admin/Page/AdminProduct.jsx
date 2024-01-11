import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, Box, FormControlLabel, Checkbox, InputLabel, Select, MenuItem } from '@mui/material';
import { getProductInner as getProduct , updateProduct, postProduct ,getBrand} from '../../../services/admin/ProductService';
import '../Style/AdminGlobal.scss';
import '../Style/AdminProduct.scss';
import { useNavigate, useParams } from 'react-router-dom';


const AdminProduct = () => {
  const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const { product_no } = useParams(); // URL에서 product_no 가져오기
  const [productData, setProductData] = useState({
    brand_no: '',
    product: '',
    price: '',
    discount: '',
    benefit: '',
    no_interest_installment: '',
    is_shop_pickup: false,
    is_shop_delivery: false,
    // 기타 필드
  });
  
  const [mainImage, setMainImage] = useState(null); // 대표 이미지 상태
  const [subImages, setSubImages] = useState([]); // 서브 이미지 배열 상태

  useEffect(() => {
    if (product_no) {
      fetchProductData(product_no);
    }
  }, [product_no]);

  const fetchProductData = async (product_no) => {
    const data = await getProduct(product_no);
    setProductData(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (product_no) {
        response = await updateProduct(product_no, productData);
      } else {
        response = await postProduct(productData);
      }
      // 성공 처리 로직
      alert('상품이 성공적으로 저장되었습니다.');
      navigate('/admin/productlist'); // 혹은 상품 목록으로 돌아가기
    } catch (error) {
      // 에러 처리 로직
      alert('상품 저장에 실패하였습니다: ' + error.message);
    }
  };

  // 대표 이미지와 서브 이미지 미리보기를 위한 핸들러
  const handleImageChange = (e, isMainImage = false) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (isMainImage) {
        setMainImage(fileURL);
      } else {
        setSubImages([...subImages, fileURL]);
      }
    }
  };
  const [brands, setBrands] = useState([]); // 브랜드 목록 상태

  useEffect(() => {
    // 브랜드 목록 가져오기
    fetchBrands();
    if (product_no) {
      fetchProductData(product_no);
    }
  }, [product_no]);

  const fetchBrands = async () => {
    const brandsData = await getBrand();
    setBrands(brandsData);
  };


  // 컴포넌트 반환 로직에 필요한 입력 필드들을 추가합니다.
  // 예를 들어, 상품명, 가격, 할인률, 브랜드 번호 등
  return (
    <Box className="AdminGlobal AdminProduct" display="flex" justifyContent="space-between">
    <Box width="48%">
        <FormControl className="formControl" fullWidth>
          <InputLabel id="brand-label">브랜드</InputLabel>
          <Select
            labelId="brand-label"
            id="brand-select"
            name="brand_no"
            value={productData.brand_no}
            onChange={handleChange}
            label="브랜드"
          >
            {brands.map((brand) => (
              <MenuItem key={brand.brand_no} value={brand.brand_no}>
                {brand.brand_name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="상품명"
            name="product"
            value={productData.product}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="가격"
            name="price"
            value={productData.price}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="할인률 (%)"
            name="discount"
            value={productData.discount}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: <span>%</span>,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControlLabel
            control={<Checkbox checked={productData.is_shop_pickup} onChange={handleChange} name="is_shop_pickup" />}
            label="매장 픽업 가능"
          />

          <FormControlLabel
            control={<Checkbox checked={productData.is_shop_delivery} onChange={handleChange} name="is_shop_delivery" />}
            label="매장 배송 가능"
          />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {product_no ? '상품 수정' : '상품 등록'}
        </Button>
      </FormControl>
    </Box>
    <Box width="45%" display="flex" flexDirection="column">
        <Box className="imageUploadPreview" display="flex" flexDirection="column">
          {mainImage ? (
            <img src={mainImage} alt="대표 이미지 미리보기" style={{ width: '100%', height: 'auto' }} />
          ) : (
            <Box style={{ width: '100%', height: '200px', backgroundColor: 'grey' }} />
          )}
          <Button variant="contained" component="label">
            대표 이미지 업로드
            <input type="file" hidden onChange={(e) => handleImageChange(e, true)} />
          </Button>
        </Box>
        <Box display="flex" justifyContent="space-around">
          {subImages.map((image, index) => (
            <Box key={index} className="subImagePreview">
              <img src={image} alt={`서브 이미지 미리보기 ${index + 1}`} style={{ width: '100px', height: '100px' }} />
            </Box>
          ))}
          <Button variant="contained" component="label">
            서브 이미지 업로드
            <input type="file" hidden onChange={handleImageChange} multiple />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProduct;