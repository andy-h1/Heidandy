import React from 'react';
import { func, node } from 'prop-types';
import * as S from './styles';

export const Button = ({ children, onClick, ...props }) => {
  return (
    <S.Button type="button" onClick={onClick} {...props}>
      {children}
    </S.Button>
  );
};

Button.propTypes = {
  children: node.isRequired,
  onClick: func,
};

Button.defaultProps = {
  onClick: () => null,
};
