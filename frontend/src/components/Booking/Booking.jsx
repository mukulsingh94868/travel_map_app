import React, { useState } from 'react';
import './booking.css';
import StarIcon from '@mui/icons-material/Star';
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const Booking = ({ tour, avgRating }) => {
    const { price, reviews } = tour;
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        userId: '01',
        userEmail: 'test@gmail.com',
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    });

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee);

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/thank-you');
        console.log('credentials', credentials);
    };
    return (
        <div className='booking'>
            <div className='booking_top d-flex align-items-center justify-content-center'>
                <h3>{price}
                    <span>/per person</span>
                </h3>
                <span className="tour_rating d-flex align-items-center gap-1">
                    <StarIcon style={{ 'color': 'var(--secondary-color)' }} />{avgRating === 0 ? null : avgRating}
                    {avgRating === 0 ? ('Not rated') : (<span>({reviews?.length})</span>)}
                </span>
            </div>

            <div className="booking_form">
                <h5>Information</h5>
                <Form className='booking_info-form' onSubmit={handleClick}>
                    <FormGroup>
                        <input type="text" placeholder='Full Name' id='fullName' required
                            onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input type="tel" placeholder='Phone' id='phone' required
                            onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input type="date" placeholder='' id='bookAt' required
                            onChange={handleChange} />
                        <input type="number" placeholder='Guest' id='guestSize' required
                            onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>

            <div className="booking_bottom">
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>${price} <i class='ri-close-line'></i> 1 person</h5>
                        <span> ${price}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0'>
                        <h5>Service charge</h5>
                        <span>${serviceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Total</h5>
                        <span>${totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>

                <Button className='btn primary_btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
            </div>
        </div>
    )
}

export default Booking;