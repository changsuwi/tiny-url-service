import { fireEvent, render, screen } from '@testing-library/react';
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
  beforeEach(() => {
    render(<Home />);
  });

  test('When user does not type anything in textbox, the button is disabled', async () => {
    const button = screen.getByRole<HTMLButtonElement>('button');
    expect(button.disabled).toBe(true);
  });
});

describe('When user type url and then click the button', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('When url is valid, user should see "Generating..." in result div first. Then they can see the tiny URL.', async () => {
    const server = setupServer(
      rest.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/url`,
        (req, res, ctx) => {
          return res(ctx.json({ key: 'abc' }));
        }
      )
    );
    server.listen();
    const textbox = screen.getByRole<HTMLInputElement>('textbox');
    fireEvent.change(textbox, { target: { value: 'https://hackmd.io' } });
    const button = screen.getByRole<HTMLButtonElement>('button');
    fireEvent.click(button);
    await screen.findByText('Generating...');
    await screen.findByText(`${process.env.NEXT_PUBLIC_BASE_URL}/abc`);
    server.resetHandlers();
    server.close();
  });

  test('When url is invalid, user should see "Generating..." in result div first. Then they can see the error message', async () => {
    const textbox = screen.getByRole<HTMLInputElement>('textbox');
    fireEvent.change(textbox, { target: { value: 'hackmd.io' } });
    const button = screen.getByRole<HTMLButtonElement>('button');
    fireEvent.click(button);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'error').mockImplementation(() => {});
    await screen.findByText('Generating...');
    await screen.findByText(`Generate tiny url fail`);
  });
});
