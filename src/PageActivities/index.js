/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityTracker } from '../ActivityTracker';

export const PageActivities = () => {
  const [activitiesData, setActivitiesData] = useState();
  const [errors, setErrors] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://heidan-api.herokuapp.com/activities');
        setActivitiesData(data);
        setisLoading(false);
      } catch (error) {
        setErrors("Sorry we can't any activities");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Activities Page</h1>
      {isLoading && <p>Loading activities...</p>}
      {errors && <p>{errors}</p>}
      {!errors && activitiesData && <ActivityTracker data={activitiesData} />}
    </>
  );
};
