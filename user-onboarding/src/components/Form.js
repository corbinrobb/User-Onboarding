import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Please enter a name'),
  email: yup.string().email().required('Please enter your email'),
  password: yup.string().min(7, 'Password must be at least 7 characters long').required('Please enter a password'),
  role: yup.string().required('Please choose a role'),
  terms: yup.boolean().oneOf([true], 'Please accept the terms')
});

const Form = () => {
  const [ form, setForm ] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    terms: false
  });

  const [ buttonOff, setButtonOff ] = useState(true);
  const [ users, setUsers ] = useState([]);

  const [ errors, setErrors ] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  })

  const handleChange = (e) => {
    e.persist();
    setForm({ ...form, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
    validate(e);
  }

  const validate = (e) => {
    yup
      .reach(schema, e.target.name)
      .validate( (e.target.name === 'terms') ? e.target.checked : e.target.value )
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ''
        })
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors
        })
      })
  }  

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post('https://reqres.in/api/users', form)
      .then(res => {
        setUsers([...users, res.data]);
        console.log(res.data)
        setForm({
          name: '',
          email: '',
          password: '',
          terms: false
        });
      })
      .catch(err => console.log(err.res))
  }


  useEffect(() => {
    schema
      .isValid(form)
      .then((valid) => {
        setButtonOff(!valid);
      });
  }, [form])

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="name">
        Name: 
      </label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
      {(errors.name.length > 0) && <p data-cy="name">{errors.name}</p>}
      <label htmlFor="email">
        Email:
      </label>
        <input
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
      {(errors.email.length > 0) && <p data-cy="email">{errors.email}</p>}
      <label htmlFor="password">
        Password:
      </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      {(errors.password.length > 0) && <p data-cy="password">{errors.password}</p>}
      <label htmlFor="role">
        Role:
      </label>
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option disabled hidden value=''></option>
        <option value="Web Developer">Web Developer</option>
        <option value="UX Designer">UX Designer</option>
        <option value="Data Scientist">Data Scientist</option>
      </select>
      <label htmlFor="terms">
        <input
          name="terms"
          type="checkbox"
          checked={form.terms}
          onChange={handleChange}
        />
        Terms and conditions
      </label>
      {(errors.terms.length > 0) && <p data-cy="terms">{errors.terms}</p>}
      <button disabled={buttonOff}>Submit</button>
      {users.length > 0 && users.map(user => {
        return <pre>{JSON.stringify(user, null, 2)}</pre> })
      }
    </form>
  );
}

export default Form;