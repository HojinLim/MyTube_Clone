module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 5000),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '357d85ebfb1c1bf1f33afc8eff30aaa1'),
    },
  },
});
