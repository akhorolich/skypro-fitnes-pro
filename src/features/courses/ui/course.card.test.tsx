import { render, screen, fireEvent } from '@testing-library/react';
import { CourseCard } from './course.card';
import { AuthProvider } from "@/app/providers/authProvider";

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

jest.mock('@/shared/lib/notification', () => ({
  notifyError: jest.fn(),
  notifySuccess: jest.fn(),
  notifyWarning: jest.fn(),
}));

const course = {
  _id: 'c1',
  nameRU: 'Test Course',
  order: 1,
  durationInDays: 5,
  dailyDurationInMinutes: 10,
  difficulty: 'easy',
  fitting: [],
  directions: [],
};

describe('CourseCard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows remove icon when course is added', () => {
    const user = { email: 'a@a', selectedCourses: ['c1'], courseProgress: [] };
    localStorage.setItem('user', JSON.stringify(user));

    const { container } = render(
      <AuthProvider>
        <CourseCard course={course as any} />
      </AuthProvider>,
    );

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute('src')).toContain('icon-remove-circle');
  });

  it('clicking add when not auth shows warning', () => {
    const { container } = render(
      <AuthProvider>
        <CourseCard course={course as any} />
      </AuthProvider>,
    );

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();

    fireEvent.click(img!.parentElement!);

    const { notifyWarning } = require('@/shared/lib/notification');
    expect(notifyWarning).toHaveBeenCalled();
  });
});