export interface Subject {
    id: number;
    name: string;
    icon: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedSubjects {
    results: Subject[];
    count: number;
    pages: number;
}

export interface SubjectsPaginationOptions {
    search?: string;
    page?: string;
}
