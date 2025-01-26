import { type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { Header } from "../components/Header/Header"
import { Footer } from "../components/Footer/Footer"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function AnunciarPage() {
  const router = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState("")
  const planoSemestral = { nomePlano: "Semestral", valor: "359,90" }
  const planoTrimestral = { nomePlano: "Trimestral", valor: "199,90" }
  const planoMensal = { nomePlano: "Mensal", valor: "34,90" }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setResult("Enviando...")

    const form = event.currentTarget
    const formData = new FormData(form)

    formData.append("access_key", "f6e92216-d504-4230-8485-ab50fb733154")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        router("/thanks")
      } else {
        setResult(`Erro: ${data.message}`)
        setIsSubmitting(false)
      }
    } catch (error) {
      setResult("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.")
      console.error("Error:", error)
      setIsSubmitting(false)
    }
  }

  const handleSubmitWhatsapp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    plano: { nomePlano: string; valor: string },
  ) => {
    e.preventDefault()
    const whatsappNumber = "38992372678"
    const message = `Olá! Gostaria de saber mais sobre o plano ${plano.nomePlano} de R$ ${plano.valor} para anunciar meu imóvel.`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header isHome={false} />

      <motion.section
        className="bg-[#f5f4f0] py-16"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="border-b-2 h-[80vh] ">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#7FA086] mb-4 text-center">Mais planos para você</h2>
            <p className="text-gray-600 text-center mb-12">Obtenha e publique com qualquer um desses planos.</p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Plano Semestral */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-md flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-purple-600 font-semibold mb-4">Super destaque {planoSemestral.nomePlano}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ {planoSemestral.valor}</span>
                  <span className="text-gray-600">/ 6 meses</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Mais tempo de Destaque, mais chances de fechar negócio!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Melhor custo-benefício</span>
                  </li>
                </ul>
                <Button
                  onClick={(e) => handleSubmitWhatsapp(e, planoSemestral)}
                  className="w-full bg-[#e27d60] hover:bg-[#e27d60]/90 text-white"
                  aria-label={`Contratar plano ${planoSemestral.nomePlano}`}
                >
                  Contratar plano
                </Button>
              </motion.div>

              {/* Plano Trimestral */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-md flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-purple-600 font-semibold mb-4">Super destaque {planoTrimestral.nomePlano}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">R$ {planoTrimestral.valor}</span>
                  <span className="text-gray-600">/ 3 meses</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Anúncio Super Destaque de ótima exposição!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Seu imóvel fica anunciado conosco durante 3 meses</span>
                  </li>
                </ul>
                <Button
                  onClick={(e) => handleSubmitWhatsapp(e, planoTrimestral)}
                  className="w-full bg-[#e27d60] hover:bg-[#e27d60]/90 text-white"
                  aria-label={`Contratar plano ${planoTrimestral.nomePlano}`}
                >
                  Contratar plano
                </Button>
              </motion.div>

              {/* Plano Mensal */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-md flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-purple-600 font-semibold mb-4">Super Destaque {planoMensal.nomePlano}</h3>
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through text-2xl">R$ 69,90</span>
                    <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">-50%</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">R$ {planoMensal.valor}</span>
                    <span className="text-gray-600">/ 30 dias</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>-50% no primeiro mês</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Custo-benefício</span>
                  </li>
                </ul>
                <Button
                  onClick={(e) => handleSubmitWhatsapp(e, planoMensal)}
                  className="w-full bg-[#e27d60] hover:bg-[#e27d60]/90 text-white"
                  aria-label={`Contratar plano ${planoMensal.nomePlano}`}
                >
                  Contratar plano
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.main
        className="flex-grow container mx-auto px-4 pb-16 bg-[#f5f4f0]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-[#7FA086] mb-6 text-center">Entre em Contato</h2>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" name="nome" required placeholder="Seu nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" name="telefone" type="tel" required placeholder="(38) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea
                id="mensagem"
                name="mensagem"
                required
                placeholder="Descreva brevemente o motivo do contato."
                className="min-h-[150px]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#e27d60] hover:bg-[#e27d60]/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </motion.form>
          {result && (
            <div
              className={`mt-4 p-4 rounded ${
                result.includes("sucesso") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
              role="alert"
              aria-live="polite"
            >
              {result}
            </div>
          )}
        </div>
      </motion.main>

      <Footer />
    </motion.div>
  )
}