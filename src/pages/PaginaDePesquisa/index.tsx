import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { ImovelType } from '@/hooks/types'
import { GetCardDBPesquisa } from '@/firebase/admin/getDashboard'
import { MainCards } from '../components/Main/Main-Cards/Mais-Cards'
import Filtro from '../components/FiltroDePesquisa'

export function PageDePesquisa() {
    const [searchParams] = useSearchParams()
    const [tipoImovel, setTipoImovel] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [dataBD, setDataBD] = useState<ImovelType[]>([]);

    useEffect(() => {
        const tipo = searchParams.get('tipo')
        setTipoImovel(tipo)
    }, [searchParams])

    useEffect(() => {
        async function handleGetDB() {
            if (tipoImovel) {
                try {
                    setLoading(true)
                    const data = await GetCardDBPesquisa({ type: tipoImovel })
                    setDataBD(data)
                } catch (error) {
                    console.error(error)
                } finally {
                    setLoading(false)
                }
            }
        }
        handleGetDB()
    }, [tipoImovel])

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <motion.div
                    className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        )
    }

    return (
        <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header isHome={false} />
            <motion.div
                className="bg-[#f5f4f0]"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <Filtro />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {dataBD.length > 0 ? (
                    <MainCards data={dataBD} />
                ) : (
                    <p className="text-xl mb-4">Nenhum imóvel encontrado.</p>
                )}
            </motion.div>
            <Footer />
        </motion.div>
    )
}