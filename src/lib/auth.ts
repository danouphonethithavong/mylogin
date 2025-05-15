// 📁 src/lib/auth.ts
export const login = (email: string, password: string): boolean => {
  if (email === 'lex@gmail.com' && password === '12121212') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify({ email }));
    }
    return true;
  }
  return false;
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getUser();
};
