import React from 'react';
import { func, node } from 'prop-types';
import * as S from './styles';

export const Button = ({ children, onClick }) => {
  return (
    <S.Button type="button" onClick={onClick}>
      {children}
    </S.Button>
  );
};

Button.propTypes = {
  children: node.isRequired,
  onClick: func.isRequired,
};
