/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityTracker } from '../ActivityTracker';

export const PageActivities = () => {
  const [activitiesData, setActivitiesData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://heidan-api.herokuapp.com/activities');
        console.log(data);
        setActivitiesData(data);
      } catch (error) {
        console.log("Sorry we can't any activities");
      }
    };
    fetchData();
  }, []);

  console.log({ activitiesData });
  return (
    <>
      <h1>Activities Page</h1>
      {activitiesData && <ActivityTracker data={activitiesData} />}
    </>
  );
};
