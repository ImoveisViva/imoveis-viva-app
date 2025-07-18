import { Link } from 'react-router-dom';
import svgInsta from '../../../../public/assets/svg/instagram.svg'

export function Footer() {
    return (
        <>
            <div className="border-t border-gray-200 bg-[#7a9e7e] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-44">
                <div className="container mx-auto py-8 sm:py-10" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, .7)" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="col-span-1">
                            <h1 className="text-2xl font-bold text-[#fff]">Imóveis Viva</h1>
                        </div>

                        <div className="col-span-1">
                            <h3 className="text-xl font-semibold text-[#fff] mb-4">Empresa</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/anunciar" className="text-[#d8d8d8] hover:text-[#e27d60] text-sm">
                                        Anunciar meu imóvel
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-[#d8d8d8] hover:text-[#e27d60] text-sm">
                                        Termo de serviço
                                    </a>
                                </li>
                                <li>
                                    <a href="/pesquisa?tipo=Apartamento" className="text-[#d8d8d8] hover:text-[#e27d60] text-sm">
                                        Apartamentos
                                    </a>
                                </li>
                                <li>
                                    <a href="/pesquisa?tipo=Casa" className="text-[#d8d8d8] hover:text-[#e27d60] text-sm">
                                        Casas
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-1 lg:text-right">
                            <h3 className="text-xl font-semibold text-[#fff] mb-4" >Siga-nos</h3>
                            <div className="flex justify-start lg:justify-end mb-4">
                                <a href="https://www.instagram.com/imoveis.vivaunai/" target="_blank" rel="noopener noreferrer">
                                    <img className="w-8" src={svgInsta} alt="instagram" />
                                </a>
                            </div>
                            <p className="text-[#d8d8d8] text-sm mb-4" >
                                Entre em contato conosco pelo Instagram ou pelo e-mail{" "}
                                <a
                                    href="mailto:info@imoveisviva.com"
                                    className="text-[#e27d60] hover:underline"
                                >
                                    imoveisviva.contato@gmail.com
                                </a>
                            </p>

                            <div className="flex lg:justify-end">
                                <Link to={'/anunciar'}>
                                    <button
                                        type="button"
                                        className="w-full lg:w-auto px-6 py-2 bg-[#e27d60] text-white font-medium text-sm rounded-md hover:bg-[#cc664a] transition-colors duration-300"
                                    >
                                        Entrar em contato
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t py-4 bg-[#7a9e7e]">
                <p className="text-center text-[#d8d8d8] text-sm">
                    ImoveisViva © {new Date().getFullYear()}
                </p>
            </div>
        </>
    );
}

