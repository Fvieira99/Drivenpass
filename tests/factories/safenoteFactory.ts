import { faker } from "@faker-js/faker";

export function safenoteData() {
  return {
    title: faker.internet.domainWord(),
    note: faker.lorem.sentences(4)
  };
}

interface CreateSafenoteData {
  title: string;
  note: string;
  userId: number;
}

export async function createSafenote(createSafenoteData: CreateSafenoteData) {}
