import React from 'react';
import TodoItem from '../molecules/TodoItem';
import { useTodo } from '@/contexts/TodoContexts';

const TodoList = () => {
  const { todoList, removeTodo, completeTodo } = useTodo();

  return (
    <>
      <ul>
        {todoList &&
          todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeOnChange={completeTodo}
              removeOnChange={removeTodo}
            />
          ))}
      </ul>
    </>
  );
};

export default TodoList;
