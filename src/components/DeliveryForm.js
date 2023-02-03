import React, { useState } from 'react';

import './DeliveryForm.css'

const DevlieryForm = (props) => {
  const [orderTime, setorderTime] = useState('');
  const [paramaters, setParamaters] = useState(
    {cartValue: 0,
     deliveryDistance: 0,
     numberOfItems: 0});
  const [deliveryFee, setDeliveryFee] = useState('');

  }

  const timeValueHandler = (event) => {
    setTime(event.target.value);
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
    event.preventDefault();
    setDeliveryFee;
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
      setDeliveryFee(new_delivery_fee)
    };
