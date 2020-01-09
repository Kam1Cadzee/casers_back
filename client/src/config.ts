export const config = {
  API: process.env.NODE_ENV === 'production' ?
    'https://warm-wildwood-13328.herokuapp.com/'
    : 'http://localhost:3000/'
};
