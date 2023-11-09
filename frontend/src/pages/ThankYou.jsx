import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/thank-you.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ThankYou = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='pt-5 text-center'>
                        <div className="thank_you">
                            <span><CheckCircleOutlineIcon className='checkCss' /></span>
                            <h1 className='mb-3 fw-semibold'>Thank You</h1>
                            <h3 className='mb-4'>Your Tour Is Booked</h3>

                            <Button className='btn primary_btn w-25'><Link to='/home'>Back To Home</Link></Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ThankYou