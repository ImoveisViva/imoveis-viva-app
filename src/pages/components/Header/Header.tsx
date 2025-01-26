import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import EncontreOImovel from '../EncontreOImovel';

interface PropType {
    isHome: boolean;
}

export function Header({ isHome }: PropType) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (isHome) {
        return (
            <section style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, .7)" }}>
                <header className='bg-[#7a9e7e] px-4 sm:px-6 md:px-12 lg:px-44'>
                    <nav className='flex justify-between h-[11vh] items-center'>
                        <div className='flex items-center text-white font-bold text-xl sm:text-2xl md:text-[27px]'>
                            <Link to={'/'} className='flex items-center'>
                                <span>Imóveis Viva</span>
                            </Link>
                        </div>
                        <div className='hidden md:flex text-white items-center px-5 gap-8 font-semibold'>
                            <Link className='hover:text-[#e27d60]' to="/">Início</Link>
                            <Link className='hover:text-[#e27d60]' to="/sobre">Sobre</Link>
                            <Link className='bg-[#e27d60] px-3 py-2 rounded-md hover:bg-[#cc664a] transition-colors duration-300' to="/anunciar">Anuncie seu Imóvel</Link>
                        </div>
                        <button onClick={toggleMenu} className='md:hidden text-white'>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </nav>
                    {isMenuOpen && (
                        <div className='md:hidden bg-[#7a9e7e] py-4'>
                            <Link className='block text-white py-2 px-4 hover:bg-[#6b8d6f]' to="/">Início</Link>
                            <Link className='block text-white py-2 px-4 hover:bg-[#6b8d6f]' to="/sobre">Sobre</Link>
                            <Link className='block text-white py-2 px-4 bg-[#e27d60] hover:bg-[#cc664a]' to="/anunciar">Anuncie seu Imóvel</Link>
                        </div>
                    )}
                </header>
                <section
                    className="bg-[#7A9E7E] text-white py-10 sm:py-20 h-[65vh] text-center flex flex-col items-center justify-center"
                    style={{
                        backgroundImage:
                            'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <h1 className='font-bold text-2xl sm:text-4xl md:text-[40px] mb-4 sm:mb-5'>
                        {/* Encontre o Imóvel dos Sonhos para Alugar */}
                        Seu Sonho está mais Próximo agora!
                    </h1>
                    <span className='text-lg sm:text-xl md:text-[25px]'>
                        Milhares de opções em Unaí.
                    </span>
                    <EncontreOImovel isTranparent={true} />
                </section>
            </section>
        );
    } else {
        return (
            <section style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, .7)" }}>
                <header className='bg-[#7a9e7e] px-4 sm:px-6 md:px-12 lg:px-44'>
                    <nav className='flex justify-between h-[11vh] items-center'>
                        <div className='flex items-center text-white font-bold text-xl sm:text-2xl md:text-[27px]'>
                            <Link to={'/'} className='flex items-center'>
                                <span>Imóveis Viva</span>
                            </Link>
                        </div>
                        <div className='hidden md:flex text-white items-center px-5 gap-8 font-semibold'>
                            <Link className='hover:text-[#e27d60]' to="/">Início</Link>
                            <Link className='hover:text-[#e27d60]' to="/sobre">Sobre</Link>
                            <Link className='bg-[#e27d60] px-3 py-2 rounded-lg hover:bg-[#cc664a] transition-colors duration-300' to="/anunciar">Anuncie seu Imóvel</Link>
                        </div>
                        <button onClick={toggleMenu} className='md:hidden text-white'>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </nav>
                    {isMenuOpen && (
                        <div className='md:hidden bg-[#7a9e7e] py-4'>
                            <Link className='block text-white py-2 px-4 hover:bg-[#6b8d6f]' to="/">Início</Link>
                            <Link className='block text-white py-2 px-4 hover:bg-[#6b8d6f]' to="/sobre">Sobre</Link>
                            <Link className='block text-white py-2 px-4 bg-[#e27d60] hover:bg-[#cc664a]' to="/anunciar">Anuncie seu Imóvel</Link>
                        </div>
                    )}
                </header>
            </section>
        );
    }
}

