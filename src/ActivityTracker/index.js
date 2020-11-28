/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { arrayOf, boolean, func, number, shape, string } from 'prop-types';
import axios from 'axios';
import { Button } from '../Button';

export const ActivityTracker = ({ fetchData, activities }) => {
  const [deleteId, setDeleteId] = useState();
  const [errorId, setErrorId] = useState();

  const handleDelete = async (id) => {
    setDeleteId(id);
    try {
      await axios.delete(`https://heidan-api.herokuapp.com/activity/${id}`);
      await fetchData();
      setDeleteId();
    } catch (error) {
      setErrorId(id);
    }
  };

  return (
    <div data-testid="activityTracker">
      <ul>
        {activities.map((activity) => {
          const { complete, cost, description, id, location, name } = activity;

          return (
            <React.Fragment key={id}>
              {errorId === id && <p>Sorry there was an error deleting {name}</p>}
              {deleteId === id ? (
                <p>Deleting data...</p>
              ) : (
                <li>
                  <p>Activity name: {name}</p>
                  <p>Description: {description}</p>
                  <p>Location: {location}</p>
                  <p>Cost: {cost}</p>
                  <p>Complete: {complete ? 'done' : 'not done'}</p>
                  <Button type="button" onClick={() => handleDelete(id)}>
                    Delete
                  </Button>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

ActivityTracker.propTypes = {
  fetchData: func.isRequired,
  activities: arrayOf(
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
