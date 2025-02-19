import { Icon } from "@sb1/ffe-icons-react";
import FavoriteIcon from "@sb1/ffe-icons/icons/filled/xl/favorite.svg";

interface Props {
    numberOfLives: number
}

export const LifeBar = ({ numberOfLives }: Props) => {
    return (
        <div className="pin-game-life-bar">
            {Array.from({ length: numberOfLives }).map((_, index) => (
                <Icon key={index} className="pin-game-life-bar__heart" size="xl" fileUrl={FavoriteIcon} />
            ))}
        </div>
    );
};
