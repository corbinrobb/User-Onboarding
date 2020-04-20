import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const Form = () => {
  const [ form, setForm ] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});
  }


  return (
    <form onSubmit={null}>
      <label htmlFor="name">
        Name: 
      </label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
      <label htmlFor="email">
        Email:
      </label>
        <input
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
      <label htmlFor="password">
        Password:
      </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      <label htmlFor="terms">
        <input
          name="terms"
          type="checkbox"
          value={form.terms}
          onChange={handleChange}
        />
        Terms and conditions
      </label>
      <button>Submit</button>
    </form>
  );
}

export default Form;