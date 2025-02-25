import React from 'react';
import Checkbox from '../atoms/Checkbox';
import { Todo } from '@/types/todo';
import Button from '../atoms/Button';

type Props = {
  todo: Todo;
  completeOnChange: (id: number) => void;
  removeOnChange: (id: number) => void;
};

const TodoItem = (props: Props) => {
  const { todo, completeOnChange, removeOnChange } = props;
  return (
    <>
      <li>
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeOnChange(todo.id)}
        />
        <span
          style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
        >
          {todo.title}
        </span>
        <Button onClick={() => removeOnChange(todo.id)} label="削除" />
      </li>
    </>
  );
};

export default TodoItem;
