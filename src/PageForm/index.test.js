import React from 'react';
import { render } from '@testing-library/react';
import { PageForm } from '.';

describe('PageForm component', () => {
  it('should render', () => {
    const { container } = render(<PageForm />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it.todo('should call api with correct values');
});
