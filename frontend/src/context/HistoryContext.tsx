import React, { createContext, useContext, useState, useEffect } from 'react';

interface HistoryItem {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface HistoryContextType {
    history: HistoryItem[];
    addToHistory: (item: HistoryItem) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('folkmint_history');
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const addToHistory = (item: HistoryItem) => {
        setHistory(prev => {
            const filtered = prev.filter(i => i.id !== item.id);
            const updated = [item, ...filtered].slice(0, 10); // Keep last 10
            localStorage.setItem('folkmint_history', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};
