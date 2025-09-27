import axiosClient from "@/utils/axiosClient";

export const uploadImage = async (file) => {
  if (!file) {
    return { uploaded_url: "", status: "Failed" };
  }
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosClient.post("/upload/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (response?.data?.status === "Success") {
    const uploaded_url = response?.data?.data?.url;
    return { uploaded_url: uploaded_url, status: "success" };
  } else {
    return { uploaded_url: "", status: "failed" };
  }
};
