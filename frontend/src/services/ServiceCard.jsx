import React from 'react'
import './service-card.css'

const ServiceCard = ({ item }) => {
  const { imgUrl, title, desc } = item

  return (
    <div className='service_item'>
      <div className="service_img">
        <img src={imgUrl} alt="" />
      </div>
      <h6>{title}</h6>
      <p>{desc}</p>
    </div>
  )
}

export default ServiceCard