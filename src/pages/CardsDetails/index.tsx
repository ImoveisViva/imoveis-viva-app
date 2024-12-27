'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { GetCardDB } from '@/firebase/admin/getDashboard'
import { ImovelType } from '@/hooks/types'
import { Building2, Mail, MapPin, Phone, Ruler, ShowerHeadIcon as Shower } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export const CardDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [dataBD, setDataBD] = useState<ImovelType[]>([])
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
        <div>
            <h1>PÁGINA DE DETALHES DO CARD ESCOLHIDO</h1>
            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Detalhes do Imóvel</span>
                        <span className="text-sm text-muted-foreground">ID: {id}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    {property.fotos && property.fotos.length > 0 && (
                        <div className="aspect-video overflow-hidden rounded-lg">
                            <img
                                src={
                                    property.fotos[0] instanceof File
                                        ? URL.createObjectURL(property.fotos[0])
                                        : property.fotos[0]
                                }
                                alt="Imóvel"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <h3 className="text-xl font-semibold">
                                {property.tipoNegocio === 'Aluguel' ? 'Para Alugar' : 'Para Vender'}
                            </h3>
                            <p className="text-2xl font-bold">
                                R$ {Number(property.preco).toLocaleString('pt-BR')}
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{property.endereco.bairro}, {property.endereco.cidade}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span>{property.quartos} Quartos</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Shower className="h-4 w-4 text-muted-foreground" />
                                    <span>{property.banheiro} Banheiros</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Ruler className="h-4 w-4 text-muted-foreground" />
                                    <span>{property.metros2}m²</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <h4 className="font-semibold">Contato</h4>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>{property.contato.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{property.contato.telefone}</span>
                            </div>
                        </div>

                        {property.descricao && (
                            <div className="grid gap-2">
                                <h4 className="font-semibold">Descrição</h4>
                                <p className="text-sm text-muted-foreground">{property.descricao}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={() => navigate('/')}
                        className="w-full"
                    >
                        Voltar para Home
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

