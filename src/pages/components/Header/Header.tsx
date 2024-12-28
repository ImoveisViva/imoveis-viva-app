interface Propstype {
    isHome: boolean;
}

export function Header({ isHome }: Propstype) {
    return (
        <div>
            {isHome ? (
                <div>
                    Home
                </div>
            ) : (
                <div>
                    nao home
                </div>
            )
            }
        </div>
    )
}