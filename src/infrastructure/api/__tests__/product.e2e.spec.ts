import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 100.50,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100.50);
  });

  it("should not create a product without required fields", async () => {
    const response = await request(app).post("/product").send({
      name: "Product without price",
    });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response1 = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 100.50,
      });
    expect(response1.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 250.75,
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product1 = listResponse.body.products[0];
    expect(product1.name).toBe("Product 1");
    expect(product1.price).toBe(100.50);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(250.75);
  });

  it("should list all products in XML format", async () => {
    const response1 = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 100.50,
      });
    expect(response1.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product 2",
        price: 250.75,
      });
    expect(response2.status).toBe(200);

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product 1</name>`);
    expect(listResponseXML.text).toContain(`<price>100.5</price>`);
    expect(listResponseXML.text).toContain(`<name>Product 2</name>`);
    expect(listResponseXML.text).toContain(`<price>250.75</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
