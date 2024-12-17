import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';

type UserTypeCreate = {
    name: string,
    email: string,
    password: string,
    photoURL?: string,
    displayName?: string,
    uid?: string
}

type UserTypeSignIn = {
    email: string,
    password: string,
}

type UserProviderProps = {
    children: React.ReactNode;
}

type AuthContextType = {
    user: UserTypeCreate;
    login: (userLogin: UserTypeSignIn) => void;
    authChecked: boolean
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function UserProvider(props: UserProviderProps) {
    const [user, setUser] = useState<any | null>(null);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setAuthChecked(true);
        });
        return () => unsubscribe();
    }, []);


    async function login(userLogin: UserTypeSignIn) {
        await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                let alertMessage = '';

                switch (errorCode) {
                    case 'auth/user-not-found':
                        alertMessage = 'Usuário não encontrado.';
                        break;
                    case 'auth/invalid-credential':
                        alertMessage = 'Email ou Senha incorreta.';
                        break;
                    case 'auth/invalid-email':
                        alertMessage = 'Endereço de e-mail inválido.';
                        break;
                    default:
                        alertMessage = 'Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.';
                        break;
                }
                alert(alertMessage);
                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    return (
        <AuthContext.Provider value={{ user, login, authChecked }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useUser() {
    const context = useContext(AuthContext);
    return context;
}