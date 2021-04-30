export const logoutUser = () => {
  if (localStorage.getItem('userToken')) {
    localStorage.removeItem('userToken');
    window.location.href = '/';
    // <Redirect to='/' />
  }
};
