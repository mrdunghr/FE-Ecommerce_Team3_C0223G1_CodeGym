import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../firebase";

export default function MultipleUploadFireBase() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [uploading, setUploading] = useState(false); // State để theo dõi trạng thái tải lên

    const handleFileChange = (event) => {
        const files = event.target.files;
        const imageFiles = Array.from(files);

        setUploading(true); // Đặt uploading thành true khi bắt đầu tải lên

        Promise.all(imageFiles.map(uploadImageToFirebaseStorage)).then((downloadURLs) => {
            const newImages = selectedImages.concat(downloadURLs);
            setSelectedImages(newImages);
            setUploading(false); // Đặt uploading thành false sau khi tải lên hoàn tất
        });
    };

    const uploadImageToFirebaseStorage = async (file) => {
        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, "images/" + file.name);
            await uploadBytes(storageRef, file);
            const imageURL = await getDownloadURL(storageRef);
            return imageURL;
        } catch (error) {
            console.error("Lỗi khi tải hình ảnh lên Firebase Storage:", error);
        }
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />

            {/* Chỉ hiển thị nút khi không đang trong quá trình tải lên và có ít nhất một hình ảnh */}
            {!uploading && selectedImages.length > 0 && (
                <button>VÔ TÁC DỤNG</button>
            )}

            <div>
                {selectedImages.map((preview, index) => (
                    <img key={index} src={preview} alt={`Chọn ${index}`} width="100" height="100" />
                ))}
            </div>
        </div>
    );
}
// chọn ảnh upload luôn