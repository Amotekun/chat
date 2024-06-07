import { Modal } from "@/components/modals/modal"
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
    FieldValues, 
    SubmitHandler, 
    useForm 
} from "react-hook-form";
import { Input } from "@/components/inputs/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "@/components/button";
import axios from "axios";
import toast from "react-hot-toast";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser?: User;
};

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser = {} as User
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name ?? "",
            image: currentUser?.image ?? "",
        }
    });

    const image = watch('image')

    const handleUplaod = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true,
        });
    };
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/settings', data)
            .then(() => {
                toast.success("Profile updated")
                router.refresh();
                onClose();
            })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal
           isOpen={isOpen}
           onClose={onClose} 
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profile Settings
                        </h2>
                        <p className="mt-1 border-b text-sm leading-6 text-gray-600">
                            Edit your profile
                        </p>

                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input 
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <div>                            
                                <label 
                                    htmlFor="photo"
                                    className="block text-sm font-medium text-gray-900 leading-6"
                                >
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image 
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                        src={image || currentUser?.image || '/images/placeholder.jpg'}
                                        alt="Avatar"
                                    />
                                    <CldUploadButton
                                        options={{maxFiles: 1}}
                                        onSuccess={handleUplaod}
                                        uploadPreset="gombd4hn"
                                    >
                                        <Button
                                            type="button"
                                            secondary
                                            disabled={isLoading}
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6 ">
                    <Button
                        onClick={onClose}
                        secondary
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                    >
                        Save
                    </Button>

                </div>
            </form>
        </Modal>
    )
}