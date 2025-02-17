import React from 'react';

type Props = {
  checked: boolean;
  onChange?: () => void;
};

export const Checkbox = (props: Props) => {
  const { checked, onChange } = props;

  return <input type="checkbox" checked={checked} onChange={onChange} />;
};

export default Checkbox;
