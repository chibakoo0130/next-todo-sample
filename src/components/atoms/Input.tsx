import React, { ChangeEventHandler } from 'react';

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Input = (props: Props) => {
  const { value, onChange } = props;

  return (
    <input
      type="text"
      value={value}
      placeholder="Todoを入力"
      onChange={onChange}
    />
  );
};

export default Input;
