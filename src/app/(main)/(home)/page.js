import CollegeGallery from "@/components/Home/CollegeGallery";
import CollegeShowcase from "@/components/Home/CollegeShowcase";
import HeroSection from "@/components/Home/HeroSection";
import ResearchPapers from "@/components/Home/ResearchPapers";
import ReviewSection from "@/components/Home/ReviewSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <CollegeShowcase />
      <CollegeGallery />
      <ResearchPapers />
      <ReviewSection />
    </div>
  );
};

export default Home;
