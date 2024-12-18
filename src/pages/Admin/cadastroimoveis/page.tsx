import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

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
            [name]: name === 'quartos' || name === 'sala' || name === 'cozinha' ?
                (value === '' ? 0 : parseInt(value, 10)) :
                value
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
                [name]: name === 'numero' ?
                    (value === '' ? 0 : parseInt(value, 10)) :
                    value
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
        <div className="container mx-auto py-10 pb-32 ">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Cadastro de Imóvel</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="categoria">
                                    Categoria <span className="text-red-500">*</span>
                                </Label>
                                <Select name="categoria" value={propertyData.categoria} onValueChange={(value) => handleSelectChange('categoria', value)} required>
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
                                <Label htmlFor="tipoImovel">
                                    Tipo do Imóvel <span className="text-red-500">*</span>
                                </Label>
                                <Select name="tipoImovel" value={propertyData.tipoImovel} onValueChange={(value) => handleSelectChange('tipoImovel', value)} required>
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
                                <Label htmlFor="tipoNegocio">
                                    Tipo de Negócio <span className="text-red-500">*</span>
                                </Label>
                                <Select name="tipoNegocio" value={propertyData.tipoNegocio} onValueChange={(value) => handleSelectChange('tipoNegocio', value)} required>
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
                                <Label htmlFor="quartos">
                                    Quartos <span className="text-red-500">*</span>
                                </Label>
                                <Input value={propertyData.quartos.toString()} type="number" id="quartos" name="quartos" onChange={handleInputChange} min="0" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sala">
                                    Sala <span className="text-red-500">*</span>
                                </Label>
                                <Input value={propertyData.sala.toString()} type="number" id="sala" name="sala" onChange={handleInputChange} min="0" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cozinha">
                                    Cozinha <span className="text-red-500">*</span>
                                </Label>
                                <Input value={propertyData.cozinha.toString()} type="number" id="cozinha" name="cozinha" onChange={handleInputChange} min="0" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="preco">
                                    Preço <span className="text-red-500">*</span>
                                </Label>
                                <Input value={propertyData.preco.toString()} type="number" id="preco" name="preco" onChange={handleInputChange} min="0" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="descricao">
                                Descrição <span className="text-red-500">*</span>
                            </Label>
                            <Textarea value={propertyData.descricao} id="descricao" name="descricao" onChange={handleInputChange} required />
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Endereço</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="bairro">
                                        Bairro <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.bairro} type="text" id="bairro" name="bairro" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cidade">
                                        Cidade <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.cidade} type="text" id="cidade" name="cidade" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rua">
                                        Rua <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.rua} type="text" id="rua" name="rua" onChange={handleAddressChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numero">
                                        Número <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.numero.toString()} type="number" id="numero" name="numero" onChange={handleAddressChange} min="0" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="latitude">
                                        Latitude <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.latitude} type="number" id="latitude" name="latitude" onChange={handleAddressChange} step="any" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="longitude">
                                        Longitude <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.endereco.longitude} type="number" id="longitude" name="longitude" onChange={handleAddressChange} step="any" required />
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Contato do Proprietário</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="nome">
                                        Nome <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.contato.nome} type="text" id="nome" name="nome" onChange={handleContactChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefone">
                                        Telefone <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.contato.telefone.toString()} type="tel" id="telefone" name="telefone" onChange={handleContactChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        Email <span className="text-red-500">*</span>
                                    </Label>
                                    <Input value={propertyData.contato.email} type="email" id="email" name="email" onChange={handleContactChange} required />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? 'Cadastrando...' : 'Cadastrar Imóvel'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            {error && (
                <Alert variant="destructive" className="mt-4 max-w-4xl mx-auto">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    )
}