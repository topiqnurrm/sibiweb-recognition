import { ReactNode } from 'react';

interface CardListProps {
    children: ReactNode;
}

const CardList = ({ children }: CardListProps) => {
    return (
        <div className="bg-[tomato] w-full p-4">
            {children}
        </div>
    );
};

export default CardList;