import dayjs from "dayjs";
import * as cardRepository from "../repositories/cardRepository.js";
import * as serviceUtil from "../utils/serviceUtil.js";
import { Card } from "@prisma/client";

export async function createCard(data: cardRepository.CreateCardData) {
  const existingTitle = await cardRepository.findByTitleAndUserId(
    data.title,
    data.userId
  );
  if (existingTitle) {
    throw { type: "conflict", message: "Title is already being used" };
  }
  if (isExpiredCard(data.expirationDate)) {
    throw { type: "bad_request", message: "You cannot save expired cards" };
  }
  const formatedCardNumber = formatCardNumber(data.cardNumber);
  const encryptedCVV = serviceUtil.encryptData(data.securityCode);
  const encryptedPassword = serviceUtil.encryptData(data.password);

  const createCardData: cardRepository.CreateCardData = {
    ...data,
    cardNumber: formatedCardNumber,
    securityCode: encryptedCVV,
    password: encryptedPassword
  };

  await cardRepository.createCard(createCardData);
}

export async function getAllCards(userId: number) {
  const cards = await cardRepository.findAllByUserId(userId);
  const decryptedCards = decryptMultipleCardsData(cards);
  return decryptedCards;
}

export async function getOneCard(cardId: number, userId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw {
      type: "not_found",
      message: "Card does not exist"
    };
  }

  if (card.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to see this card."
    };
  }
  const decryptedPassword = serviceUtil.decryptData(card.password);
  const decryptedCVV = serviceUtil.decryptData(card.securityCode);

  return { ...card, password: decryptedPassword, securityCode: decryptedCVV };
}

export async function deleteCard(cardId: number, userId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw {
      type: "not_found",
      message: "Card does not exist"
    };
  }
  if (card.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to delete this card."
    };
  }
  await cardRepository.deleteCard(cardId);
}

function formatCardNumber(cardNumber: string) {
  if (cardNumber.includes("-")) {
    const formatedCardNumber = cardNumber.split("-").join(" ");
    return formatedCardNumber;
  } else if (!cardNumber.includes(" ")) {
    const cardNumberArr = cardNumber.split("");
    for (let i = 4; i <= 14; i += 5) {
      cardNumberArr.splice(i, 0, " ");
    }
    return cardNumberArr.join("");
  }
  return cardNumber;
}

function decryptMultipleCardsData(cards: Card[]) {
  for (let card of cards) {
    const password = card.password;
    const cvv = card.securityCode;
    card.password = serviceUtil.decryptData(password);
    card.securityCode = serviceUtil.decryptData(cvv);
  }
  return cards;
}

function isExpiredCard(expirationDate: string) {
  const currentDate = dayjs().locale("pt-br").format("MM/YY");
  console.log(currentDate);
  const isExpired = dayjs(currentDate).isAfter(expirationDate);
  return isExpired;
}
