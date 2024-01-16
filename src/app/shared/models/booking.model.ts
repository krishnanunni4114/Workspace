export interface Booking {
    status: string;
    data: Data;
}

export interface Data {
    title: string;
    itemTitle: string;
    fromDate: string;
    toDate?: string;
    endDate: boolean;
    items: DataItem[];
}

export interface DataItem {
    displayText: string;
    image: string;
    displayOrder: number;
    count: number;
    isActive: boolean;
    selected: boolean;
    id: string;
    items: Item[];
}

export interface Item {
    unitPrice: number;
    itemName: string;
    subTitle: string;
    unitOfMeasure: string;
    minutes: number;
    id: string;
    sort: number;
    isPrefer?: boolean;
}

export interface OrderSummary {
    count: number;
    itemName: string;
    total: number;
    grandTotal: number;
}