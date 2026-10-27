import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(new Product("123", "Product Name", 100))),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Updated Product Name",
      price: 150,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: "123",
      name: "Updated Product Name",
      price: 150,
    });
  });

  it("should throw error when product not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "999",
      name: "Updated Product Name",
      price: 150,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });

  it("should throw error when name is empty", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "",
      price: 150,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Name is required");
  });

  it("should throw error when price is negative", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Updated Product Name",
      price: -50,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Price must be greater than zero");
  });

  it("should call repository find and update methods", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "123",
      name: "Updated Product Name",
      price: 150,
    };

    await usecase.execute(input);

    expect(productRepository.find).toHaveBeenCalledWith("123");
    expect(productRepository.update).toHaveBeenCalled();
  });
});
