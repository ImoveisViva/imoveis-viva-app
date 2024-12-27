import svgInsta from '../../../../public/assets/svg/instagram.svg'

export function Footer() {
    return (
        <>
            <div className="bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="col-span-1">
                            <h1 className="text-2xl font-bold text-[#3b82f6]">Imóveis Viva</h1>
                        </div>

                        <div className="col-span-1">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Empresa</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-blue-500 text-sm sm:text-base">
                                        Anunciar meu imóvel
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-blue-500 text-sm sm:text-base">
                                        Termo de serviço
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-blue-500 text-sm sm:text-base">
                                        Alugar imóvel
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-blue-500 text-sm sm:text-base">
                                        Comprar imóvel
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-1 sm:text-right">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Siga-nos</h3>
                            <div className="flex justify-start sm:justify-end mb-4">
                                <a href="https://www.instagram.com/imoveisviva/" target="_blank" rel="noopener noreferrer">
                                    <img className="w-8 sm:w-10" src={svgInsta} alt="instagram" />
                                </a>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                Entre em contato conosco pelo Instagram ou pelo e-mail{" "}
                                <a
                                    href="mailto:info@imoveisviva.com"
                                    className="text-blue-500 hover:underline"
                                >
                                    info@imoveisviva.com
                                </a>
                            </p>

                            <div className="flex sm:justify-end">
                                <button
                                    type="button"
                                    className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Entrar em contato
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t py-4">
                <p className="text-center text-gray-600 text-sm">
                    ImoveisViva © {new Date().getFullYear()}
                </p>
            </div>
        </>
    );
};