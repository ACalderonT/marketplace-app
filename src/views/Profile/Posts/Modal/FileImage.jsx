import { Input, Modal } from "antd";
import { useState } from "react";

const FileImage = ({ showModal, setShowModal, fileList, setFileList }) => {
    const [imageUrl, setImageUrl] = useState('');

    const handleAddImage = () => {
        if (imageUrl) {
            const newImage = {
                uid: Math.random(),
                name: 'image',
                status: 'done',
                url: imageUrl
            };
            setFileList([...fileList, newImage]);
            setImageUrl('');
            setShowModal(false);
        }
    };

    return (
        <>
            <Modal
                title="Add an image's url"
                open={showModal}
                onOk={handleAddImage}
                onCancel={() => setShowModal(false)}
            >
                <Input 
                    placeholder="input the url of the image"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </Modal>
        </>
    )
}

export default FileImage;