import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GetCardDB } from '@/firebase/admin/getDashboard'
import { ImovelType } from '@/hooks/types'
import { Armchair, Bath, Bed, Mail, Phone, Ruler, Utensils, MoveLeft, CarFront } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Maps } from '../components/Maps/Maps'
import { Footer } from '../components/Footer/Footer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { ImageCarousel } from '../components/Carousel/Carousel'
import { ModalImageGallery } from '../components/Carousel/ModalGalerry'
import { Header } from '../components/Header/Header'
import Banenrs from '../components/Banners'
import WhatsappPopup from '../components/Whatsapp'

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export const CardDetails = () => {
    const { id } = useParams()
    const [dataBD, setDataBD] = useState<ImovelType[]>([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const isSmallScreen = useMediaQuery("(max-width: 768px)")

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

    const imageUrls = property.fotos.map(foto =>
        foto instanceof File ? URL.createObjectURL(foto) : foto
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const whatsappNumber = `${dataBD[0].contato.telefone}`;
        const message = `Olá! Gostaria de mais informações sobre o imóvel do endereço ${dataBD[0].endereco.rua} ${dataBD[0].endereco.numero}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    }

    return (
        <div className='bg-[#f5f4f0]'>
            <Header isHome={false} />
            <div className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-44 max-w-screen-2xl mx-auto'>
                <div onClick={() => navigate('/')}
                    className='flex items-center text-[#7a9e7e] text-[15px] font-bold cursor-pointer hover:underline w-24 my-10'>
                    <MoveLeft className="mr-2 h-5 w-5" color='#7a9e7e' /> Voltar
                </div>

                <div className='flex flex-col lg:flex-row justify-center gap-4'>
                    <div className="w-full lg:w-[65%]">
                        {imageUrls.length > 0 && (
                            isSmallScreen ? (
                                <ImageCarousel images={imageUrls} />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-1.5">
                                    {/* Main large image */}
                                    <ModalImageGallery images={imageUrls} initialIndex={0} />

                                    {/* Right side smaller images */}
                                    <div className="hidden md:grid grid-rows-2 gap-1.5">
                                        {imageUrls.slice(1, 3).map((_image, index) => (
                                            <ModalImageGallery key={index} images={imageUrls} initialIndex={index + 1} />
                                        ))}
                                    </div>

                                    {/* Bottom row of images */}
                                    <div className="hidden md:grid grid-cols-3 gap-1.5 col-span-2">
                                        {imageUrls.slice(3, 6).map((_image, index) => (
                                            <ModalImageGallery key={index} images={imageUrls} initialIndex={index + 3} />
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <Card className='relative flex flex-col w-full lg:w-[35%] p-4 sm:p-6 gap-4 rounded-sm mt-4 lg:mt-0'>
                        <span className={`absolute top-2 right-2 ${property.disponivel ? 'bg-green-500' : 'bg-red-500'} rounded-sm px-3 py-1 text-xs font-semibold text-white`}>
                            {property.disponivel ? 'Disponível' : 'Indisponível'}
                        </span>
                        <div className='flex justify-between mt-3 items-center'>
                            <h1 className='font-bold text-xl sm:text-2xl mb-2'>{property.tipoImovel} - {property.tipoNegocio}</h1>
                            <h1 className='font-bold mb-2 text-[#7a9e7e]'>{property.id}</h1>
                        </div>
                        <p className='text-lg sm:text-xl font-semibold text-primary'>{formatCurrency(property.preco)}</p>
                        <p className='text-sm sm:text-base text-gray-600'>{property.descricao}</p>

                        <div className='mt-2'>
                            <h2 className='font-semibold'>Detalhes do Imóvel</h2>
                            <div className="flex flex-wrap gap-2 sm:gap-4 my-1">
                                {property.quartos > 0 ? (
                                    <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                        <Bed className="h-4 w-4 sm:h-5 sm:w-5 text-[#3b82f6]" />
                                        {property.quartos} Quartos
                                    </span>
                                ) : null}
                                {property.banheiro > 0 ? (
                                    <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                        <Bath className="h-4 w-4 sm:h-5 sm:w-5 text-[#3b82f6]" />
                                        {property.banheiro} Banheiros
                                    </span>
                                ) : null}
                                {property.sala > 0 ? (
                                    <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                        <Armchair className="h-4 w-4 sm:h-5 sm:w-5 text-[#3b82f6]" />
                                        {property.sala} Sala
                                    </span>
                                ) : null}
                                {property.cozinha > 0 ? (
                                    <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                        <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-[#3b82f6]" />
                                        {property.cozinha} Cozinha
                                    </span>
                                ) : null}
                                {property.metros2 > 0 ? (
                                    <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                        <Ruler className="h-4 w-4 sm:h-5 sm:w-5 text-[#3b82f6]" />
                                        {property.metros2}m²
                                    </span>
                                ) : null}
                                {Number(property.vagas) > 0 ? (
                                    <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                        <CarFront className="h-4 w-4 sm:h-5 sm:w-5 text-[#3b82f6]" />
                                        {property.vagas}
                                    </span>
                                ) : null}
                            </div>
                        </div>

                        <div className='mt-4'>
                            <h2 className='font-semibold mb-2'>Endereço</h2>
                            <p className='text-sm sm:text-base'>{property.endereco.rua}, {property.endereco.numero}</p>
                            <p className='text-sm sm:text-base'>{property.endereco.bairro}, {property.endereco.cidade}</p>
                        </div>

                        <div className='mt-4'>
                            <h2 className='font-semibold mb-2'>Contato</h2>
                            {property.contato.telefone > 0 ? (
                                <p className='flex items-center gap-2 text-sm sm:text-base'><Phone className="h-4 w-4" />{property.contato.telefone}</p>
                            ) : null}
                            <p className='flex items-center gap-2 text-sm sm:text-base'><Mail className="h-4 w-4" />{property.contato.email}</p>
                        </div>

                        <Button className='mt-4 w-full bg-[#e27d60] hover:bg-[#e27d60]/70' onClick={handleSubmit}>Entrar em contato</Button>
                    </Card>
                </div>
                <Maps latitude={property.endereco.latitude} longitude={property.endereco.longitude} theme={'light'} />
            </div>
            <Banenrs />
            <Footer />
            <WhatsappPopup id={id} />
        </div>
    )
}

