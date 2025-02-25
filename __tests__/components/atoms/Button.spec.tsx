import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import Button from '../../../src/components/atoms/Button';

const label = 'Button';

describe('Button', () => {
  let renderResult: RenderResult;
  let handleClick: jest.Mock;

  beforeEach(() => {
    handleClick = jest.fn();
    renderResult = render(
      <Button onClick={handleClick} label={label}></Button>
    );
  });

  afterEach(() => {
    renderResult.unmount();
  });

  it('label引数の値でボタンラベルが表示される', () => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('ボタンを押下した時にonClickが呼ばれる', () => {
    fireEvent.click(screen.getByText(label));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('ボタンを2回押下した時にonClickがそれぞれ1回呼ばれる', () => {
    fireEvent.click(screen.getByText(label));
    expect(handleClick).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText(label));
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
