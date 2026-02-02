import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '.';
import { AuthProvider } from '@/shared/lib/auth';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows login button when not authenticated', () => {
    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  it('shows user email when authenticated and allows logout', async () => {
    const user = { email: 'test@mail.com', selectedCourses: [], courseProgress: [] };
    localStorage.setItem('user', JSON.stringify(user));

    render(
      <AuthProvider>
        <Header />
      </AuthProvider>
    );

    // user button should be rendered
    expect(await screen.findByRole('button', { name: /test@mail.com/ })).toBeInTheDocument();

    // open menu
    fireEvent.click(screen.getByRole('button', { name: /test@mail.com/ }));

    // click logout
    const logoutBtn = await screen.findByText(/выйти/i);
    fireEvent.click(logoutBtn);

    // after logout, login button should be visible again
    expect(await screen.findByRole('button', { name: /войти/i })).toBeInTheDocument();
  });
});