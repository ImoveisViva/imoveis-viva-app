import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GetCardDB } from '@/firebase/admin/getDashboard'
import { ImovelType } from '@/hooks/types'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Maps } from '../components/Maps/Maps'

export const CardDetails = () => {
    const { id } = useParams()
    const [dataBD, setDataBD] = useState<ImovelType[]>([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function handleGetBD() {
            if (id) {
                try {
                    setLoading(true)
                    const data = await GetCardDB({ id })
                    setDataBD(data)
                } catch (error) {
                    console.error(error)
                } finally {
                    setLoading(false)
                }
            }
        }
        handleGetBD()
    }, [id])

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        )
    }

    const property = dataBD[0]
    if (!property) return null

    return (
        <div className='px-44'>
            <Button className='my-5' onClick={() => navigate('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>

            <div className='flex justify-center gap-2'>
                <div className="w-[70%]">
                    {property.fotos && property.fotos.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-1">
                            {/* Main large image */}
                            <div className="relative aspect-[3/3] rounded-sm overflow-hidden">
                                <img
                                    src={
                                        property.fotos[0] instanceof File
                                            ? URL.createObjectURL(property.fotos[0])
                                            : property.fotos[0]
                                    }
                                    alt="Imóvel vista principal"
                                    className="absolute inset-0 object-cover h-full w-full"
                                />
                            </div>

                            {/* Right side smaller images */}
                            <div className="hidden md:grid grid-rows-2 gap-1">
                                {property.fotos.slice(1, 3).map((foto, index) => (
                                    <div key={index} className="relative rounded-sm overflow-hidden">
                                        <img
                                            src={
                                                foto instanceof File
                                                    ? URL.createObjectURL(foto)
                                                    : foto
                                            }
                                            alt={`Imóvel vista ${index + 2}`}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Bottom row of images */}
                            <div className="hidden md:grid grid-cols-3 gap-1 col-span-2">
                                {property.fotos.slice(3, 6).map((foto, index) => (
                                    <div key={index} className="relative aspect-[4/3] rounded-sm overflow-hidden">
                                        <img
                                            src={
                                                foto instanceof File
                                                    ? URL.createObjectURL(foto)
                                                    : foto
                                            }
                                            alt={`Imóvel vista ${index + 4}`}
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <Card className='flex w-[30%] p-4 justify-center'>
                    <h1 className='font-bold'>Apartamento não sei oque</h1>
                </Card>
            </div>

            <Maps latitude={property.endereco.latitude} longitude={property.endereco.longitude} />
        </div>
    )
}