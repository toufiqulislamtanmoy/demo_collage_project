import CollegeGalleryClient from "./CollegeGalleryClient";

const CollegeGallery = async () => {
  const base_url = process.env.BASE_API_URL;

  const res = await fetch(base_url + "/photos", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: {
      revalidate: 3600,
      tags: ["PHOTOS_GALLERY"],
    },
  });

  const response = await res.json();

  if (!response?.data?.length) return null;

  return <CollegeGalleryClient galleryItems={response?.data} />;
};

export default CollegeGallery;
