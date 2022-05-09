// Imports de React
import { createContext, useState } from "react";

// Imports de database & firestore
import db from '../firebase';
import { collection, getDocs } from "firebase/firestore";

// Creación del context
const CategoriesContext = createContext();

//  CONTEXT   //
const CategoriesProvider = ({children}) => {

    // Estados para setear todas las categorías y la seleccionada
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);


    // Función para traer todas las categorías de la base de datos
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

    // Función para setear la categoría actual
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
    

    // Data para enviar a los children
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