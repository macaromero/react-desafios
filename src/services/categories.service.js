import categoriesJson from '../json/categories.json';

const getCategories = () => {
    return new Promise((resolve, reject) => {   
        resolve(categoriesJson);
    });
};

export default getCategories;