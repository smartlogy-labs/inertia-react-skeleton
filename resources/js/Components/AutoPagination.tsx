// resources/js/Components/Pagination.tsx
import { Link } from '@inertiajs/inertia-react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink as ShadcnPaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination';
import { router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export default function CustomPagination({ links }: PaginationProps) {
    const { url: currentUrl } = usePage();

    const previousLink = links.find((link) => link.label.includes("Previous"));
    const nextLink = links.find((link) => link.label.includes("Next"));
    const pageLinks = links.filter(
        (link) => !link.label.includes("Previous") && !link.label.includes("Next")
    );

    const handleNavigation = (url: string | null) => {
        if (url) {
            router.visit(url);
        }
    };

    if (links.length <= 3) {
        return null;
    }

    return (
        <Pagination className="flex justify-center mt-4">
            <PaginationContent className="flex items-center gap-2 p-2">
                {/* Previous Button - Selalu terlihat */}
                {previousLink?.url && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handleNavigation(previousLink.url)}
                            className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </PaginationPrevious>
                    </PaginationItem>
                )}

                {/* Page Numbers - Hanya tampil di tablet/desktop */}
                <div className="hidden sm:flex gap-2">
                    {pageLinks.map((link, index) => (
                        <PaginationItem key={index}>
                            <button
                                onClick={() => handleNavigation(link.url)}
                                className={`px-3 py-1 rounded-md ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                            >
                                {link.label.replace(/&laquo;|&raquo;/g, "").trim()}
                            </button>
                        </PaginationItem>
                    ))}
                </div>

                {/* Next Button - Selalu terlihat */}
                {nextLink?.url && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handleNavigation(nextLink.url)}
                            className="cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </PaginationNext>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}