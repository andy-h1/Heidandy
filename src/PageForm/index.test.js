import React from 'react';
import axiosMock from 'axios';
import userEvent from '@testing-library/user-event';
import { cleanup, render, waitFor } from '@testing-library/react';
import { PageForm } from '.';

afterEach(cleanup);
jest.mock('axios');

describe('PageForm component', () => {
  it('should render', () => {
    const { container } = render(<PageForm />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it.only('should call api with correct values', async () => {
    // render the component
    const { getByLabelText, getByText } = render(<PageForm />);

    // constants you are going to type and check on later
    const name = 'Valorant';
    const location = 'Haven';
    const description = '3 bomb sites';
    const cost = '999';

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
});
