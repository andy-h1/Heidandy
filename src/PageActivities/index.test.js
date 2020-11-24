import React from 'react';
import axiosMock from 'axios';
import { render, cleanup, waitFor } from '@testing-library/react';
import { PageActivities } from '.';

afterEach(cleanup);
jest.mock('axios');

const mockResponse = [
  {
    complete: false,
    cost: 5000.0,
    description: 'Destroying scrubs',
    id: 4,
    location: "Summoner's Rift",
    name: 'Valorant',
  },
];

describe('Activity Page', () => {
  it('should fetch data successfully from an API', async () => {
    axiosMock.get.mockResolvedValue({ data: mockResponse });
    const { getByTestId } = render(<PageActivities />);
    await waitFor(() => expect(getByTestId('activityTracker')));
  });
});
