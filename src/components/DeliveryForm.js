import React, { useState } from 'react';

import './DeliveryForm.css'

const DevlieryForm = (props) => {
  const [time, setTime] = useState('');
  const [paramaters, setParamaters] = useState({cart: 0, distance: 0, amount: 0});
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
    setDeliveryFee(deliveryFee);
  };
