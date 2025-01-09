import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'

export function PageDePesquisa() {
    const [searchParams] = useSearchParams()
    const [tipoImovel, setTipoImovel] = useState<string | null>(null)

    useEffect(() => {
        const tipo = searchParams.get('tipo')
        setTipoImovel(tipo)
    }, [searchParams])

    return (
        <div className="container">
            <Header isHome={false} />
            <h1 className="text-3xl font-bold mb-6">Resultados da Pesquisa</h1>
            {tipoImovel ? (
                <p className="text-xl mb-4">
                    Você está pesquisando por: <span className="font-semibold">{tipoImovel}</span>
                </p>
            ) : (
                <p className="text-xl mb-4">Nenhum tipo de imóvel selecionado</p>
            )}
            {/* Aqui adicionar a lógica para buscar e exibir os imóveis do banco de dados */}

            <Footer />
        </div>
    )
}

