import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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

export async function GetCardDBPesquisa({ type }: { type: string }) {
    try {
        const q = query(collection(db, "imoveis"), where("tipoImovel", "==", type));
        const querySnapshot = await getDocs(q);

        const data: ImovelType[] = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id } as ImovelType);
        });

        const randomData = getRandomItems(data);
        return randomData;

    } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
        return [];
    }
}

interface FilterParams {
    tipoNegocio?: string
    tipoImovel?: string
    quartos?: number
    vagas?: string
    preco?: number
}

export async function GetDBPesquisa(filterParams: FilterParams) {
    try {
        let q = query(collection(db, "imoveis"));

        if (filterParams.tipoNegocio) {
            q = query(q, where("tipoNegocio", "==", filterParams.tipoNegocio));
        }
        if (filterParams.tipoImovel) {
            q = query(q, where("tipoImovel", "==", filterParams.tipoImovel));
        }
        if (filterParams.quartos) {
            q = query(q, where("quartos", "==", filterParams.quartos));
        }
        // if (filterParams.vagas) {
        //     q = query(q, where("vagas", "==", filterParams.vagas));
        // }
        if (filterParams.preco) {
            q = query(q, where("preco", "<=", filterParams.preco)); 
        }

        const querySnapshot = await getDocs(q);

        const data: ImovelType[] = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id } as ImovelType);
        });

        const randomData = getRandomItems(data);
        return randomData;

    } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
        return [];
    }
}

function getRandomItems(arr: any[]): any[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled;
}