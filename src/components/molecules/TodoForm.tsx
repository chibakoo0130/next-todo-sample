import React, { MouseEvent, useState } from 'react';
import Input from '../atoms/Input';
import { useTodo } from '@/contexts/TodoContexts';
import Button from '../atoms/Button';
import { Flex } from '../layout/Flex';

export const TodoForm = () => {
  const { addTodo } = useTodo();

  const [value, setValue] = useState('');

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue('');
  };

  return (
    <>
      <Flex>
        <form>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <Button onClick={handleAdd} label="追加" />
        </form>
      </Flex>
    </>
  );
};

export default TodoForm;
