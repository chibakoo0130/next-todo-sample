import TodoForm from '@/components/molecules/TodoForm';
import TodoList from '@/components/organisms/TodoList';
import TodoContextsProvider from '@/contexts/TodoContexts';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

describe('TodoList', () => {
  let renderResult: RenderResult;

  describe('Todoが0件の場合', () => {
    beforeEach(() => {
      renderResult = render(
        <TodoContextsProvider>
          <TodoList />
        </TodoContextsProvider>
      );
    });

    afterEach(() => {
      renderResult.unmount();
    });

    it('TodoItemが表示されないこと', () => {
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });
  });

  describe('Todoが1件の場合', () => {
    beforeEach(async () => {
      const user: UserEvent = userEvent.setup();
      renderResult = render(
        <TodoContextsProvider>
          <TodoForm />
          <TodoList />
        </TodoContextsProvider>
      );
      const textbox = screen.getByRole('textbox');
      await user.type(textbox, '買い物に行く');
      const button = screen.getByRole('button');
      await user.click(button);
    });

    afterEach(() => {
      renderResult.unmount();
    });

    it('TodoItemが1件表示されること', async () => {
      expect(screen.queryAllByRole('listitem')).toHaveLength(1);
    });
  });

  describe('Todoが2件の場合', () => {
    beforeEach(async () => {
      const user: UserEvent = userEvent.setup();
      renderResult = render(
        <TodoContextsProvider>
          <TodoForm />
          <TodoList />
        </TodoContextsProvider>
      );
      const textbox = screen.getByRole('textbox');
      await user.type(textbox, '買い物に行く');
      const button = screen.getByRole('button');
      await user.click(button);
      await user.type(textbox, '夕ご飯を作る');
      await user.click(button);
    });

    afterEach(() => {
      renderResult.unmount();
    });

    it('TodoItemが2件表示されること', async () => {
      expect(screen.queryAllByRole('listitem')).toHaveLength(2);
    });
  });
});
