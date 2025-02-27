import TodoItem from '@/components/molecules/TodoItem';
import TodoContextsProvider from '@/contexts/TodoContexts';
import { Todo } from '@/types/todo';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

const TEXT_DECORATION_LINE_THROUGH = 'text-decoration: line-through;';

describe('TodoItem', () => {
  let renderResult: RenderResult;
  let handleCompleteOnChange: jest.Mock;
  let handleRemoveOnChange: jest.Mock;
  const user: UserEvent = userEvent.setup();

  describe('未完了のTodoの場合', () => {
    beforeEach(() => {
      const todo: Todo = {
        id: 1,
        title: '未完了のTodo',
        isCompleted: false
      };
      handleCompleteOnChange = jest.fn();
      handleRemoveOnChange = jest.fn();

      renderResult = render(
        <TodoContextsProvider>
          <TodoItem
            todo={todo}
            completeOnChange={handleCompleteOnChange}
            removeOnChange={handleRemoveOnChange}
          />
        </TodoContextsProvider>
      );
    });

    afterEach(() => {
      renderResult.unmount();
    });

    it('チェックボックスがfalseであること', () => {
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('タイトルにtextDecaration: line-throughが設定されていないこと', () => {
      screen.debug();
      console.log(screen.getByText('未完了のTodo'));
      expect(screen.getByText('未完了のTodo')).not.toHaveStyle(
        TEXT_DECORATION_LINE_THROUGH
      );
    });

    it('チェックボックスを押下するとcompleteOnChangeが呼ばれる', async () => {
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      expect(handleCompleteOnChange).toHaveBeenCalled();
    });

    it('ボタンを押下するとremoveOnChangeが呼ばれる', async () => {
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleRemoveOnChange).toHaveBeenCalled();
    });
  });

  describe('完了のTodoの場合', () => {
    beforeEach(() => {
      const todo: Todo = {
        id: 1,
        title: '完了のTodo',
        isCompleted: true
      };
      handleCompleteOnChange = jest.fn();
      handleRemoveOnChange = jest.fn();

      renderResult = render(
        <TodoContextsProvider>
          <TodoItem
            todo={todo}
            completeOnChange={handleCompleteOnChange}
            removeOnChange={handleRemoveOnChange}
          />
        </TodoContextsProvider>
      );
    });

    afterEach(() => {
      renderResult.unmount();
    });

    it('チェックボックスがtrueであること', () => {
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('タイトルにtextDecaration: line-throughが設定されていること', () => {
      screen.debug();
      console.log(screen.getByText('完了のTodo'));
      expect(screen.getByText('完了のTodo')).toHaveStyle(
        TEXT_DECORATION_LINE_THROUGH
      );
    });

    it('チェックボックスを押下するとcompleteOnChangeが呼ばれる', async () => {
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      expect(handleCompleteOnChange).toHaveBeenCalled();
    });

    it('ボタンを押下するとremoveOnChangeが呼ばれる', async () => {
      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleRemoveOnChange).toHaveBeenCalled();
    });
  });

  describe('Todoの状態によらない場合', () => {
    beforeEach(() => {
      const todo: Todo = {
        id: 1,
        title: '未完了のTodo',
        isCompleted: false
      };
      handleCompleteOnChange = jest.fn();
      handleRemoveOnChange = jest.fn();

      renderResult = render(
        <TodoContextsProvider>
          <TodoItem
            todo={todo}
            completeOnChange={handleCompleteOnChange}
            removeOnChange={handleRemoveOnChange}
          />
        </TodoContextsProvider>
      );
    });

    afterEach(() => {
      renderResult.unmount();
    });

    it('ボタンのlabelが削除であること', () => {
      expect(screen.getByRole('button')).toHaveTextContent('削除');
    });
  });
});
