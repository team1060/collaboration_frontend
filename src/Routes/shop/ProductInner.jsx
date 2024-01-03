import { Container, Grid } from "@mui/material";

function ProductInner() {
    return(
  
      <>
     <Grid>
        <div style={{paddingTop:"30px"}}></div>
        <hr></hr>
     </Grid>
     <Grid>
        <Container>
            <div style={{margin:"20px 0"}}>
                <h2>[핑] G425 max 드라이버</h2>
            </div>
            <div>
                <hr></hr>
            </div>
            <Grid container >
                <Grid item md={6}>
                    <img style={{objectFit:"cover", width:"100%", maxWidth:"640px"}} src="/img/product/1/20221014110804591_640.jpg"></img>
                </Grid>
                <Grid container direction="column" item md={6}>
                    <div className="">
                        <div className="">판매가</div><div className="">790,000</div>
                        <div className="">판매가</div><div className="">790,000</div>
                        <div className="">판매가</div><div className="">790,000</div>
                        <div className="">판매가</div><div className="">790,000</div>
                        <div className="">판매가</div><div className="">790,000</div>
                    </div>

                </Grid>
            </Grid>
        </Container>
     </Grid>
      
      
  
       </>
  
    )
    
  }
  
  export default ProductInner;