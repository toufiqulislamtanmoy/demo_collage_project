import Footer from "@/components/Common/Footer";
import Navbar from "@/components/Common/Navbar";

const layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="mt-[80px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default layout;
