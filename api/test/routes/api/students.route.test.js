const request = require("supertest");
const app = require("../../../src/app");
const qs = require("qs");

describe("API: GET /api/students/", () => {
  async function fetchStudents() {
    return await request(app).get("/api/students");
  }

  test("It should response the GET method", async () => {
    const { statusCode } = await fetchStudents();
    expect(statusCode).toBe(200);
  });

  test("response.body is array and has 403 elements in it", async () => {
    const { body } = await fetchStudents();
    expect(Array.isArray(body)).toEqual(true);
    Array.isArray(body) && expect(body.length).toEqual(403);
  });
});

describe("API: GET /api/students with query params", () => {
  async function fetchStudentsWithQuery(query) {
    const queryString = qs.stringify(query);
    let path = "/api/students";
    if (Object.keys(query).length > 0) path += `?${queryString}`;
    return await request(app).get(path);
  }

  describe("With valid query", () => {
    const queries = [
      { name: "Harry Potter" },
      { name: "Hermione Granger" },
      { name: ["Harry Potter", "Hermione Granger"] },
    ];

    test.each(queries)("string query", async ({ name }) => {
      const { statusCode } = await fetchStudentsWithQuery({ name });
      expect(statusCode).toBe(200);
    });

    test.each(queries)(
      "response.body is array and has at least one element in it",
      async ({ name }) => {
        const { body } = await fetchStudentsWithQuery({ name });
        expect(Array.isArray(body)).toEqual(true);
        Array.isArray(body) && expect(body.length).toBeGreaterThanOrEqual(1);
      }
    );
  });

  describe("With invalid query", () => {
    const queries = [
      { name: "" },
      { foo: "Hermione Granger" },
      { bar: ["Harry Potter", "Hermione Granger"] },
    ];

    test.each(queries)("%o string query", async (query) => {
      const { statusCode } = await fetchStudentsWithQuery(query);
      expect(statusCode).toBe(200);
    });

    test.each(queries)("%o is array and is empty", async (query) => {
      const { body } = await fetchStudentsWithQuery(query);
      expect(Array.isArray(body)).toEqual(true);
      Array.isArray(body) && expect(body.length).toEqual(0);
    });
  });
});

describe("API: GET /api/students/random", () => {
  async function fetchRandomStudent() {
    return await request(app).get("/api/students/random");
  }

  test("It should response the GET method", async () => {
    const { statusCode } = await fetchRandomStudent();
    expect(statusCode).toBe(200);
  });

  test("response.body has properties `name` and `house`", async () => {
    const { body } = await fetchRandomStudent();
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("house");
  });
});
