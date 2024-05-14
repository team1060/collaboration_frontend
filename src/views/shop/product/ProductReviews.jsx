import { Grid, Rating } from "@mui/material";

function ProductReviews() {
  return (
    <div>
      <h3>상품평</h3>
      <hr></hr>
      <div>
        <Grid container>
          <Grid item container direction="column" xs={10}>
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
            <strong className="title">제목입니다.</strong>
            <p className="">상품명입니다.</p>
            <hr></hr>
            <p className="content">
              내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다
            </p>
          </Grid>

          <Grid
            item
            container
            direction="column"
            xs={2}
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <div>2024-01-01</div>
            <div>mylo_z</div>
          </Grid>
        </Grid>
        <hr></hr>
      </div>
    </div>
  );
}

export default ProductReviews;
