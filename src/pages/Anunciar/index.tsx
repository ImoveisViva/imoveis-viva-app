import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, Info } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'

export default function AnunciarPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(event.currentTarget)

        try {
            const response = await fetch('/api/submit-contact', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (data.success) {
                toast({
                    title: "Mensagem enviada",
                    description: "Entraremos em contato em breve!",
                })
                event.currentTarget.reset()
            } else {
                throw new Error(data.message)
            }
        } catch (error) {
            toast({
                title: "Erro",
                description: "Houve um problema ao enviar sua mensagem. Por favor, tente novamente.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header isHome={false} />

            {/* Pricing Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Mais planos para você</h2>
                    <p className="text-gray-600 text-center mb-12">
                        Obtenha e publique com qualquer um desses planos.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Plano Anual */}
                        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
                            <h3 className="text-purple-600 font-semibold mb-4">Super destaque Anual</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">R$ 519,00</span>
                                <span className="text-gray-600">/ 1 ano</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Máxima exposição</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Melhor custo-benefício</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Seu imóvel fica anunciado conosco durante 1 ano até que você consiga</span>
                                </li>
                            </ul>
                            <Button className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90 text-white">
                                Comprar
                            </Button>
                        </div>

                        {/* Plano Semestral */}
                        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
                            <h3 className="text-purple-600 font-semibold mb-4">Super destaque Semestral</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">R$ 399,00</span>
                                <span className="text-gray-600">/ 6 meses</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Anúncio Super Destaque de ótima exposição!</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>50% de desconto sobre o valor mensal</span>
                                </li>
                            </ul>
                            <Button className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90 text-white">
                                Comprar
                            </Button>
                        </div>

                        {/* Plano Trimestral */}
                        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
                            <h3 className="text-purple-600 font-semibold mb-4">Super Destaque Trimestral</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">R$ 209,00</span>
                                <span className="text-gray-600">/ 3 meses</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Máxima exposição</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Proporciona maior quantidade de interessados</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span>Melhor custo-benefício</span>
                                </li>
                            </ul>
                            <Button className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90 text-white">
                                Comprar
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-6 text-gray-600 text-sm">
                        <Info className="w-4 h-4" />
                        <p>Duração de um mês igual a 30 dias. Plano com renovação automática.</p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <h2 className="text-3xl font-bold text-[#7FA086] mb-6 text-center">Entre em Contato</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Preencha o formulário abaixo para anunciar seu imóvel ou tirar dúvidas.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome Completo</Label>
                            <Input
                                id="nome"
                                name="nome"
                                required
                                placeholder="Seu nome completo"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="seu@email.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input
                                id="telefone"
                                name="telefone"
                                required
                                placeholder="(38) 99999-9999"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mensagem">Mensagem</Label>
                            <Textarea
                                id="mensagem"
                                name="mensagem"
                                required
                                placeholder="Descreva brevemente o imóvel que deseja anunciar ou sua dúvida..."
                                className="min-h-[150px]"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#E88D72] hover:bg-[#E88D72]/90 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                        </Button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    )
}

