const express = require("express");
const { default: axios } = require("axios");
const { randomInt } = require("crypto");

const router = express.Router();

const characters = [];

router.get("/students", async (req, res) => {
  try {
    const queryEntries = Object.entries(req.query);
    let response = [];

    if (characters.length === 0) {
      const { data } = await axios(
        "http://hp-api.herokuapp.com/api/characters"
      );
      data.forEach((student) => {
        characters.push({ ...student, house: student.house || "None" });
      });
    }

    if (queryEntries.length > 0) {
      for (const character of characters) {
        for (const [name, value] of queryEntries) {
          if (
            (typeof value === "string" &&
              (character[name] === value ||
                character[name].toLowerCase().includes(value.toLowerCase()))) ||
            (Array.isArray(value) && value.includes(character[name]))
          ) {
            response.push(character);
          }
        }
      }
    } else response = characters;

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

router.get("/randomstudent", async (req, res) => {
  try {
    if (characters.length === 0) {
      const { data } = await axios(
        "http://hp-api.herokuapp.com/api/characters"
      );
      data.forEach((student) => characters.push(student));
    }

    const dataLen = characters.length;
    const randomIndex = randomInt(0, dataLen);
    return res.status(200).json(characters[randomIndex]);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
