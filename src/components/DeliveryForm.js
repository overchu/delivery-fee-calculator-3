import React, { useState } from 'react';

import './DeliveryForm.css'

const DeliveryForm = (props) => {
  const [orderTime, setorderTime] = useState('');
  const [paramaters, setParamaters] = useState(
    {cartValue: 0,
     deliveryDistance: 0,
     numberOfItems: 0});
  const [deliveryFee, setDeliveryFee] = useState('');

  const timeValueHandler = (event) => {
    setorderTime(event.target.value);
  };

  const handleChange = (event) => {
    setParamaters(prev => (
      {
        ...prev,
        [event.target.name]: parseInt(event.target.value, 10)
      })
    );
  };

  const deliveryPriceChangeHandler = (event) => {
    const deliveryFee = calculateDeliveryFee
    event.preventDefault();
    setDeliveryFee(deliveryFee);
  };

  function calculateDeliveryFee(cartValue, deliveryDistance, numberOfItems,
    orderTime){
      let deliveryFee = 0;

      if (!(orderTime instanceof Date)) {
        orderTime = new Date();
      }

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
      const rushHourMultiplier = (orderTime.getUTChours() >= 15 && orderTime.getUTCHOurs() < 19)
      deliveryFee *= rushHourMultiplier;
      deliveryFee = Math.min(deliveryFee, 15);
      setDeliveryFee(deliveryFee);
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
          <input className='delivery-calculator__input' type="date"
          value={orderTime} onChange={timeValueHandler} />
        </div>
        <div className='delivery-calculator__control'>
          <button onClick={deliveryPriceChangeHandler}>Calculate delivery price</button>
        </div>
        <div className='delivery-calculator__control'>
          <p>Delivery price: {deliveryFee}</p>
        </div>
      </div>
    </form>
  )
}

export default DeliveryForm;
