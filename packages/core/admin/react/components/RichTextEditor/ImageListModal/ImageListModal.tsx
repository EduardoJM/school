import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';

/**
 * API Image Item.
 */
interface ImageItem {
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
interface ImagesResponse {
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
 * A interface that describes the ImageListModal Props.
 */
export interface ImageListModalProps {
    /**
     * A boolean value indicating if the modal is opened.
     */
    opened: boolean;
    /**
     * A function called to close the modal without adding image.
     */
    handleClose: () => void;
    /**
     * A function called to close the modal adding image.
     */
    handleAddImage: (id: number, url: string, title: string) => void;
}

const ImageListModal: React.FC<ImageListModalProps> = (props) => {
    const { opened, handleClose, handleAddImage } = props;
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
    const {
        data,
        error,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery<ImagesResponse>(
        'imagesData',
        async ({ pageParam = 'http://localhost:8000/api/v1/image_list/' }) => {
            const res = await fetch(pageParam);
            return res.json();
        },
        {
            getPreviousPageParam: (firstPage) => firstPage.previous ?? false,
            getNextPageParam: (lastPage) => lastPage.next ?? false,
        },
    );

    /**
     * Called when the add button has clicked.
     */
    function handleAddClick() {
        if (!selectedImage) {
            handleClose();
            return;
        }
        handleAddImage(selectedImage.id, `http://localhost:8000/media/${selectedImage.image}`, selectedImage.title);
    }

    /**
     * Called when the load next button has clicked.
     */
    function handleLoadNext() {
        if (hasNextPage) {
            fetchNextPage();
        }
    }

    if (!opened) {
        return null;
    }
    return (
        <div className={`image-list-modal${opened ? ' opened' : ' closed'}`}>
            <div className="overlay">
                <div className="content">
                    <div className="content-top">
                        {error ? (
                            <div className="error-container">
                                Aconteceu um erro...
                            </div>
                        ) : (
                            <div className="image-list">
                                {data.pages.map((page) => (
                                    <React.Fragment key={page.next || 'http://localhost:8000/api/v1/image_list/'}>
                                        {page.results.map((img) => (
                                            <button
                                                type="button"
                                                key={img.id}
                                                className={`image-item${img === selectedImage ? ' current' : ''}`}
                                                title={img.title}
                                                onClick={() => setSelectedImage(img)}
                                            >
                                                <img src={`http://localhost:8000/media/${img.image}`} alt={img.title} />
                                            </button>
                                        ))}
                                    </React.Fragment>
                                ))}
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
                    </div>
                    <div className="content-footer">
                        <button type="button" className="btn btn-muted" onClick={handleClose}>Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={handleAddClick}>Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageListModal;
