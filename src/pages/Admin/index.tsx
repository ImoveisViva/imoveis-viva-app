import { useEffect } from "react";
import { useUser } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

export function AdminDashboard() {
    const navigate = useNavigate()
    const { user, authChecked } = useUser();

    async function handleSignOut() {
        signOut(auth).then(() => {
        }).catch((error) => {
            console.error(error)
        });
    }

    useEffect(() => {
        if (!authChecked) {
            return;
        }
        if (!user) {
            navigate('/login');
        }
    }, [user, authChecked, navigate]);
    return (
        <>
            {user && (
                <div>
                    <span>{user?.email}</span>
                    <span>
                        Dashboard
                    </span>
                    <button onClick={handleSignOut}>
                        Sair
                    </button>
                </div>
            )}
        </>
    )
}