/* eslint-disable import/prefer-default-export */
import React from 'react';
import { arrayOf, boolean, number, shape, string } from 'prop-types';
import axios from 'axios';
import { Button } from '../Button';

// eslint-disable-next-line react/prop-types
export const ActivityTracker = ({ fetchData, data }) => (
  <div data-testid="activityTracker">
    <ul>
      {data.map((activity) => {
        const { complete, cost, description, id, location, name } = activity;
        const handleDelete = async () => {
          try {
            await axios.delete(`https://heidan-api.herokuapp.com/activity/${activity.id}`);
            fetchData();
          } catch (error) {
            <p>Sorry no activity found</p>;
          }
        };

        return (
          <li key={id}>
            <p>Activity name: {name}</p>
            <p>Description: {description}</p>
            <p>Location: {location}</p>
            <p>Cost: {cost}</p>
            <p>Complete: {complete ? 'done' : 'not done'}</p>
            <Button type="button" onClick={handleDelete}>
              Delete
            </Button>
          </li>
        );
      })}
    </ul>
  </div>
);

ActivityTracker.propTypes = {
  data: arrayOf(
    shape({
      complete: boolean,
      cost: number,
      description: string,
      id: number,
      location: string,
      name: string,
    }),
  ).isRequired,
};
