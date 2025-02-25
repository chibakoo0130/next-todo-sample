import {
  RenderResult,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  let renderResult: RenderResult;
  let handleChenge: jest.Mock;

  describe('checkedがfalseの時', () => {
    beforeEach(() => {
      handleChenge = jest.fn();
      renderResult = render(
        <Checkbox checked={false} onChange={handleChenge} />
      );
    });

    afterEach(() => {
      renderResult.unmount();
    });

    it('チェックされていない状態で表示される', () => {
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('チェックボックスを押下するとonChangeが呼ばれる', async () => {
      const checkbox: HTMLInputElement = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChenge).toHaveBeenCalledTimes(1);
      // checked属性はonChangeに渡すメソッドで操作するのでここでは変更されることを確認しない
    });
  });

  describe('checkedがtrueの時', () => {
    beforeEach(() => {
      handleChenge = jest.fn();
      renderResult = render(
        <Checkbox checked={true} onChange={handleChenge} />
      );
    });

    afterEach(() => {
      renderResult.unmount();
    });

    it('チェックされている状態で表示される', () => {
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('チェックボックスを押下するとonChangeが呼ばれる', async () => {
      const checkbox: HTMLInputElement = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(handleChenge).toHaveBeenCalledTimes(1);
      // checked属性はonChangeに渡すメソッドで操作するのでここでは変更されることを確認しない
    });
  });
});
