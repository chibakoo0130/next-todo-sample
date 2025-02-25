import React, { act } from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import TodoContextsProvider, { useTodo } from './TodoContexts';

const TEXT_DECORATION_LINE_THROUGH = 'text-decoration: line-through;';

const TestComponent = () => {
  const { todoList, addTodo, removeTodo, completeTodo } = useTodo();

  return (
    <ul>
      <button onClick={() => addTodo('タスク1')}>Add Todo</button>
      {todoList.map((todo) => (
        <li key={todo.id} data-testid={`todo-${todo.id}`}>
          <span
            style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
          >
            {todo.title}
          </span>
          <input
            type="checkbox"
            checked={false}
            onChange={() => completeTodo(todo.id)}
          />
          <button onClick={() => removeTodo(todo.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
};

describe('TodoContextsProvider', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <TodoContextsProvider>
        <TestComponent />
      </TodoContextsProvider>
    );
  });

  afterEach(() => {
    renderResult.unmount();
  });

  describe('Todoの状態に依らないもの', () => {
    it('コンテキスト外でuseTodoを使用するとエラーがスローされる', () => {
      const TestErrorComponent = () => {
        useTodo();
        return <div />;
      };

      expect(() => render(<TestErrorComponent />)).toThrow(
        'useTodo must be used within a TodoProvider'
      );
    });

    it('子ノードが正しくレンダリングされる', () => {
      expect(screen.getByText('Add Todo')).toBeInTheDocument();
    });
  });

  describe('Todoが0件の状態', () => {
    it('addTodoで新しいTodoが追加される', () => {
      const addButton = screen.getByText('Add Todo');
      act(() => {
        addButton.click();
      });

      expect(screen.getByTestId('todo-0')).toBeInTheDocument();
    });
  });

  describe('Todoが1件の状態', () => {
    beforeEach(() => {
      const addButton = screen.getByText('Add Todo');
      act(() => {
        addButton.click();
      });
    });

    it('1件目のisCompletedを切り替える', () => {
      const checkbox = screen.getAllByRole('checkbox')[0];
      const todoTitle = screen
        .getAllByRole('listitem')[0]
        .querySelector('span');
      // 完了にする
      act(() => {
        checkbox.click();
      });

      expect(todoTitle).toHaveStyle(TEXT_DECORATION_LINE_THROUGH);

      // 未完了にする
      act(() => {
        checkbox.click();
      });

      expect(todoTitle).not.toHaveStyle(TEXT_DECORATION_LINE_THROUGH);
    });

    it('2件目を追加する', () => {
      const addButton = screen.getByText('Add Todo');
      act(() => {
        addButton.click();
      });

      expect(screen.getByTestId('todo-0')).toBeInTheDocument();
      expect(screen.getByTestId('todo-1')).toBeInTheDocument();
    });

    it('1件目を削除する', () => {
      const deleteButton = screen.getByText('削除');
      act(() => {
        deleteButton.click();
      });

      expect(screen.queryByText('タスク1')).not.toBeInTheDocument();
    });
  });

  describe('Todoが2件の状態', () => {
    beforeEach(() => {
      const addButton = screen.getByText('Add Todo');
      act(() => {
        addButton.click();
      });
      act(() => {
        addButton.click();
      });
    });

    it('2件目のisCompletedを切り替える', () => {
      const checkbox = screen.getAllByRole('checkbox')[1];
      const firstTodoTitle = screen
        .getAllByRole('listitem')[0]
        .querySelector('span');
      const secondTodoTitle = screen
        .getAllByRole('listitem')[1]
        .querySelector('span');
      // 完了にする
      act(() => {
        checkbox.click();
      });

      expect(firstTodoTitle).not.toHaveStyle(TEXT_DECORATION_LINE_THROUGH);
      expect(secondTodoTitle).toHaveStyle(TEXT_DECORATION_LINE_THROUGH);

      // 未完了にする
      act(() => {
        checkbox.click();
      });

      expect(firstTodoTitle).not.toHaveStyle(TEXT_DECORATION_LINE_THROUGH);
      expect(secondTodoTitle).not.toHaveStyle(TEXT_DECORATION_LINE_THROUGH);
    });

    it('3件目を追加する', () => {
      const addButton = screen.getByText('Add Todo');
      act(() => {
        addButton.click();
      });

      expect(screen.queryAllByRole('listitem')).toHaveLength(3);
      expect(screen.getByTestId('todo-0')).toBeInTheDocument();
      expect(screen.getByTestId('todo-1')).toBeInTheDocument();
      expect(screen.getByTestId('todo-2')).toBeInTheDocument();
    });

    it('1件目を削除する', () => {
      const deleteButton = screen.getAllByText('削除')[0];
      act(() => {
        deleteButton.click();
      });

      const listitem = screen.getAllByRole('listitem');
      expect(listitem).toHaveLength(1);
      expect(screen.getByTestId('todo-1')).toBeInTheDocument();
    });

    it('1、2件目を続けて削除する', () => {
      const deleteButtons = screen.getAllByText('削除');
      // 1件目
      act(() => {
        deleteButtons[0].click();
      });
      const listitem = screen.getAllByRole('listitem');
      expect(listitem).toHaveLength(1);
      expect(screen.queryByTestId('todo-0')).not.toBeInTheDocument();
      expect(screen.queryByTestId('todo-1')).toBeInTheDocument();

      // 2件目
      act(() => {
        deleteButtons[1].click();
      });
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      expect(screen.queryByTestId('todo-0')).not.toBeInTheDocument();
      expect(screen.queryByTestId('todo-1')).not.toBeInTheDocument();
    });
  });

  describe('Todoが3件の状態で完了済', () => {
    beforeEach(() => {
      const addButton = screen.getByText('Add Todo');
      act(() => {
        addButton.click();
      });
      act(() => {
        addButton.click();
      });
      act(() => {
        addButton.click();
      });

      const checkboxes = screen.getAllByRole('checkbox');
      const firstCheckbox = checkboxes[0];
      // 完了にする
      act(() => {
        firstCheckbox.click();
      });
      const secondCheckbox = checkboxes[1];
      // 完了にする
      act(() => {
        secondCheckbox.click();
      });
      const thirdCheckbox = checkboxes[2];
      // 完了にする
      act(() => {
        thirdCheckbox.click();
      });
    });

    it('3件を削除する', () => {
      // 2、1、3件目と削除していく
      const deleteButtons = screen.getAllByText('削除');
      // 2件目
      act(() => {
        deleteButtons[1].click();
      });
      expect(screen.queryAllByRole('listitem')).toHaveLength(2);
      expect(screen.queryByTestId('todo-0')).toBeInTheDocument();
      expect(screen.queryByTestId('todo-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('todo-2')).toBeInTheDocument();
      // 1件目
      act(() => {
        deleteButtons[0].click();
      });
      expect(screen.queryAllByRole('listitem')).toHaveLength(1);
      expect(screen.queryByTestId('todo-0')).not.toBeInTheDocument();
      expect(screen.queryByTestId('todo-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('todo-2')).toBeInTheDocument();
      // 3件目
      act(() => {
        deleteButtons[2].click();
      });
      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
      expect(screen.queryByTestId('todo-0')).not.toBeInTheDocument();
      expect(screen.queryByTestId('todo-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('todo-2')).not.toBeInTheDocument();
    });
  });
});
