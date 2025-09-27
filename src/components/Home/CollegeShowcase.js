import {
  ArrowRight,
  TrendingUp
} from "lucide-react";
import CollageShowcaseCard from "./CollageShowcaseCard";
import ContentNotFound from "../Common/ContentNotFound";

const CollegeShowcase = async () => {
  const base_url = process.env.BASE_API_URL;

  const res = await fetch(base_url + "/universities/highlighted", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: {
      revalidate: 3600,
      tags: ["HIGHLIGHTED_UNIVERSITIES"],
    },
  });

  const topColleges = await res.json();

  if (!topColleges?.data?.length)
    return null;

  return (
    <section className="py-20 bg-gradient-to-br from-background via-base to-muted/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              TOP RATED
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Colleges
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover world-class institutions that have consistently excelled in
            education, research, and student experience.
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {topColleges?.data?.map((college, index) => (
            <CollageShowcaseCard
              key={college.id}
              college={college}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Ready to Find Your Perfect College?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Explore our comprehensive database of 500+ colleges and
              universities worldwide. Compare programs, admission requirements,
              and campus life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Browse All Colleges</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300">
                Compare Colleges
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollegeShowcase;
