import React from 'react';
import { useQuery } from 'react-query'

export interface ImageListProps {
    opened: boolean;
}

interface ImagesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        id: number;
        image: string;
        title: string;
    }[];
}

const ImageList: React.FC<ImageListProps> = (props) => {
    const { opened } = props;
    const { isLoading, error, data } = useQuery<ImagesResponse>('imagesData', () =>
        fetch('http://localhost:8000/api/v1/image_list').then(res => res.json())
    );

    return (
        <div className={`image-list-modal${opened ? ' opened' : ' closed'}`}>
            <div className="overlay">
                <div className="content">
                    {isLoading && (
                        <div className="loading-container">
                            Carregando...
                        </div>
                    )}
                    {error && (
                        <div className="error-container">
                            Aconteceu um erro...
                        </div>
                    )}
                    {!isLoading && !error && (
                        <>
                            {data.results.map((img) => (
                                <div key={img.id}>{img.title}</div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageList;
