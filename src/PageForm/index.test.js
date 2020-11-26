import React from 'react';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';
import { cleanup, render, waitFor } from '@testing-library/react';
import { PageForm } from '.';

afterEach(cleanup);
jest.mock('axios');

// constants you are going to type and check on later
const name = 'Valorant';
const location = 'Haven';
const description = '3 bomb sites';
const cost = '999';

describe('PageForm component', () => {
  it('should render', () => {
    const { container } = render(<PageForm />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call api with correct values', async () => {
    // render the component
    const { getByLabelText, getByText } = render(<PageForm />);

    // do stuff as a user
    userEvent.type(getByLabelText('Name'), name);
    userEvent.type(getByLabelText('Location'), location);
    userEvent.type(getByLabelText('Description'), description);
    userEvent.type(getByLabelText('Cost'), cost);
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
  });

  // it.only('should show error message if API is down', async () => {
  //   axiosMock.get.mockRejectedValue({ error: '404' });
  //   const { getByLabelText, getByText } = render(<PageForm />);

  //   // do stuff as a user
  //   userEvent.type(getByLabelText('Name'), name);
  //   userEvent.type(getByLabelText('Location'), location);
  //   userEvent.type(getByLabelText('Description'), description);
  //   userEvent.type(getByLabelText('Cost'), cost);
  //   userEvent.click(getByText('Submit'));

  //   await waitFor(() => getByText("Sorry there's an issue with the server. Please try again later"));
  // });
});
