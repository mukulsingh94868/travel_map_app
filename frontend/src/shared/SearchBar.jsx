import React, { useRef } from 'react';
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_URL } from '../utils/config';


const SearchBar = () => {
    const navigate = useNavigate();
    const locationRef = useRef('');
    const distanceRef = useRef(0);
    const maxGroupSizeRef = useRef(0);

    const searchHandler = async () => {
        const location = locationRef.current.value;
        const distance = distanceRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value;

        if (location === '' || distance === '' || maxGroupSize === '') {
            return alert('All fields are required!')
        };

        const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`);
        if (!res?.ok) alert('Something went wrong')

        const result = await res.json();
        console.log('result', result);

        navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, { state: result.data })
    }
    return (
        <>
            <Col lg='12'>
                <div className='search_bar'>
                    <Form className='d-flex align-items-center gap-4'>
                        <FormGroup className='d-flex gap-3 form_group form_group-fast'>
                            <span><PlaceIcon /></span>
                            <div>
                                <h6>Location</h6>
                                <input type='text' placeholder='where are you going?' ref={locationRef} />
                            </div>
                        </FormGroup>
                        <FormGroup className='d-flex gap-3 form_group form_group-fast'>
                            <span><SocialDistanceIcon /></span>
                            <div>
                                <h6>Distance</h6>
                                <input type='number' placeholder='Distance k/m' ref={distanceRef} />
                            </div>
                        </FormGroup>
                        <FormGroup className='d-flex gap-3 form_group form_group-last'>
                            <span><GroupAddIcon /></span>
                            <div>
                                <h6>Max People</h6>
                                <input type='number' placeholder='0' ref={maxGroupSizeRef} />
                            </div>
                        </FormGroup>

                        <span className='search_icon' type='submit' onClick={searchHandler}>
                            <SearchIcon />
                        </span>
                    </Form>
                </div>
            </Col>
        </>
    )
}

export default SearchBar;