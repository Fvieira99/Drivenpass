import app from "../src/app/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import * as userFactory from "./factories/userFactory.js";
import * as safenoteFactory from "./factories/safenoteFactory.js";

const SALT = 10;

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE users CASCADE`;
});

describe("User Tests", () => {
  it("given email and password return code 201", async () => {
    //SETUP
    const login = userFactory.login();
    const response = await supertest(app).post("/signup").send(login);
    expect(response.statusCode).toBe(201);

    const userCreated = await prisma.user.findFirst({
      where: { email: login.email }
    });

    expect(userCreated).not.toBeNull();
  });

  it("given correct email and password return token", async () => {
    //SETUP
    const login = userFactory.login();
    await userFactory.createUser(login);

    const createdUser = await prisma.user.findFirst({
      where: { email: login.email }
    });
    expect(createdUser).not.toBeNull();

    const response = await supertest(app).post("/signin").send(login);
    const { token } = response.body;
    console.log(token);
    expect(token).not.toBeNull();
    expect(response.statusCode).toBe(200);
  });

  it("given incorrect password return code 401", async () => {
    //SETUP
    const login = userFactory.login();
    await userFactory.createUser(login);

    const response = await supertest(app)
      .post("/signin")
      .send({ ...login, password: "qualquerpassword" });
    expect(response.body.token).toBeUndefined();
    expect(response.statusCode).toBe(401);
  });
});

describe("Safenote Test Suit", () => {
  it("given safenote info return code 201", async () => {
    const login = userFactory.login();
    const user = await userFactory.createUser(login);

    const response = await supertest(app).post("/signin").send(login);
    const { token } = response.body;

    const safenote = safenoteFactory.safenoteData();
    const safenoteResponse = await supertest(app)
      .post("/safenotes")
      .send(safenote)
      .set("authorization", `Bearer ${token}`);
    expect(safenoteResponse.statusCode).toBe(201);
  });
});

afterAll(() => prisma.$disconnect());
