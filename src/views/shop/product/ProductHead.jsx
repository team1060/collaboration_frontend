import { useState } from 'react';
import { Container, Grid, Button } from '@mui/material';
import ProductDescription from './ProductDescription';
import ProductReviews from './ProductReviews';

function ProductHead({ prop }) {
    const [activeTab, setActiveTab] = useState('description');
    // console.log(prop);
    return (
        <div className="con">
            <div className='head'>
                <Container>
                    <Grid className='atag' item lg={12} md={12} xs={12}>
                        <Button 
                            onClick={() => setActiveTab('description')}
                            className={activeTab === 'description' ? 'active' : ''}
                        >
                            상품 상세설명
                        </Button>
                        {/* <Button
                            onClick={() => setActiveTab('reviews')}
                            className={activeTab === 'reviews' ? 'active' : ''}
                        >
                            상품평
                        </Button> */}
                    </Grid>
                </Container>
            </div>
            <Container>
                {activeTab === 'description' && <ProductDescription prop={prop}></ProductDescription>}
                {activeTab === 'reviews' && <ProductReviews />}
            </Container>
        </div>
    )
}

export default ProductHead;
