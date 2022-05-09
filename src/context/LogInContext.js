// Imports de React
import { createContext, useState } from "react";

// Imports de database & firestore
import db from '../firebase';
import { collection, getDocs, updateDoc, doc, getDoc, addDoc  } from "firebase/firestore";

// Creación del context
const LogInContext = createContext();


//  CONTEXT   //       
const LogInProvider = ({children}) => {

    // Estados para setear a los usuarios, el estado de logueo y de la creación de un usuario nuevo
    const [usersDb, setUsersDb] = useState([]);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [initialAvatar, setInitialAvatar] = useState("");
    const [formSuccess, setFormSuccess] = useState();
    const [formId, setFormId] = useState();


    //  FUNCTIONS   //

    // Función para traer todos los usuarios
    const getUsers = async () => {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(list => {
            let usuarios = list.data();
            usuarios.id = list.id;
            return usuarios
        })
        return setUsersDb(usersList)
    }

    // Función para traer un usuario por id
    const getUserById = async (id) => {
        const userDb = doc(db, "users", id);
        const userDoc = await getDoc(userDb);
        let data = userDoc.data();
        data = {id, ...data}
        setUser(data)
    };

    // Función para actualizar el perfil de un usuario
    const updateUser = async (data) => {
        const ls = JSON.parse(localStorage.getItem("user")) 
        const {id} = ls
        const userDb = doc(db, 'users', id);
        const userDoc = await updateDoc(userDb, data)
        const {user, name, phone, email} = data
        localStorage.setItem("user", JSON.stringify({id: id, user: user, name: name, phone: phone, email: email}));
        setUser(ls)
    }

    // Función para iniciar sesión
    const logIn = (name, pass) => {
        if (!loggedIn) {
            let usuario;
            usersDb.map((u) => {
                if((u.user === name) && (u.password === pass)) {
                    localStorage.setItem("user", JSON.stringify({id: u.id, user: u.user, name: u.name, phone: u.phone, email: u.email}));
                    setLoggedIn(true);
                    return usuario = u;
                }
            })
            return usuario
        }
    }

    // Función para cerrar sesión
    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("orders");
        setLoggedIn(false)
        setUser({})
    }

    // Función para chequear si el usuario está logueado
    const checkLogIn = () => {
        const ls = JSON.parse(localStorage.getItem("user"));
        if (ls) {
            setLoggedIn(true);
            setInitialAvatar(ls.user.slice(0,1).toUpperCase());
            getUserById(ls.id)
        } else {
            setLoggedIn(false)
        }
    };

    // Función para crear un nuevo usuario
    const createUser = async (user) => {
        const userDb = collection(db, 'users');
        const userDoc = await addDoc(userDb, user);
        setFormId(userDoc.id)
        setFormSuccess(true)
        getUsers()
    }
    

    // Data para enviar a los children
    const data = {
        logIn,
        logOut,
        user,
        setUser,
        getUsers,
        getUserById,
        loggedIn,
        initialAvatar,
        setInitialAvatar,
        updateUser,
        checkLogIn,
        createUser,
        formSuccess,
        setFormSuccess
    }

    return (
        <LogInContext.Provider value={data}>
            {children}
        </LogInContext.Provider>
    )
};

export {LogInProvider};
export default LogInContext;