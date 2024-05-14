import React, { useState, useEffect } from "react";
import { postFile, getFileList } from "../api/apiFile"; // apiFile에서 함수를 가져옵니다.
import ImageList from "../api/ImageList"; // ImageList 컴포넌트를 가져옵니다.
import UploadFile from "../api/UploadFile"; // UploadFile 컴포넌트를 가져옵니다.

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await getFileList();
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  // 배너 업로드 핸들러 (UploadFile 컴포넌트에서 사용될 예정)
  const handleImageUpload = async (formData) => {
    try {
      await postFile(formData);
      fetchBanners();
    } catch (error) {
      console.error("Error uploading banner:", error);
    }
  };

  return (
    <div>
      <h2>Banner Management</h2>
      <UploadFile handleImageUpload={handleImageUpload} />
      <ImageList imgData={banners} />
    </div>
  );
};

export default BannerManagement;
