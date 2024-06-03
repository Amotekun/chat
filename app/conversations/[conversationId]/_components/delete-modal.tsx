"use client";

import { Button } from "@/components/button";
import { Modal } from "@/components/modals/modal";
import { useConversation } from "@/hooks/use-conversation";
import { DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {conversationId} = useConversation();

    const onDelete = useCallback(() => {
        setIsLoading(true);

        axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
            onClose();
            toast.success("Conversation deleted successfully!")
            router.push('/conversations')
            router.refresh()
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false))
    }, [router, conversationId, onClose]);
    
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>
                <div>
                    <FiAlertTriangle 
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                    />
                </div>
                <div className="">
                    <DialogTitle
                        as="h3"
                        className=""
                    >
                        Delete Conversation
                    </DialogTitle>
                    <div className="">
                        <p className="">
                            Are you sure you want to delete this conversation? 
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                    disabled={isLoading}
                    danger
                    onClick={onDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>

            </div>     
        </Modal>
    )
}