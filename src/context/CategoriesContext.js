import { createContext, useState } from "react";
import db from '../firebase';
import { collection, getDocs } from "firebase/firestore";

const CategoriesContext = createContext();

const CategoriesProvider = ({children}) => {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const categoriesCollection = collection(db, "categories");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesList = categoriesSnapshot.docs.map(list => {
            let categoria = list.data();
            categoria.id_categoria = list.id;
            return categoria
        })
        return setCategories(categoriesList)
    }

    const setCat = (cat_actual, categories) => {
        if (cat_actual !== null) {
            categories.map(c => {
                if (parseInt(c.id_categoria) === cat_actual) {
                    return setCategory(c.categoria)
                }
            })
        } else {
            return setCategory('Categorías')
        }
    }

    const data = {
        category,
        setCategory,
        setCat,
        getCategories,
        categories
    }

    return (
        <CategoriesContext.Provider value={data}>
            {children}
        </CategoriesContext.Provider>
    )
};

export {CategoriesProvider};
export default CategoriesContext;