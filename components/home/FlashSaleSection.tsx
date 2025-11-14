
import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { flashSaleProducts } from '../../data/mockData';
import { formatPrice } from '../../utils/helpers';
import type { View } from '../../types';

interface FlashSaleSectionProps {
    navigate: (view: View) => void;
}

const CountdownTimer: React.FC = () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 5);
    const { hours, minutes, seconds } = useCountdown(futureDate);

    const TimerBox: React.FC<{ value: number }> = ({ value }) => (
        <span className="font-bold text-xl bg-white dark:bg-dark-bg text-primary px-2 py-1 rounded">
            {value.toString().padStart(2, '0')}
        </span>
    );
    
    return (
        <div className="flex items-center space-x-2 text-white">
            <TimerBox value={hours} />
            <span>:</span>
            <TimerBox value={minutes} />
            <span>:</span>
            <TimerBox value={seconds} />
        </div>
    );
}

const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({ navigate }) => {
    return (
        <div className="bg-secondary p-6 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Flash Sale</h2>
                <div className="flex items-center space-x-4 mt-2 md:mt-0">
                    <span className="text-white text-sm">Ending in:</span>
                    <CountdownTimer />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {flashSaleProducts.map(product => (
                    <div key={product.id} className="bg-light-card dark:bg-dark-card rounded-lg p-3 text-center cursor-pointer transform hover:-translate-y-1 transition-transform duration-300" onClick={() => navigate({ name: 'product', id: product.id })}>
                        <img src={product.images[0]} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
                        <h3 className="text-sm font-semibold truncate">{product.name}</h3>
                        <p className="text-primary font-bold">{formatPrice(product.price)}</p>
                        {product.originalPrice && <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary line-through">{formatPrice(product.originalPrice)}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FlashSaleSection;
