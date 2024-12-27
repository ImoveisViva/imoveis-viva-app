import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ModalImageGalleryProps {
    images: string[]
    initialIndex: number
}

export function ModalImageGallery({ images, initialIndex }: ModalImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = React.useState(initialIndex)
    const [open, setOpen] = React.useState(false)

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto w-full aspect-[3/3]">
                    <img
                        src={images[initialIndex]}
                        alt={`Property image ${initialIndex + 1}`}
                        className="w-full h-full object-cover rounded-sm"
                    />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80vw] max-h-[80vh] w-[800px] h-[600px] p-0">
                <div className="relative w-full h-full">
                    <img
                        src={images[currentIndex]}
                        alt={`Property image ${currentIndex + 1}`}
                        className="w-full h-full object-contain"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                        onClick={handlePrevious}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white bg-black/50 px-2 py-1 rounded-md">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

