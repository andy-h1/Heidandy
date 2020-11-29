import React from 'react';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { PageForm } from '.';

afterEach(cleanup);
jest.mock('axios');

const defaultProps = {
  fetchData: () => null,
};

const { getByLabelText, getByText, queryByText } = screen;
// constants you are going to type and check on later
const name = 'Valorant';
const location = 'Haven';
const description = '3 bomb sites';
const cost = '999';

describe('PageForm component', () => {
  it('should render', () => {
    const { container } = render(<PageForm {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call api with correct values', async () => {
    const fetchData = jest.fn();
    axiosMock.post.mockResolvedValue();
    // render the component
    render(<PageForm {...defaultProps} fetchData={fetchData} />);

    const nameInput = getByLabelText('Name');
    const locationInput = getByLabelText('Location');
    const descriptionInput = getByLabelText('Description');
    const costInput = getByLabelText('Cost');

    // do stuff as a user
    userEvent.type(nameInput, name);
    userEvent.type(locationInput, location);
    userEvent.type(descriptionInput, description);
    userEvent.type(costInput, cost);
    userEvent.click(getByText('Submit'));

    // check that API was called
    await waitFor(() =>
      expect(axiosMock.post).toHaveBeenCalledWith('https://heidan-api.herokuapp.com/activity', {
        complete: false,
        cost: 999,
        description,
        location,
        name,
      }),
    );

    expect(queryByText('Sending your data...')).not.toBeInTheDocument();
    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(nameInput.value).toEqual('');
    expect(locationInput.value).toEqual('');
    expect(descriptionInput.value).toEqual('');
    expect(costInput.value).toEqual('0');
  });

  it('should show loading message when data is posted to API', async () => {
    axiosMock.post.mockResolvedValue();
    render(<PageForm {...defaultProps} />);

    userEvent.type(getByLabelText('Name'), name);
    userEvent.type(getByLabelText('Location'), location);
    userEvent.type(getByLabelText('Description'), description);
    userEvent.type(getByLabelText('Cost'), cost);
    userEvent.click(getByText('Submit'));

    await waitFor(() => getByText('Sending your data...'));
  });

  it('should show error message if API is down', async () => {
    axiosMock.post.mockRejectedValue({ error: '404' });
    render(<PageForm {...defaultProps} />);

    // do stuff as a user
    userEvent.type(getByLabelText('Name'), name);
    userEvent.type(getByLabelText('Location'), location);
    userEvent.type(getByLabelText('Description'), description);
    userEvent.type(getByLabelText('Cost'), cost);
    userEvent.click(getByText('Submit'));

    await waitFor(() => getByText("Sorry there's an issue with the server. Please try again later"));
  });
});
