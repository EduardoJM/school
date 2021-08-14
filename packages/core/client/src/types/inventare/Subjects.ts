export interface Subject {
    id: number;
    name: string;
    icon: string;
}

export interface SubjectPage {
    count: number;
    next: string | null;
    previous: string | null;
    results: Subject[];
}
