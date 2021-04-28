export const authenticate = (data: string, next: () => void) => {
  if (typeof window !== undefined) {
    // TO DO: Stringify data once integrated with backend
    localStorage.setItem('userToken', data);
    next();
  }
};

export const isAuthenticated = (): boolean => {
  if (window === undefined) {
    return false;
  }
  if (localStorage.getItem('userToken')) {
    return true;
  } else {
    return false;
  }
};
