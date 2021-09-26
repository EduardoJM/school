export interface Subject {
    id: number;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
}

export interface CursorPaginatedSubjects {
    results: Subject[];
    cursor: {
        afterCursor: string | null;
        beforeCursor: string | null;
    }
}
