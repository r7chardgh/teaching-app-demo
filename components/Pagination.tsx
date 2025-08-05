'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ currentPage, totalPages }: { currentPage: number, totalPages: number }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`);
    }
    return (
        <nav className="flex justify-center gap-2 mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-neutral rounded disabled:opacity-50"
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded ${currentPage === page ? 'bg-accent text-white' : 'bg-textSecondary'
                        }`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-neutral rounded disabled:opacity-50"
            >
                Next
            </button>
        </nav>
    )
}

export default Pagination