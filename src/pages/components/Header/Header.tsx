import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropType {
    isHome: boolean;
}

export function Header({ isHome }: PropType) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className='w-full shadow-sm'>
            <div className="flex items-center justify-between h-16 md:h-20">
                <div className="flex-shrink-0">
                    <Link to="/" className="flex items-center">
                        <span className="text-xl md:text-2xl font-bold text-[#3b82f6]">Imóveis Viva</span>
                    </Link>
                </div>
                <div className='hidden md:flex items-center justify-end gap-5'>
                    <div className="space-x-4">
                        <Link to="/alugar" className={`${isHome ? 'text-white' : 'text-gray-800'} hover:text-[#3b82f6] px-3 py-2 rounded-md text-sm font-medium`}>
                            Alugar
                        </Link>
                        <Link to="/comprar" className={`${isHome ? 'text-white' : 'text-gray-800'} hover:text-[#3b82f6] px-3 py-2 rounded-md text-sm font-medium`}>
                            Comprar
                        </Link>
                    </div>
                    <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded text-sm">
                        Anunciar imóvel
                    </button>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className={`inline-flex items-center justify-center p-2 rounded-md ${isHome ? 'text-white' : 'text-gray-800'} hover:text-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMenuOpen ? (
                            <X className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50 shadow-md" id="mobile-menu">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        <Link to="/alugar" className="text-gray-800 hover:text-[#3b82f6] block px-3 py-2 rounded-md text-base font-medium">
                            Alugar
                        </Link>
                        <Link to="/comprar" className="text-gray-800 hover:text-[#3b82f6] block px-3 py-2 rounded-md text-base font-medium">
                            Comprar
                        </Link>
                        <Link to="/anunciar" className="text-gray-800 hover:text-[#3b82f6] block px-3 py-2 rounded-md text-base font-medium">
                            Anunciar
                        </Link>
                        <button className="w-full text-left bg-[#3b82f6] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
                            Contato
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}