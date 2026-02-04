import { useState } from "react";

function ImageUpload({ onUploadSuccess }) {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const uploadToCloudinary = async () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "photoshoot_upload"); // Cloudinary preset name

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dpkf6qwvw/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (data.secure_url) {
                if (onUploadSuccess) {
                    onUploadSuccess(data.secure_url);
                }
                setFile(null);
                alert("Image Uploaded Successfully!");
            } else {
                throw new Error(data.error?.message || "Upload failed");
            }
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            alert("Upload failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 border-2 border-dashed border-gray-300 p-8 rounded-lg">
            <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100 cursor-pointer"
            />

            {file && (
                <div className="text-sm text-gray-600">
                    Selected: {file.name}
                </div>
            )}

            <button
                onClick={uploadToCloudinary}
                disabled={!file || loading}
                className={`px-6 py-2 rounded font-bold text-white transition ${!file || loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                    }`}
            >
                {loading ? "Uploading..." : "Upload Image"}
            </button>
        </div>
    );
}

export default ImageUpload;
