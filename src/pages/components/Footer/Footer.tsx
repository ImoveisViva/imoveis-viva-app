import svgInsta from '../../../../public/assets/svg/instagram.svg'

export function Footer() {
    return (
        <>
            <div className="px-44 bg-white border-t border-gray-200">
                <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <h1 className="text-2xl font-bold text-[#3b82f6]">Imóveis Viva</h1>
                    </div>

                    {/* ---------------------------------------------------------------------------------------------------------------- */}
                    <div className="col-span-1">
                        <h3 className="text-2xl font-semibold text-gray-800">Empresa</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500">
                                    Anunciar meu imóvel
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500">
                                    Termo de serviço
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500">
                                    Alugar imóvel
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500">
                                    Comprar imóvel
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* ---------------------------------------------------------------------------------------------------------------- */}
                    <div className="col-span-1 text-right">
                        <h3 className="text-2xl font-semibold text-gray-800">Siga-nos</h3>
                        <p className="flex justify-end mt-4">
                            <a href="https://www.instagram.com/imoveisviva/" target="_blank">
                                <img width={35} src={svgInsta} alt="instagram" />
                            </a>
                        </p>
                        <p className="mt-2 text-gray-600 text-sm">
                            Entre em contato conosco pelo Instagram ou pelo e-mail{" "}
                            <br />
                            <a
                                href="mailto:info@recoupmyrent.com"
                                className="text-blue-500 hover:underline"
                            >
                                info@imoveisviva.com
                            </a>
                        </p>

                        <div className="flex items-center flex-col mt-5">
                            <button
                                type="submit"
                                className="ml-3 px-4 py-2 bg-blue-500 w-full text-white font-medium rounded-md hover:bg-blue-600"
                            > Entrar em contato
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t py-4">
                <p className="text-center text-gray-600 text-sm">
                    ImoveisViva © 2024
                </p>
            </div>
        </>
    );
};