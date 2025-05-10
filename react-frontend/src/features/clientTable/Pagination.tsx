
import styles from './ClientTable.module.css';

interface Pagination {
    has_previous: boolean;
    has_next: boolean;
    previous_page_number?: number;
    next_page_number?: number;
    current_page: number;
    total_pages: number;
}

interface PaginationProps {
    pagination: Pagination
}


export function Pagination({ pagination }: PaginationProps) {
    const onPageChange = (page: number) => {
        // Logic to handle page change
        console.log(`Page changed to: ${page}`);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.total_pages) {
            onPageChange(page);
        }
    };

    return (
        <div className={styles.pagination}>
            <button onClick={() => handlePageChange(1)}>&laquo; first</button>
            <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
            >
                Previous
            </button>
            <span>
                Page {pagination.current_page} of {pagination.total_pages}
            </span>
            <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.total_pages}
            >
                Next
            </button>
            <button onClick={() => handlePageChange(pagination.total_pages)}>last &raquo;</button>

        </div>
    );
}