import productsJson from '../json/products.json';

const getProducts = () => {
    return new Promise((resolve, reject) => {   
        resolve(productsJson);
    });
};

const getProductById = (id) => {
    const result = productsJson.find(product => product.id === id)
    return new Promise((resolve, reject) => {
        resolve(result);
    });
};

export {getProducts, getProductById};