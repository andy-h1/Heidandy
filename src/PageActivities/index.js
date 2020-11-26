import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ActivityTracker } from '../ActivityTracker';
import { PageForm } from '../PageForm';

export const PageActivities = () => {
  const [activitiesData, setActivitiesData] = useState();
  const [errors, setErrors] = useState();
  const [isLoading, setisLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('https://heidan-api.herokuapp.com/activities');
      setActivitiesData(data);
      setisLoading(false);
    } catch (error) {
      setErrors("Sorry we can't find any activities");
    }
  };

  useEffect(() => {
    if (!activitiesData) {
      fetchData();
    }
  }, [activitiesData]);

  return (
    <>
      <h1>Activities Page</h1>
      {isLoading && <p data-testid="loadingMessage">Loading activities...</p>}
      {errors && <p data-testid="errorMessage">{errors}</p>}
      {!errors && activitiesData && <ActivityTracker data={activitiesData} fetchData={fetchData} />}
      <PageForm fetchData={fetchData} />
    </>
  );
};
