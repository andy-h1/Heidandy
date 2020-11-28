import React from 'react';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { ActivityTracker } from '.';

afterEach(cleanup);
jest.mock('axios');

const activityData = [
  {
    complete: false,
    cost: 5000.0,
    description: 'Destroying scrubs',
    id: 4,
    location: 'Haven',
    name: 'Valorant',
  },
  {
    complete: false,
    cost: 100.0,
    description: 'Getting destroyed',
    id: 1,
    location: 'Summoners',
    name: 'League',
  },
];

const defaultProps = {
  fetchData: () => null,
};

describe('Activity Tracker', () => {
  it('should render', () => {
    const { container } = render(<ActivityTracker {...defaultProps} activities={activityData} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should delete the activity after button has been clicked', async () => {
    // render the component
    render(<ActivityTracker {...defaultProps} activities={activityData} />);

    // do stuff as a user
    userEvent.click(screen.getAllByText('Delete')[0]);

    // check that API was called
    await waitFor(() => screen.getByText('Deleting data...'));
    expect(axiosMock.delete).toHaveBeenCalledWith(`https://heidan-api.herokuapp.com/activity/${activityData[0].id}`);
  });

  it('should show error message if API is down', async () => {
    axiosMock.delete.mockRejectedValue({ error: '404' });
    render(<ActivityTracker {...defaultProps} activities={activityData} />);

    userEvent.click(screen.getAllByText('Delete')[0]);

    await waitFor(() => screen.getByText(`Sorry there was an error deleting ${activityData[0].name}`));
  });

  it('should render done if complete is true', () => {
    const completedActivity = [
      {
        complete: true,
        cost: 100.0,
        description: 'Getting destroyed',
        id: 1,
        location: 'Summoners',
        name: 'League',
      },
    ];

    render(<ActivityTracker {...defaultProps} activities={completedActivity} />);

    screen.getByText('Complete: done');
  });
});
