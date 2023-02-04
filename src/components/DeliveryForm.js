import React, { useState } from 'react';

import './DeliveryForm.css'

const DeliveryForm = (props) => {
  const [date, setDate] = useState(getCurrentTimeString());
  const [paramaters, setParamaters] = useState(
    {cartValue: 0,
     deliveryDistance: 0,
     numberOfItems: 0});

  const deliveryFee = calculateDeliveryFee(paramaters.cartValue,
    paramaters.deliveryDistance, paramaters.numberOfItems, date);

  const dateValueHandler = (event) => {
    setDate(event.target.value);
  }

  const handleChange = (event) => {
    setParamaters(prev => (
      {
        ...prev,
        [event.target.name]: parseInt(event.target.value, 10) || 0
        //handle empty string
      })
    );
  };

  function getCurrentTimeString() {
     let currentTime = new Date();
     let year = currentTime.getFullYear();
     let month = currentTime.getMonth().toString().padStart(2, '0');
     let day = currentTime.getDate().toString().padStart(2, '0');
     let hour = currentTime.getHours().toString().padStart(2, '0');
     let minute = currentTime.getMinutes().toString().padStart(2, '0');
     return `${year}-${month}-${day}T${hour}:${minute}`;
  }

  function calculateDeliveryFee(cartValue, deliveryDistance, numberOfItems,
    orderDateString){
      let deliveryFee = 0;
     // let orderDate = new Date(orderDateString);

      if (cartValue >= 100) {
        return deliveryFee;
      }

      if (cartValue < 10) {
        deliveryFee += 10 - cartValue;
      }

      if (deliveryDistance < 1){
        deliveryFee += 2;
      } else {
        deliveryFee += 2 + Math.ceil((deliveryDistance - 1)/ 0.5);
      }

      if (numberOfItems >= 5){
        const bulkFee = Math.min(1.2 * (numberOfItems - 4), 12) * 0.5;
        deliveryFee += bulkFee;
      }
      // const rushHourMultiplier = (orderDate.getUTChours() >= 15 && orderDate.getUTCHOurs() < 19)
      // deliveryFee *= rushHourMultiplier;
      deliveryFee = Math.min(deliveryFee, 15);
      return deliveryFee;
  };

  return (
    <form>
      <div className='delivery-calculator'>
        <div className='delivery-calculator__control'>
          <label className='delivey-calculator__label'>Cart Value</label>
          <input className='delivery-calculator__input' name="cartValue"
          type="number" value={paramaters.cartValue} onChange={handleChange} />
          <p>€</p>
        </div>
        <div className='delivery-calculator__control'>
          <label className='delivey-calculator__label'>Delivery distance</label>
          <input className='delivery-calculator__input' name="deliveryDistance"
          type="number" value={paramaters.deliveryDistance} onChange={handleChange} />
          <p>m</p>
        </div>
        <div className='delivery-calculator__control'>
          <label className='delivey-calculator__label'>Number of items</label>
          <input className='delivery-calculator__input' name="numberOfItems"
          type="number" value={paramaters.numberOfItems} onChange={handleChange} />
          <p>pcs</p>
        </div>
        <div className='delivery-calculator__control'>
          <label className='delivey-calculator__label'>Time</label>
          <input className='delivery-calculator__input' type="datetime-local"
          value={date} onChange={dateValueHandler} />
        </div>
        <div className='delivery-calculator__control'>
          <p>Delivery price: {deliveryFee}</p>
        </div>
      </div>
    </form>
  )
}

export default DeliveryForm;
