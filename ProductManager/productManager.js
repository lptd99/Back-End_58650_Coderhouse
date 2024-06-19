const debug = false;
const d = (text) => {
  if (debug) {
    console.log("[DEBUG]:", text);
  }
};

class ProductManager {
  #lastProductId = 0;
  #products = [];
  constructor() {
    this.products = [];
  }

  validateTitle(title) {
    const result = title && title !== null && title.trim().length > 0;
    d(`Validating Title "${title}" ... ${result ? "OK" : "ERROR"}`);
    return result;
  }

  validateDescription(description) {
    const result =
      description && description !== null && description.trim().length > 0;
    d(`Validating Description "${description}" ... ${result ? "OK" : "ERROR"}`);
    return result;
  }

  validatePrice(price) {
    const result = price && price !== null && price >= 0;
    d(`Validating Price ${price} ... ${result ? "OK" : "ERROR"}`);
    return result;
  }

  validateThumbnail(thumbnail) {
    const result =
      thumbnail && thumbnail !== null && thumbnail.trim().length > 0;
    d(`Validating Thumbnail "${thumbnail}" ... ${result ? "OK" : "ERROR"}`);
    return result;
  }

  validateStock(stock) {
    const result = stock && stock !== null && stock >= 0;
    d(`Validating Stock ${stock} ... ${result ? "OK" : "ERROR"}`);
    return result;
  }

  validateCode(code) {
    const result =
      code &&
      code !== null &&
      this.products.find((product) => product.code === code) === undefined;
    d(`Validating Code "${code}" ... ${result ? "OK" : "ERROR"}`);
    return result;
  }

  validateProduct(product) {
    const result =
      this.validateTitle(product.title) &&
      this.validateDescription(product.description) &&
      this.validatePrice(product.price) &&
      this.validateThumbnail(product.thumbnail) &&
      this.validateStock(product.stock) &&
      this.validateCode(product.code);
    d(`Validating Product of id ${product.id} ... ${result ? "OK" : "ERROR"}`);
    return result;
  }

  addProduct(title, description, price, thumbnail, stock, code) {
    const id = this.#lastProductId + 1;
    const product = {
      id: id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      stock: stock,
      code: code,
    };
    d(`Adding product:
      id: ${id},
      title: "${title}",
      description: "${description}",
      price: ${price},
      thumbnail: "${thumbnail}",
      stock: ${stock},
      code: '${code}'`);
    if (this.validateProduct(product)) {
      this.products.push(product);
      this.#lastProductId = id;
    } else {
      console.log(
        `Falha na criação do Produto '${title}', exibindo informações:`
      );
      console.log(product);
    }
  }

  updateProduct(code, product) {
    const updateProduct = {
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      stock: product.stock,
      code: code,
    };
    const index = this.products.findIndex((product) => product.code === code);
    this.products[index] = updateProduct;
  }

  removeProductById(id) {
    d(`Removing product with id ${id}`);
    if (this.products.find((product) => product.id === id) === undefined) {
      console.log(`Falha na remoção: nenhum produto encontrado com id ${id}.`);
    } else {
      d("Before removal:");
      d(this.products);
      this.products = this.products.filter((product) => product.id !== id);
      console.log(`Produto com id ${id} removido com sucesso!`);
      d("After removal:");
      d(this.products);
    }
  }

  getProducts() {
    d("Getting all " + this.products.length + " products:");
    d(this.products);
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      d("Getting product with id " + id + ":");
      d(product);
      console.log("Produto com id " + id + " encontrado com sucesso!");
      console.log(product);
      return product;
    } else {
      console.log("Nenhum produto encontrado com id " + id);
      return undefined;
    }
  }
}

const pM = new ProductManager();

console.log("Products: ", pM.getProducts());

pM.addProduct("Produto 1", "Desc 1", 20, "thumb/1", 10, "SKU7198");
pM.addProduct(null, "Desc 2", 347, "thumb/2", 20, "SKU7199");
pM.addProduct("Produto 3", null, 10, "thumb/3", 30, "SKU7200");
pM.addProduct("Produto 4", "Desc 4", null, "thumb/4", 40, "SKU7201");
pM.addProduct("Produto 5", "Desc 5", 10, null, 50, "SKU7202");
console.log("Products: ", pM.getProducts());

pM.addProduct("Produto 6", "Desc 6", 20, "thumb/6", null, "SKU7");
pM.addProduct("Produto 7", "Desc 7", 30, "thumb/7", 70, null);
pM.addProduct("Produto 8", "Desc 8", 40, "thumb/8", 80, "SKU7205");
pM.addProduct(undefined, "Desc 9", 50, "thumb/9", 90, "SKU7206");
pM.addProduct("Produto 10", undefined, 60, "thumb/10", 10, "SKU7207");
pM.addProduct("Produto 11", "Desc 11", undefined, "thumb/11", 11, "SKU7208");
pM.addProduct("Produto 12", "Desc 12", 80, undefined, 12, "SKU7209");
pM.addProduct("Produto 13", "Desc 13", 90, "thumb/13", undefined, "SKU7210");
pM.addProduct("Produto 14", "Desc 14", 10, "thumb/14", 14, undefined);
pM.addProduct("", "Desc 15", 11, "thumb/15", 15, "SKU7212");
pM.addProduct("Produto 16", "", 12, "thumb/16", 16, "SKU7213");
pM.addProduct("Produto 17", "Desc 17", -37, "thumb/17", 17, "SKU7214");
console.log("Products: ", pM.getProducts());

pM.addProduct("Produto 18", "Desc 18", 14, "", 18, "SKU7215");
pM.addProduct("Produto 19", "Desc 19", 1500, "thumb/19", -49, "SKU7216");
pM.addProduct("Produto 20", "Desc 20", 1600, "thumb/20", 200, "");
pM.addProduct("Produto 22", "Desc 22", 1800, "thumb/22", 220, "SKU7219");
pM.addProduct("Produto 23", "Desc 23", 1900, "thumb/23", 230, "SKU7220");
console.log("Products: ", pM.getProducts());

pM.getProductById(2);
pM.getProductById(4);
pM.getProductById(37);
console.log("Products: ", pM.getProducts());
pM.removeProductById(1);
pM.removeProductById(2);
console.log("Products: ", pM.getProducts());
pM.removeProductById(3);
pM.removeProductById(4);
console.log("Products: ", pM.getProducts());
pM.removeProductById(4);

console.log("Products: ", pM.getProducts());
