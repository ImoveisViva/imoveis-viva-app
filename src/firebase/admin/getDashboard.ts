import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ImovelType } from "@/hooks/types";

export async function GetImoveisDB() {
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
        return imoveis;
    } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
        return [];
    }
}

export async function GetCardDB({ id }: { id: string }) {
    try {
        const docRef = doc(db, "imoveis", id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const data = docSnapshot.data() as ImovelType;
            return [{ ...data, id: docSnapshot.id }];
        } else {
            console.warn("Documento não encontrado!");
            return [];
        }
    } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
        return [];
    }
}