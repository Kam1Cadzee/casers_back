import axios from "axios";
import { config } from "./config";
import { Status } from "./status";

const instance = axios.create({
  baseURL: config.API
});

const getTransports = async (status: Status[]) => {
  try {
    const res = await instance.get("/transports?collision=true", {
      params: {
        status
      }
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    throw e;
  }
};

const getTransport = async (id: string) => {
  try {
    const res = await instance.get("/transports/" + id);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    throw e;
  }
};

const addTransport = async (data: any) => {
  try {
    const res = await instance.post("/transports", data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const deleteTransport = async (id: string) => {
  try {
    const res = await instance.delete("/transports/" + id);
  } catch (e) {
    throw e;
  }
};

const deleteTransports = async () => {
  try {
    const res = await instance.delete("/transports");
  } catch (e) {
    throw e;
  }
};

const solveTransports = async (data: any) => {
  try {
    const res = await instance.post("/transports/solve", data);
  } catch (e) {
    throw e;
  }
};

export default {
  getTransports,
  addTransport,
  deleteTransport,
  getTransport,
  deleteTransports,
  solveTransports
};
