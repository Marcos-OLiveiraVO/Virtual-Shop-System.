let request;
let app;

before(async () => {
  app = await setupApp();
  request = supertest(app);
});

after(async () => await app.database.connection.close());
