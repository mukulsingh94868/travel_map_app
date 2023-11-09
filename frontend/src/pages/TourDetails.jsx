import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/tour-details.css'
import tourData from '../assets/data/tours'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
// import Booking from '../components/Booking/Booking'
import NewsLetter from '../shared/NewsLetter'
// import useFetch from '../hooks/useFetch'
// import { BASE_URL } from '../utils/config'
// import { AuthContext } from '../context/AuthContext';
import StarIcon from '@mui/icons-material/Star';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import Booking from '../components/Booking/Booking'


const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('')
  const [tourRating, setTourRating] = useState(null)


  const tour = tourData?.find((tour) => tour.id === id);
  const { photo, title, desc, price, reviews, city, address, distance, maxGroupSize } = tour
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = (e) => {
    e.preventDefault();

  };
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className='tour_content'>
                <img src={photo} alt='' />

                <div className='tour_info'>
                  <h2>{title}</h2>

                  <div className='d-flex align-items-center gap-5'>
                    <span className="tour_rating d-flex align-items-center gap-1">
                      <StarIcon style={{ 'color': 'var(--secondary-color)' }} />{avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? ('Not rated') : (<span>({reviews?.length})</span>)}
                    </span>
                    <span><FmdGoodOutlinedIcon /> {address}</span>
                  </div>
                  <div className="tour_extra-details">
                    <span><LocationCityOutlinedIcon /> {city}</span>
                    <span><CurrencyRupeeOutlinedIcon /> {price}/ per person</span>
                    <span><SocialDistanceIcon /> {distance} k/m</span>
                    <span><GroupAddIcon /> {maxGroupSize} people</span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                <div className="tour_reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                      <span onClick={() => setTourRating(1)}>1 <StarPurple500OutlinedIcon /></span>
                      <span onClick={() => setTourRating(2)}>2 <StarPurple500OutlinedIcon /></span>
                      <span onClick={() => setTourRating(3)}>3 <StarPurple500OutlinedIcon /></span>
                      <span onClick={() => setTourRating(4)}>4 <StarPurple500OutlinedIcon /></span>
                      <span onClick={() => setTourRating(5)}>5 <StarPurple500OutlinedIcon /></span>
                    </div>

                    <div className="review_input">
                      <input type="text" ref={reviewMsgRef} placeholder='share your thoughts' required />
                      <button className='btn primary_btn text-white' type='submit'>
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className='user_reviews'>
                    {
                      reviews?.map(review => (
                        <div className="review_item">
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>{new Date(review?.createdAt).toLocaleDateString('en-US', options)}</p>
                              </div>

                              <span className='d-flex align-items-center'>
                                {review.rating}<StarPurple500OutlinedIcon style={{ color: '#faa935' }} />
                              </span>
                            </div>

                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))
                    }
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
        <NewsLetter />
      </section>
    </>
  )
}

export default TourDetails