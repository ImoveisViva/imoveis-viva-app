import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

type PropertyData = {
    categoria: string
    tipoImovel: string
    tipoNegocio: string
    quartos: number
    sala: number
    cozinha: number
    preco: number
    descricao: string
    endereco: {
        bairro: string
        cidade: string
        rua: string
        numero: number
        latitude: string
        longitude: string
    }
    contato: {
        nome: string
        telefone: number
        email: string
    }
}

export default async function CadastroImoveis(data: PropertyData, id: string) {
    try {
        const docRef = doc(db, "imoveis", id)
        await setDoc(docRef, data)
    } catch (error) {
        console.error("Erro ao adicionar o documento: ", error);
    }
}