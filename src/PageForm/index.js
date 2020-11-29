/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { func } from 'prop-types';
import { Button } from '../Button';
import { Input } from '../Input';

export const PageForm = ({ fetchData }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      location: '',
      description: '',
      cost: 0,
    },
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const pushActivity = async (data) => {
    setLoading(true);
    setError(false);

    try {
      await axios.post('https://heidan-api.herokuapp.com/activity', {
        ...data,
        complete: false,
        cost: parseInt(data.cost, 10),
      });
      setLoading(false);
      fetchData();
      reset();
    } catch (errors) {
      setError(true);
    }
  };

  const onSubmit = (formData) => {
    pushActivity(formData);
  };

  return (
    <>
      {error && <p>Sorry there&apos;s an issue with the server. Please try again later</p>}
      {isLoading && <p>Sending your data...</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          Name
          <Input id="name" name="name" type="text" placeholder="name of activity" ref={register} />
        </label>
        <label htmlFor="location">
          Location
          <Input id="location" name="location" type="text" placeholder="location" ref={register} />
        </label>
        <label htmlFor="description">
          Description
          <Input id="description" name="description" type="text" placeholder="description" ref={register} />
        </label>
        <label htmlFor="cost">
          Cost
          <Input id="cost" name="cost" type="number" placeholder="cost" ref={register} />
        </label>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

PageForm.propTypes = {
  fetchData: func.isRequired,
};
