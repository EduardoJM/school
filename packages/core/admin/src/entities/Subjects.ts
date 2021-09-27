export interface Subject {
    id: number;
    name: string;
    icon: string;
    active: boolean;
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

export interface CursorPaginationOptions {
    size?: string;
    after?: string;
    before?: string;
    search?: string;
    orderby?: string;
    order?: string;
}
