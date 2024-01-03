function ProductDescription({ prop }) {
    // console.log(prop);
    return (
        <div>
            {prop?.image_details.map((image, index) => (
                <img style={{ width: "100%" }} src={image.path} alt={`Slide ${index}`}></img>
            ))}
        </div>
    )
}

export default ProductDescription