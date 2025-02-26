import Input from '@/components/atoms/Input';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  let renderResult: RenderResult;
  let handleClick: jest.Mock;
  const user = userEvent.setup();
  const value: string = 'テスト';

  beforeEach(() => {
    handleClick = jest.fn();
    renderResult = render(<Input value={value} onChange={handleClick} />);
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it('placeholderがTodoを入力であること', () => {
    expect(screen.getByPlaceholderText('Todoを入力')).toBeInTheDocument();
  });

  it('valueがvalue引数で受け取った値であること', () => {
    expect(screen.getByRole('textbox')).toHaveValue(value);
  });

  it('値を変更するとonChangeが呼ばれる', async () => {
    const typedValue = '1';
    await user.type(screen.getByRole('textbox'), typedValue);
    // 値の変更はonChangeで行うためTodoFormで確認する
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('値の変更に応じてonChangeが呼ばれる', async () => {
    const textbox = screen.getByRole('textbox');
    const firstChange = '1回目';
    await user.type(textbox, firstChange);
    expect(handleClick).toHaveBeenCalledTimes(3);
    const secondChange = '2回目';
    await user.type(textbox, secondChange);
    expect(handleClick).toHaveBeenCalledTimes(6);
    await user.clear(textbox);
    expect(handleClick).toHaveBeenCalledTimes(7);
    const thirdChange = '3回目です。';
    await user.type(textbox, thirdChange);
    expect(handleClick).toHaveBeenCalledTimes(13);
  });
});
