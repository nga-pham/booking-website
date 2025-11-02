import { Eye, HandHeart, Sparkles, Bath, Palette, Flame, Hand, LucideIcon } from "lucide-react";
import { Dropdown } from "react-bootstrap";

// interface of dropdown items
export interface DropdownItemProps {
    icon: LucideIcon;
    category: string;
    onClick?: () => void;
}

// Map categories to lucide-react icons
export const categoryIconMap: Record<string, LucideIcon> = {
    "Eyebrows and eyelashes": Eye,
    "Massage": HandHeart,
    "Nail": Hand,
    "Body": Sparkles,
    "Spa packages": Bath,
    "Makeup": Palette,
    "Waxing": Flame,
};

const DropdownItem = ({ icon: Icon, category, onClick }: DropdownItemProps) => {
    return (
        <Dropdown.Item onClick={onClick}>
            <Icon className="me-2" />{category}
        </Dropdown.Item>
    )
}

export default DropdownItem;

