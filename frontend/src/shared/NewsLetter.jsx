import React from 'react'
import './newsletter.css'
import { Container, Row, Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const NewsLetter = () => {
    return (
        <section className='newsletter'>
            <Container>
                <Row>
                    <Col lg='6'>
                        <div className="newsletter_content">
                            <h2>Subcribe now to get useful traveling information</h2>

                            <div className="newsletter_input">
                                <input type="email" placeholder='Enter your email' />
                                <button className="btn newsletter_btn">Subcribe</button>
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Obcaecati adipisici sunt in, provident facere ipsam?
                            </p>
                        </div>
                    </Col>
                    <Col lg='6'>
                        <div className="newsletter_img">
                            <img src={maleTourist} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewsLetter