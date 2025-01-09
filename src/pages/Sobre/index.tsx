import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

export function SobrePage() {
    return (
        <div>
            <Header isHome={false} />
            <main className="container mx-auto px-44 py-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Sobre a Imóveis Viva</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Nossa História</h2>
                        <p className="text-gray-600 mb-4">
                            A Imóveis Viva nasceu da paixão por conectar pessoas aos seus lares dos sonhos, com líderes no mercado imobiliário, oferecendo um serviço personalizado e de alta qualidade para nossos clientes.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Com uma equipe de profissionais dedicados e experientes, nos orgulhamos de ter ajudado milhares de famílias a encontrar o lugar perfeito para chamar de lar.
                        </p>
                    </div>
                    <div>
                        <img
                            src="/about-image.jpg"
                            alt="Equipe Imóveis Viva"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Nossa Missão</h2>
                    <p className="text-gray-600 mb-8">
                        Nossa missão é simplificar o processo de compra, venda e aluguel de imóveis, proporcionando uma experiência transparente, eficiente e satisfatória para todos os nossos clientes.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Nossos Valores</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-8">
                        <li>Integridade em todas as nossas interações</li>
                        <li>Excelência no atendimento ao cliente</li>
                        <li>Inovação contínua em nossos serviços</li>
                        <li>Responsabilidade social e ambiental</li>
                        <li>Valorização e desenvolvimento de nossa equipe</li>
                    </ul>
                </div>

                <div className="bg-orange-100 rounded-lg p-8 mt-12">
                    <h2 className="text-2xl font-semibold text-orange-800 mb-4">Por que escolher a Imóveis Viva?</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-center">
                            <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Ampla variedade de imóveis
                        </li>
                        <li className="flex items-center">
                            <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Atendimento personalizado
                        </li>
                        <li className="flex items-center">
                            <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Processo transparente e seguro
                        </li>
                        <li className="flex items-center">
                            <svg className="w-6 h-6 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Suporte pós-venda
                        </li>
                    </ul>
                </div>
            </main>

            <Footer />
        </div>
    )
}