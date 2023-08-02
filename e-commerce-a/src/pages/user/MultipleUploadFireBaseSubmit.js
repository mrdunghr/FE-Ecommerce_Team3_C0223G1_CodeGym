import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../firebase";
import Swal from "sweetalert2";

export default function MultipleUploadFireBaseSubmit() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const imageFiles = Array.from(files);
        setSelectedImages(imageFiles);
    };

    const handleUploadButtonClick = async () => {
        try {
            setUploading(true);

            const downloadURLs = await Promise.all(selectedImages.map(uploadImageToFirebaseStorage));

            setUploading(false);

            await Swal.fire({
                icon: 'success',
                title: 'Upload completed',
                text: 'All images have been successfully uploaded.',
            });

            // setSelectedImages([]);
            console.log(downloadURLs)
        } catch (error) {
            console.error("Error uploading images:", error);
            setUploading(false);
        }
    };

    const uploadImageToFirebaseStorage = async (file) => {
        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, "images/" + file.name);
            await uploadBytes(storageRef, file);
            const imageURL = await getDownloadURL(storageRef);
            return imageURL;
        } catch (error) {
            console.error("Error uploading image to Firebase Storage:", error);
            throw error; // Rethrow the error to be caught in handleUploadButtonClick
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleUploadButtonClick} disabled={uploading || selectedImages.length === 0}>
                Upload
            </button>
            {uploading && <p>Uploading...</p>}
            <div>
                {selectedImages.map((file, index) => (
                    <img key={index} src={URL.createObjectURL(file)} alt={`Chọn ${index}`} width="100" height="100" />
                ))}
            </div>
        </div>
    );
}
