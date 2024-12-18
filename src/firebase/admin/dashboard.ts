import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ImovelType } from "@/hooks/types";

export async function getImoveisDB() {
    try {
        const colRef = collection(db, "imoveis");
        const querySnapshot = await getDocs(colRef);

        const imoveis: ImovelType[] = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data() as ImovelType;
                imoveis.push({ ...data, id: doc.id });
            });
        }
        return imoveis; // Retorna os imóveis encontrados
    } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}
