import React, { useState } from 'react';
import { TabList, ImageItem, TabUpload } from './Tabs';

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
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

    /**
     * Called when the add button has clicked.
     */
    function handleAddClick() {
        if (!selectedImage) {
            handleClose();
            return;
        }
        handleAddImage(selectedImage.id, `${process.env.API_URL}/media/${selectedImage.image}`, selectedImage.title);
    }

    if (!opened) {
        return null;
    }

    return (
        <div className={`image-list-modal${opened ? ' opened' : ' closed'}`}>
            <div className="overlay">
                <div className="content">
                    <div className="content-header">
                        <button
                            type="button"
                            onClick={() => setCurrentTab(0)}
                        >
                            Galeria
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurrentTab(1)}
                        >
                            Enviar
                        </button>
                    </div>
                    <div className="content-top">
                        {currentTab === 0 && (
                            <TabList
                                selectedImage={selectedImage}
                                handleSelectImage={setSelectedImage}
                            />
                        )}
                        {currentTab === 1 && (
                            <TabUpload
                                uploadSuccess={() => setCurrentTab(0)}
                            />
                        )}
                    </div>
                    {currentTab === 0 && (
                        <div className="content-footer">
                            <button
                                type="button"
                                className="btn btn-muted"
                                onClick={handleClose}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddClick}
                                disabled={selectedImage === null}
                            >
                                Adicionar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageListModal;
