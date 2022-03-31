import productsJson from '../json products/products.json';

const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(productsJson);
        }, 2000)
    });
};

const getProductById = (id) => {
    const result = productsJson.find(product => product.id === id)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(result);
        }, 2000)
    });
};

export {getProducts, getProductById};