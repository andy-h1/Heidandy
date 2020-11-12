/* eslint-disable import/prefer-default-export */
import React from 'react';
import { arrayOf, boolean, shape, string } from 'prop-types';

export const ActivityTracker = ({ data }) => (
  <div>
    <ul>
      {data.map((activity) => {
        const { complete, cost, description, id, location, name } = activity;

        return (
          <li key={id}>
            <p>Activity name:{name}</p>
            <p>Description: {description}</p>
            <p>Location: {location}</p>
            <p>Cost: {cost}</p>
            <p>Complete: {complete}</p>
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
      cost: string,
      description: string,
      id: string,
      location: string,
      name: string,
    }),
  ).isRequired,
};
