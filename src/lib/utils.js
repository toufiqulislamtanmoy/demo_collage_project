import axiosClient from "@/utils/axiosClient";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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
    return { uploaded_url: uploaded_url, status: "Success" };
  } else {
    return { uploaded_url: "", status: "Failed" };
  }
};
