import history from '@/data/history.json';

export type HistoryItem = {
    num: number;
    version: string;
    date: string;
    notes?: string[];
}

export const loadedHistory: HistoryItem[] = history.sort(item => item.num);
export const latestVersionNum = loadedHistory[0].version;
