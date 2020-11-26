import React from 'react';
import axiosMock from 'axios';
import { render, cleanup, waitFor, screen } from '@testing-library/react';
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

    render(<PageActivities />);

    await waitFor(() => expect(screen.getByText(`Activity name: ${mockResponse[0].name}`)));
    screen.getByText(`Description: ${mockResponse[0].description}`);
    // add all the other shit ^^
  });

  it('should initially display loading', async () => {
    render(<PageActivities />);

    await waitFor(() => screen.getByTestId('loadingMessage'));
  });

  it('should render error message if API throws an error', async () => {
    axiosMock.get.mockRejectedValue({ error: '404' });

    render(<PageActivities />);

    await waitFor(() => screen.getByTestId('errorMessage'));
  });
});
