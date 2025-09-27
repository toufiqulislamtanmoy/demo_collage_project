import CollegeGalleryClient from "./CollegeGalleryClient";

const colleges = [
  {
    id: 1,
    name: "Oxford University",
    location: "Oxford, UK",
    students: 24500,
    photos: [
      {
        url: "https://images.unsplash.com/20/cambridge.JPG?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2047,
        height: 1365,
        caption: "Historic Campus Building",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 1922,
        height: 1281,
        caption: "Graduation Ceremony",
      },
      {
        url: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2070,
        height: 1380,
        caption: "Student Library",
      },
    ],
  },
  {
    id: 2,
    name: "Harvard University",
    location: "Cambridge, MA",
    students: 21000,
    photos: [
      {
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2070,
        height: 1380,
        caption: "Campus Grounds",
      },
      {
        url: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2070,
        height: 1380,
        caption: "Graduate Celebration",
      },
    ],
  },
  {
    id: 3,
    name: "Stanford University",
    location: "Stanford, CA",
    students: 17000,
    photos: [
      {
        url: "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2072,
        height: 1381,
        caption: "Modern Campus Architecture",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1691962725045-57ff9e77f0bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 1974,
        height: 1316,
        caption: "Research Laboratory",
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1663079426406-1b82fed16a79?q=80&w=2115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2115,
        height: 1410,
        caption: "Sports Facility",
      },
      {
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        width: 2070,
        height: 1380,
        caption: "Graduation Day",
      },
    ],
  },
];

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
