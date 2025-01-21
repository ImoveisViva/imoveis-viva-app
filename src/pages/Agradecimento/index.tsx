import { motion } from "framer-motion"
import { Footer } from "../components/Footer/Footer"
import { Header } from "../components/Header/Header"

export default function AgradecimentoPage() {
    const pageVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.5,
    }

    const childVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <motion.div variants={childVariants} transition={{ delay: 0.2 }}>
                <Header isHome={false} />
            </motion.div>
            <motion.main
                className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center"
                variants={childVariants}
                transition={{ delay: 0.4 }}
            >
                <div className="text-center">
                    <motion.h1
                        className="text-4xl font-bold text-[#7FA086] mb-4"
                        variants={childVariants}
                        transition={{ delay: 0.6 }}
                    >
                        Obrigado por entrar em contato!
                    </motion.h1>
                    <motion.p className="text-xl text-gray-600" variants={childVariants} transition={{ delay: 0.8 }}>
                        Nossa equipe retornará em breve para ajudá-lo da melhor forma.
                    </motion.p>
                </div>
            </motion.main>
            <motion.div variants={childVariants} transition={{ delay: 1 }}>
                <Footer />
            </motion.div>
        </motion.div>
    )
}