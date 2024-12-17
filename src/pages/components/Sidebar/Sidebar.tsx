import { useState } from 'react'
import { Home, Search, CirclePlus, Menu } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { Link } from 'react-router-dom'

const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/' },
    { icon: CirclePlus, label: 'Cadastrar Imóveis', href: '/admin/cadastroimoveis' },
    { icon: Search, label: 'Consultar Imóveis', href: '/admin/consultaimoveis' },
]

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <Button
                variant="ghost"
                className="fixed top-4 left-4 z-50 lg:hidden"
                onClick={toggleSidebar}
            >
                <Menu className="h-6 w-6" />
            </Button>
            <div className={cn(
                "fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-200 ease-in-out bg-background",
                "lg:relative lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full border-r">
                    <div className="flex items-center justify-center h-20 border-b">
                        <h1 className="text-xl font-bold">Painel admin</h1>
                    </div>
                    <nav className="flex-1 overflow-y-auto py-5">
                        <ul className="p-6 space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        to={item.href}
                                        className="flex items-center p-2 rounded-lg hover:bg-accent"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li className='pt-10'>
                                <Button className='w-full' onClick={() => { signOut(auth) }}>Sair</Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </>
    )
}

