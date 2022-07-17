import * as serviceUtil from "../utils/serviceUtil.js";
import * as wifiRepository from "../repositories/wifiRepository.js";
import { Wifi } from "@prisma/client";

export async function createWifi(data: wifiRepository.CreateWifiData) {
  const encryptedPassword = serviceUtil.encryptData(data.password);
  await wifiRepository.createWifi({ ...data, password: encryptedPassword });
}

export async function getAllWifis(userId: number) {
  const wifis = await wifiRepository.findAllByUserId(userId);
  const decryptedWifis = decryptMultipleWifis(wifis);
  return decryptedWifis;
}

export async function getOneWifi(wifiId: number, userId: number) {
  const wifi = await wifiRepository.findById(wifiId);
  if (!wifi) {
    throw { type: "not_found", message: "Wifi does not exist." };
  }
  if (wifi.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to see this wifi"
    };
  }
  const decryptedPassword = serviceUtil.decryptData(wifi.password);
  return { ...wifi, password: decryptedPassword };
}

export async function deleteWifi(wifiId: number, userId: number) {
  const wifi = await wifiRepository.findById(wifiId);
  if (!wifi) {
    throw { type: "not_found", message: "Wifi does not exist." };
  }
  if (wifi.userId !== userId) {
    throw {
      type: "unauthorized",
      message: "You are not allowed to delete this wifi"
    };
  }

  await wifiRepository.deleteWifi(wifiId);
}

function decryptMultipleWifis(wifis: Wifi[]) {
  for (let wifi of wifis) {
    const encryptedPassword = wifi.password;
    wifi.password = serviceUtil.decryptData(encryptedPassword);
  }
  return wifis;
}
