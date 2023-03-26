import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('Render Home Component', () => {
  const { container } = render(<Home />);
  it('renders a URL text box', () => {
    const textbox = screen.getByRole('textbox');

    expect(textbox).toBeInTheDocument();
  });
});
