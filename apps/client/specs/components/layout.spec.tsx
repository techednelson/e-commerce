import { render } from '@testing-library/react';
import Layout from '../../components/common/layout';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Layout />);
    expect(baseElement).toBeTruthy();
  });
});
