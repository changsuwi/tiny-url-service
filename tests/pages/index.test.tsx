import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Home from '@/pages/index';

describe('Test textbox', () => {
  beforeEach(() => {
    render(<Home />);
  });

  const expectContent = 'hackmd.io';
  test(`When trigger change event, ${expectContent} should be display`, () => {
    const textbox = screen.getByRole<HTMLInputElement>('textbox');
    fireEvent.change(textbox, { target: { value: expectContent } });
    expect(textbox.value).toBe(expectContent);
  });
});

describe('Test button', () => {
  const server = setupServer(
    rest.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}:3000/api/url`,
      (req, res, ctx) => {
        return res(ctx.json({ key: 'abc' }));
      }
    )
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(<Home />);
  });

  test('When user click the button', async () => {
    const button = screen.getByRole<HTMLButtonElement>('button');
    fireEvent.click(button);
    await waitFor(() => screen.getByTestId<HTMLParagraphElement>('result'));

    expect(screen.getByTestId<HTMLParagraphElement>('result').innerHTML).toBe(
      `${process.env.NEXT_PUBLIC_BASE_URL}/abc`
    );
  });
});
