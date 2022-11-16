const server = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 8080),
  app: {
    keys: env.array("APP_KEYS"),
  },
});

module.exports = server;
