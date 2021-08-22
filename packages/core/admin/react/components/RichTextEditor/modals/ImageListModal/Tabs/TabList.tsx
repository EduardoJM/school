import React, { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

/**
 * API Image Item.
 */
export interface ImageItem {
    /**
     * Image ID
     */
    id: number;
    /**
     * Image URL.
     */
    image: string;
    /**
     * Image Title.
     */
    title: string;
}

/**
 * API Images Response.
 */
export interface ImagesResponse {
    /**
     * Items Count.
     */
    count: number;
    /**
     * Next Page API URL.
     */
    next: string | null;
    /**
     * Previours Page API URL.
     */
    previous: string | null;
    /**
     * Page Images Results.
     */
    results: ImageItem[];
}

/**
 * A interface that describes the TabList Props.
 */
export interface TabListProps {
    /**
     * The selected image.
     */
    selectedImage: ImageItem | null;
    /**
     * A function that called when the selected image needs to be changed.
     */
    handleSelectImage: (img: ImageItem | null) => void;
}

const TabList: React.FC<TabListProps> = (props) => {
    const { selectedImage, handleSelectImage } = props;
    const {
        data,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<ImagesResponse>(
        'imagesData',
        async ({ pageParam = `${process.env.API_URL}/api/v1/image_list/` }) => {
            const res = await fetch(pageParam);
            return res.json();
        },
        {
            getPreviousPageParam: (firstPage) => firstPage.previous ?? false,
            getNextPageParam: (lastPage) => lastPage.next ?? false,
        },
    );
    const resultsCount = useMemo(() => {
        let result = 0;
        if (data) {
            data.pages.forEach((page) => {
                result += page.results.length;
            });
        }
        return result;
    }, [data]);

    /**
     * Called when the load next button has clicked.
     */
    function handleLoadNext() {
        if (hasNextPage) {
            fetchNextPage();
        }
    }

    return (
        <>
            {error && (
                <div className="error-container">
                    Aconteceu um erro...
                </div>
            )}
            {!error && resultsCount === 0 && !isFetchingNextPage && (
                <div className="error-container">
                    Ainda não existem imagens cadastradas...
                </div>
            )}
            {!error && (
                <div className="image-list">
                    {data && (
                        <>
                            {data.pages.map((page) => (
                                <React.Fragment key={page.next || `${process.env.API_URL}/api/v1/image_list/`}>
                                    {page.results.map((img) => (
                                        <button
                                            type="button"
                                            key={img.id}
                                            className={`image-item${img === selectedImage ? ' current' : ''}`}
                                            title={img.title}
                                            onClick={() => handleSelectImage(img)}
                                        >
                                            <img src={`${process.env.API_URL}/media/${img.image}`} alt={img.title} />
                                        </button>
                                    ))}
                                </React.Fragment>
                            ))}
                        </>
                    )}
                    {hasNextPage && (
                        <button
                            type="button"
                            className="image-item load-item"
                            onClick={handleLoadNext}
                        >
                            {isFetchingNextPage ? (
                                <>
                                    <i className="material-icons">refresh</i>
                                    <span>Carregando...</span>
                                </>
                            ) : (
                                <>
                                    <i className="material-icons">more_horiz</i>
                                    <span>Mais</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default TabList;
