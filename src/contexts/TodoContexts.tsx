import { Todo } from '@/types/todo';
import React, {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState
} from 'react';

type TodoContextType = {
  todoList: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

type Props = {
  children: ReactNode;
};

const TodoContextsProvider = (props: Props) => {
  const { children } = props;
  const todoId: RefObject<number> = useRef<number>(0);

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodoList = [
      ...todoList,
      { id: todoId.current, title: title, isCompleted: false }
    ];
    todoId.current += 1;
    setTodoList(newTodoList);
  };

  const removeTodo = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completeTodo = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, removeTodo, completeTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoList = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoList must be used within a TodoProvider');
  }
  return context;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export default TodoContextsProvider;
