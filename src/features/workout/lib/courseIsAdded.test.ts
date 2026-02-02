import { courseIsAdded } from './courseIsAdded';

describe('courseIsAdded', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns false when no user in localStorage', () => {
    expect(courseIsAdded('abc')).toBe(false);
  });

  it('returns true when course is in selectedCourses', () => {
    const userSelected = ['abc'];
    expect(courseIsAdded('abc', userSelected)).toBe(true);
  });

  it('returns false when course is not in selectedCourses', () => {
    const userSelected = ['xyz'];
    expect(courseIsAdded('abc', userSelected)).toBe(false);
  });
});