import {
  FileText
} from "lucide-react";
import ResearchPapersCard from "./ResearchPapersCard";

const ResearchPapers = async () => {
  const base_url = process.env.BASE_API_URL;

  const res = await fetch(base_url + "/research", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: {
      revalidate: 3600,
      tags: ["PHOTOS_GALLERY"],
    },
  });

  const response = await res.json();

  if (!response?.data?.length) return null;

  const researchPapers = response?.data;

  return (
    <section className="py-20 bg-gradient-to-br from-background via-base to-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              RESEARCH PAPERS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Research
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover groundbreaking research papers that are shaping the future
            of education and technology.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {researchPapers.map((paper, index) => (
            <ResearchPapersCard paper={paper} index={index} key={paper?._id} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Want to Publish Your Research?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our academic community and share your groundbreaking research
              with educators and students worldwide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Submit Paper</span>
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300">
                Browse Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchPapers;