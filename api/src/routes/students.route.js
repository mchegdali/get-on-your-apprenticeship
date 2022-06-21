const express = require("express");
const { default: axios, AxiosError } = require("axios");
const { randomInt } = require("crypto");
const createError = require("http-errors");
const intersection = require("lodash.intersection");

const studentsRouter = express.Router();

const API_URL = "http://hp-api.herokuapp.com/api/characters";

const characters = [];

// check if characters are already cached or not
studentsRouter.use(async (req, res, next) => {
  try {
    if (characters.length === 0) {
      const { data } = await axios(API_URL);
      data.forEach((student) => {
        characters.push({ ...student, house: student.house || "None" });
      });
    }
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      next(createError(error.response.status));
    } else {
      next(createError(400));
    }
  }
});

// simple app here so controllers are integrated in the routes
studentsRouter.get("/", async (req, res) => {
  try {
    const queryKeys = Object.keys(req.query);

    let result = [];

    if (queryKeys.length === 0) return res.status(200).json(characters);

    for (const character of characters) {
      const characterKeys = Object.keys(character);
      const validKeys = intersection(characterKeys, queryKeys);

      for (const key of validKeys) {
        if (
          typeof req.query[key] === "string" &&
          req.query[key].length > 0 &&
          character[key].toLowerCase().includes(req.query[key].toLowerCase())
        ) {
          result.push(character);
        } else if (Array.isArray(req.query[key]) && req.query[key].length > 0) {
          req.query[key].forEach((queryValue) => {
            if (character[key].toLowerCase().includes(queryValue.toLowerCase()))
              result.push(character);
          });
        }
      }
    }

    return res.status(result.length > 0 ? 200 : 400).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

studentsRouter.get("/random", async (req, res) => {
  try {
    const dataLen = characters.length;
    const randomIndex = randomInt(0, dataLen);
    return res.status(200).json(characters[randomIndex]);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = studentsRouter;
