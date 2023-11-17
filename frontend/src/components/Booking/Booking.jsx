import React, { useContext, useState } from 'react';
import './booking.css';
import StarIcon from '@mui/icons-material/Star';
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';


const Booking = ({ tour, avgRating }) => {
    const { price, reviews, title } = tour;
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [booking, setBooking] = useState({
        userId: user && user?._id,
        userEmail: user && user?.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    });

    const handleChange = (e) => {
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (!user || user === undefined || user === null) {
                return alert('please sign in first');
            }

            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(booking)
            });
            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            }
            navigate('/thank-you');
        } catch (error) {
            console.log('error.message', error.message);
        }
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