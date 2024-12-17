import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { useToast } from '@/hooks/use-toast'
import CadastroImoveis from '@/firebase/admin/cadastroImoveis'

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

export default function CadastroImoveisPage() {
    const { toast } = useToast();

    const [propertyData, setPropertyData] = useState<PropertyData>({
        categoria: '',
        tipoImovel: '',
        tipoNegocio: '',
        quartos: 0,
        sala: 0,
        cozinha: 0,
        preco: 0,
        descricao: '',
        endereco: {
            bairro: '',
            cidade: '',
            rua: '',
            numero: 0,
            latitude: '',
            longitude: ''
        },
        contato: {
            nome: '',
            telefone: 0,
            email: ''
        }
    })
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setPropertyData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setPropertyData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPropertyData(prev => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [name]: value
            }
        }))
    }

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPropertyData(prev => ({
            ...prev,
            contato: {
                ...prev.contato,
                [name]: value
            }
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        try {
            await CadastroImoveis(propertyData);
            setPropertyData({
                categoria: '',
                tipoImovel: '',
                tipoNegocio: '',
                quartos: 0,
                sala: 0,
                cozinha: 0,
                preco: 0,
                descricao: '',
                endereco: {
                    bairro: '',
                    cidade: '',
                    rua: '',
                    numero: 0,
                    latitude: '',
                    longitude: ''
                },
                contato: {
                    nome: '',
                    telefone: 0,
                    email: ''
                }
            })
            toast({
                title: "Sucesso!",
                description: "Cadastro feito com sucesso.",
                variant: "default",
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erro desconhecido ao cadastrar o imóvel. Tente novamente.');
            }
            console.error(error);
            toast({
                title: "Erro!",
                description: "Não foi possível concluir o cadastro.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <h1 className='text-[24px] font-bold'>Cadastro de Imóvel</h1>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="categoria">Categoria</Label>
                                <Select name="categoria" value={propertyData.categoria} onValueChange={(value) => handleSelectChange('categoria', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="destaque">Destaque</SelectItem>
                                        <SelectItem value="promocao">Promoção</SelectItem>
                                        <SelectItem value="comum">Comum</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tipoImovel">Tipo do Imóvel</Label>
                                <Select name="tipoImovel" value={propertyData.tipoImovel} onValueChange={(value) => handleSelectChange('tipoImovel', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="casa">Casa</SelectItem>
                                        <SelectItem value="apartamento">Apartamento</SelectItem>
                                        <SelectItem value="comercial">Comercial</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tipoNegocio">Tipo de Negócio</Label>
                                <Select name="tipoNegocio" value={propertyData.tipoNegocio} onValueChange={(value) => handleSelectChange('tipoNegocio', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="venda">Venda</SelectItem>
                                        <SelectItem value="aluguel">Aluguel</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="quartos">Quartos</Label>
                                <Input value={propertyData.quartos.toString()} type="number" id="quartos" name="quartos" onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sala">Sala</Label>
                                <Input value={propertyData.sala.toString()} type="number" id="sala" name="sala" onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cozinha">Cozinha</Label>
                                <Input value={propertyData.cozinha.toString()} type="number" id="cozinha" name="cozinha" onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="preco">Preço</Label>
                                <Input value={propertyData.preco.toString()} type="number" id="preco" name="preco" onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="descricao">Descrição</Label>
                            <Textarea value={propertyData.descricao} id="descricao" name="descricao" onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Endereço</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bairro">Bairro</Label>
                                    <Input value={propertyData.endereco.bairro} type="text" id="bairro" name="bairro" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cidade">Cidade</Label>
                                    <Input value={propertyData.endereco.cidade} type="text" id="cidade" name="cidade" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rua">Rua</Label>
                                    <Input value={propertyData.endereco.rua} type="text" id="rua" name="rua" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numero">Número</Label>
                                    <Input value={propertyData.endereco.numero.toString()} type="number" id="numero" name="numero" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input value={propertyData.endereco.latitude} type="number" id="latitude" name="latitude" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input value={propertyData.endereco.longitude} type="number" id="longitude" name="longitude" onChange={handleAddressChange} required />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Contato do Dono</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nome">Nome</Label>
                                    <Input value={propertyData.contato.nome} type="text" id="nome" name="nome" onChange={handleContactChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefone">Telefone</Label>
                                    <Input value={propertyData.contato.telefone.toString()} type="tel" id="telefone" name="telefone" onChange={handleContactChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input value={propertyData.contato.email} type="email" id="email" name="email" onChange={handleContactChange} required />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? 'Cadastrando...' : 'Cadastrar Imóvel'}
                        </Button>
                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}