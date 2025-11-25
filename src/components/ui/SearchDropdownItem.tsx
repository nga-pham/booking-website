import { Eye, HandHeart, Sparkles, Palette, Hand, PersonStanding, SmilePlus, Syringe, BriefcaseMedical, LucideIcon } from "lucide-react";
import { Dropdown } from "react-bootstrap";

// interface of dropdown items
export interface DropdownItemProps {
    icon: LucideIcon;
    category: string;
    onClick?: () => void;
}

// Map categories to lucide-react icons
export const categoryIconMap: Record<string, LucideIcon> = {
    "Body": PersonStanding,
    "Eyebrows and eyelashes": Eye,
    "Facials and Skincare": SmilePlus,
    "Hair and Styling": Sparkles, 
    "Injectables and fillers": Syringe, 
    "Makeup": Palette,
    "Massage": HandHeart,
    "Medical and dental": BriefcaseMedical,
    "Nails": Hand,
};

const DropdownItem = ({ icon: Icon, category, onClick }: DropdownItemProps) => {
    return (
        <Dropdown.Item onClick={onClick} className="d-flex align-items-center gap-3 p-2 rounded">
            <Icon className="me-2" />{category}
        </Dropdown.Item>
    )
}

export default DropdownItem;

