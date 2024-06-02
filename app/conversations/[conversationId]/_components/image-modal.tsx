import { ImgModal } from "@/components/modals/img-modal";
import Image from "next/image";


interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src?: string | null;
}

export const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src,
}) => {
    if (!src) {
        return null;
    };

    return (
        <ImgModal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-80 h-80">
                <Image 
                    src={src}
                    alt="Image"
                    fill
                    className="object-cover"
                />
            </div>       
        </ImgModal>
    );
};