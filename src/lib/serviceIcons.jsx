// src/lib/serviceIcons.jsx
import {
    FaBaby,
    FaPuzzlePiece,
    FaSyringe,
    FaBrain,
    FaHeart,
} from "react-icons/fa";

import { GiBabyBottle } from "react-icons/gi";
import { MdPregnantWoman } from "react-icons/md";
import { FaWalking } from "react-icons/fa";


export function getServiceIcon(iconName, className = "text-3xl") {
    const icons = {
        babyBottle: <GiBabyBottle className={className} />,
        puzzle: <FaPuzzlePiece className={className} />,
        syringe: <FaSyringe className={className} />,
        leg: <FaWalking className={className} />, 
        brain: <FaBrain className={className} />,
        mother: <MdPregnantWoman className={className} />, 
        heart: <FaHeart className={className} />,
    };

    return icons[iconName] || <FaBaby className={className} />;
}