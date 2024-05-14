import { Container, Grid } from '@mui/material';
import { Link } from 'react-scroll';

function InfoHead({ regions }) {

    return (
        <div className="con">
            <div className='head'>
                <Container>
                    <Grid className='atag' item lg={12} md={12} xs={12}>
                        {regions?.map((region) => (
                            <li key={region}>

                                <Link className="infoLink" to={region} smooth={true} offset={-150} duration={500}>
                                    {region}
                                </Link>
                            </li>
                        ))}
                    </Grid>
                </Container>
            </div>
        </div>
    )
}

export default InfoHead;
