import { useState } from 'react'
import { Home, Search, CirclePlus, Menu, LogOut, MapIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@/context/AuthContext'

const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/admin/' },
    { icon: CirclePlus, label: 'Cadastrar Imóveis', href: '/admin/cadastroimoveis' },
    { icon: Search, label: 'Consultar Imóveis', href: '/admin/consultaimoveis' },
    { icon: MapIcon, label: 'Mapa', href: '/admin/mapa' },
]

export function Sidebar() {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const primeirasLetras = user?.email.substring(0, 2).toUpperCase()

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
                        <h1 className="text-2xl font-bold text-primary">Painel Admin</h1>
                    </div>
                    <nav className="flex-1 overflow-y-auto py-5">
                        <ul className="p-6 space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        to={item.href}
                                        className="flex items-center p-2 rounded-lg hover:bg-accent transition-colors duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <item.icon className="mr-3 h-5 w-5 text-primary" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="p-6 space-y-6">
                        <Separator />
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10 border-2 border-primary">
                                <AvatarImage src={user?.photoURL || ''} alt={user?.email || ''} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {primeirasLetras}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => { signOut(auth) }}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </Button>
                    </div>
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

