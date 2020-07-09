export default {
  jwt: {
    key: process.env.APP_KEY || 'default',
    expiresIn: '1d',
  },
}
