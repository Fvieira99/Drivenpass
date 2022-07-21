import app from "../src/app/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import * as userFactory from "./factories/userFactory.js";

const SALT = 10;

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE users CASCADE`;
});

describe("User Tests", () => {
  it("Testing signUp", async () => {
    //SETUP
    const login = userFactory.login();
    const response = await supertest(app).post("/signup").send(login);
    expect(response.statusCode).toBe(201);

    const userCreated = await prisma.user.findFirst({
      where: { email: login.email }
    });

    expect(userCreated).not.toBeNull();
  });

  it("Testing singIn", async () => {
    //SETUP
    const login = userFactory.login();
    await userFactory.createUser(login);

    const createdUser = await prisma.user.findFirst({
      where: { email: login.email }
    });
    expect(createdUser).not.toBeNull();

    const response = await supertest(app).post("/signin").send(login);
    const { token } = response.body;
    expect(token).not.toBeNull();
    expect(response.statusCode).toBe(200);
  });
});

// describe("Testing Safenote Service", () => {
//   it("Get safenotes", async () => {
//     const login = userFactory.createUser();
//     await prisma.user.create{}

//   });
// });

afterAll(() => prisma.$disconnect());
