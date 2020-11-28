import React from 'react';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';
import { cleanup, render, waitFor } from '@testing-library/react';
import { PageForm } from '.';

afterEach(cleanup);
jest.mock('axios');

const defaultProps = {
  fetchData: () => null,
};

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
    // render the component
    const { getByLabelText, getByText } = render(<PageForm {...defaultProps} />);

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

  it('should show loading message when data is posted to API', async () => {
    const { getByLabelText, getByText } = render(<PageForm {...defaultProps} />);

    userEvent.type(getByLabelText('Name'), name);
    userEvent.type(getByLabelText('Location'), location);
    userEvent.type(getByLabelText('Description'), description);
    userEvent.type(getByLabelText('Cost'), cost);
    userEvent.click(getByText('Submit'));

    await waitFor(() => getByText('Sending your data...'));
  });

  // it('should show error message if API is down', async () => {
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
