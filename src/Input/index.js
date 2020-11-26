import React from 'react';
import * as S from './styles';

export const Input = React.forwardRef((props, ref) => {
  return <S.Input ref={ref} {...props} />;
});
