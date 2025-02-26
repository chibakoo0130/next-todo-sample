import TodoForm from '@/components/molecules/TodoForm';
import TodoContextsProvider from '@/contexts/TodoContexts';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

describe('TodoForm', () => {
  let renderResult: RenderResult;
  const user: UserEvent = userEvent.setup();

  beforeEach(() => {
    renderResult = render(
      <TodoContextsProvider>
        <TodoForm />
      </TodoContextsProvider>
    );
  });

  afterEach(() => {
    renderResult.unmount();
  });

  describe('初期状態', () => {
    it('テキストボックスのvalueが空文字であること', () => {
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('ボタンのlabelが追加であること', () => {
      expect(screen.getByRole('button')).toHaveTextContent('追加');
    });

    it('テキストボックスに値が入力できること', async () => {
      const textbox = screen.getByRole('textbox');
      const input = 'test!"#$%&0';
      await user.type(textbox, input);
      expect(textbox).toHaveValue(input);
    });
  });

  describe('値を入力した状態', () => {
    it('todoを追加する', async () => {
      const textbox = screen.getByRole('textbox');
      await user.type(textbox, 'todo1');
      expect(textbox).toHaveValue('todo1');
      const button = screen.getByRole('button');
      await user.click(button);
      expect(textbox).toHaveValue('');
    });

    it('todoを2回追加する', async () => {
      // 1回目
      const textbox = screen.getByRole('textbox');
      await user.type(textbox, 'todo1');
      expect(textbox).toHaveValue('todo1');
      const button = screen.getByRole('button');
      await user.click(button);
      expect(textbox).toHaveValue('');
      // 2回目
      await user.type(textbox, 'todo2');
      expect(textbox).toHaveValue('todo2');
      await user.click(button);
      expect(textbox).toHaveValue('');
    });
  });
});
