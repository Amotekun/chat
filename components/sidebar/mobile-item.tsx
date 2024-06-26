import clsx from "clsx";
import Link from "next/link"

interface MobileItemProps {
    href: string;
    icon: any;
    isActive?: boolean;
    onClick?: () => void;
};

export const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    isActive,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }
    return (
        <Link
            onClick={handleClick}
            href={href}
            className={clsx(
                ` group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4  text-gray-500  hover:text-black  hover:bg-gray-100`,
                isActive && "bg-gray-100 text-black",
            )}
        >
            <Icon />
        </Link>
    );
}