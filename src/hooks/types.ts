export interface ImovelType {
    categoria: string
    tipoImovel: string
    tipoNegocio: string
    quartos: number
    sala: number
    cozinha: number
    banheiro: number
    metros2: number
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
    id?: string
    fotos: File[];
    disponivel: Boolean
}