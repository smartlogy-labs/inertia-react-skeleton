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

    // Filter out previous and next links
    const previousLink = links.find((link) => link.label.includes('Previous'));
    const nextLink = links.find((link) => link.label.includes('Next'));
    const pageLinks = links.filter(
        (link) => !link.label.includes('Previous') && !link.label.includes('Next'),
    );

    const handleNavigation = (url: string | null) => {
        if (url) {
            router.visit(url);
        }
    };

    if (links.length == 3) {
        return (
            <>
            </>
        );
    }

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                {previousLink && previousLink.url && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handleNavigation(previousLink.url)}
                            className="cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" /> 
                        </PaginationPrevious>
                    </PaginationItem>
                )}

                {/* Page Numbers */}
                {pageLinks.map((link, index) => (
                    <PaginationItem key={index}>
                        <ShadcnPaginationLink
                            isActive={link.active}
                            onClick={() => handleNavigation(link.url)}
                            className="cursor-pointer"
                        >
                            {link.label.replace(/&laquo;|&raquo;/g, '').trim()}
                        </ShadcnPaginationLink>
                    </PaginationItem>
                ))}

                {/* Next Button */}
                {nextLink && nextLink.url && (
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handleNavigation(nextLink.url)}
                            className="cursor-pointer"
                        >
                            <ChevronRight className="h-4 w-4" /> 
                        </PaginationNext>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}