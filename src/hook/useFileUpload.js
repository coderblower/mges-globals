import React, { useState } from "react";
import AWS from "aws-sdk";
const S3_BUCKET = import.meta.env.VITE_S3_BUCKET;
AWS.config.update({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_REGION,
});

const s3 = new AWS.S3();

const useFileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const filename = `${Date.now()}-${file.name}`;
      const uploadParams = {
        Bucket: S3_BUCKET,
        Key: filename,
        Body: file,
        ContentType: file.type,
        ACL: "public-read",
      };
      try {
        setLoading(true);
        const response = await s3.upload(uploadParams).promise();
        setUrl(response.Location);
        setKey(response.Key);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    }
  };

  const handleDeleteImage = async (keyToDelete) => {
    const deleteParams = {
      Bucket: S3_BUCKET,
      Key: keyToDelete,
    };
    try {
      setLoading(true);
      await s3.deleteObject(deleteParams).promise();
      setUrl("");
      setKey("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return [
    url,
    key,
    setUrl,
    setKey,
    loading,
    handleFileChange,
    handleDeleteImage,
  ];
};

export default useFileUpload;
