import React, { MouseEvent } from 'react';

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label: string;
};

const Button = (props: Props) => {
  const { onClick, label } = props;

  return <button onClick={onClick}>{label}</button>;
};

export default Button;
