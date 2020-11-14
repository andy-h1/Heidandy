/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

export const PageForm = () => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log({ values });
  };

  return (
    <form>
      <label htmlFor="name">
        Name
        <Input
          id="name"
          value={values.name}
          name="name"
          type="text"
          placeholder="name of activity"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="location">
        Location
        <Input
          id="location"
          value={values.location}
          name="location"
          type="text"
          placeholder="location"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description
        <Input
          id="description"
          value={values.description}
          name="description"
          type="text"
          placeholder="description"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="cost">
        Cost
        <Input id="cost" value={values.cost} name="cost" type="text" placeholder="cost" onChange={handleChange} />
      </label>

      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
};

// cost, description, location, name
// log out values when submitting form
