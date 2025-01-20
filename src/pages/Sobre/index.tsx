import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

export function SobrePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header isHome={false} />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-12 xl:px-44 py-8 sm:py-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">Sobre a Imóveis Viva</h1>

                <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">Nossa História</h2>
                        <p className="text-gray-600 mb-4">
                            A Imóveis Viva nasceu da paixão por conectar pessoas às suas casas dos sonhos, com líderes no mercado imobiliário, oferecendo um serviço personalizado e de alta qualidade para nossos clientes.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Com uma equipe de profissionais dedicados e experientes, nos orgulhamos de ajduar inúmeras famílias a encontrar o lugar perfeito para chamar de lar.
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end">
                        <img
                            src="/about-image.jpg"
                            alt="Equipe Imóveis Viva"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto object-cover"
                        />
                    </div>
                </div>

                <div className="mt-8 sm:mt-12">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">Nossa Missão</h2>
                    <p className="text-gray-600 mb-6 sm:mb-8">
                        Nossa missão é simplificar o processo de compra, venda e aluguel de imóveis, proporcionando uma experiência transparente, eficiente e satisfatória para todos os nossos clientes.
                    </p>

                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">Nossos Valores</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6 sm:mb-8 space-y-2">
                        <li>Integridade em todas as nossas interações</li>
                        <li>Excelência no atendimento ao cliente</li>
                        <li>Inovação contínua em nossos serviços</li>
                        <li>Responsabilidade social e ambiental</li>
                        <li>Valorização e desenvolvimento de nossa equipe</li>
                    </ul>
                </div>

                <div className="bg-orange-100 rounded-lg p-6 sm:p-8 mt-8 sm:mt-12">
                    <h2 className="text-xl sm:text-2xl font-semibold text-orange-800 mb-4">Por que escolher a Imóveis Viva?</h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        <li className="flex items-center">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>Ampla variedade de imóveis</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>Atendimento personalizado</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>Processo transparente e seguro</span>
                        </li>
                    </ul>
                </div>
            </main>

            <Footer />
        </div>
    )
}