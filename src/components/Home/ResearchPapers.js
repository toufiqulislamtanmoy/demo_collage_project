"use client";
import {
  ExternalLink,
  FileText,
  Download,
  Calendar,
  User,
  Heart,
  Share2,
} from "lucide-react";
import { useState } from "react";

export default function ResearchPapers() {
  const [likedPapers, setLikedPapers] = useState(new Set());

  const researchPapers = [
    {
      id: 1,
      title: "Artificial Intelligence in Modern Education Systems",
      description:
        "Exploring how Artificial Intelligence and machine learning are transforming teaching methodologies and personalized learning experiences across global educational institutions.",
      link: "https://arxiv.org/abs/2101.00001",
      category: "AI & Education",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      downloads: 1247,
      tags: ["Artificial Intelligence", "EdTech", "Machine Learning"],
      pages: 24,
      color: "primary",
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions for Academic Campuses",
      description:
        "Comprehensive research on renewable energy adoption, carbon footprint reduction, and sustainable infrastructure development in university campuses worldwide.",
      link: "https://arxiv.org/abs/2102.00002",
      category: "Sustainability",
      author: "Prof. Michael Rodriguez",
      date: "2024-02-20",
      downloads: 892,
      tags: ["Renewable Energy", "Sustainability", "Campus Infrastructure"],
      pages: 32,
      color: "secondary",
    },
    {
      id: 3,
      title: "Mental Health Awareness and Support Systems for Students",
      description:
        "A longitudinal study on psychological challenges, stress management, and effective support systems for students during academic transitions and examination periods.",
      link: "https://arxiv.org/abs/2103.00003",
      category: "Psychology",
      author: "Dr. Emily Watson",
      date: "2024-01-08",
      downloads: 2156,
      tags: ["Mental Health", "Student Wellness", "Psychology"],
      pages: 18,
      color: "accent",
    },
    {
      id: 4,
      title: "Blockchain Technology for Secure Academic Records Management",
      description:
        "Innovative approach to secure, verifiable, and tamper-proof student data storage using blockchain technology and smart contracts in educational institutions.",
      link: "https://arxiv.org/abs/2104.00004",
      category: "Blockchain",
      author: "Dr. James Kumar",
      date: "2024-03-05",
      downloads: 1673,
      tags: ["Blockchain", "Security", "Academic Records"],
      pages: 28,
      color: "primary",
    },
    {
      id: 5,
      title: "The Future of Remote Learning: Post-Pandemic Perspectives",
      description:
        "Analysis of remote learning effectiveness, digital divide challenges, and hybrid education models based on post-pandemic educational data.",
      link: "https://arxiv.org/abs/2105.00005",
      category: "EdTech",
      author: "Dr. Lisa Thompson",
      date: "2024-02-12",
      downloads: 3041,
      tags: ["Remote Learning", "Hybrid Education", "Digital Transformation"],
      pages: 22,
      color: "secondary",
    },
    {
      id: 6,
      title: "Neuroscience Applications in Curriculum Design",
      description:
        "How brain-based learning research influences modern curriculum development and teaching strategies for enhanced student engagement and retention.",
      link: "https://arxiv.org/abs/2106.00006",
      category: "Neuroscience",
      author: "Prof. Robert Kim",
      date: "2024-01-30",
      downloads: 978,
      tags: ["Neuroscience", "Curriculum Design", "Learning Science"],
      pages: 19,
      color: "accent",
    },
  ];

  const toggleLike = (paperId) => {
    setLikedPapers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(paperId)) {
        newSet.delete(paperId);
      } else {
        newSet.add(paperId);
      }
      return newSet;
    });
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: "from-primary/20 to-primary/5 border-primary/10",
      secondary: "from-secondary/20 to-secondary/5 border-secondary/10",
      accent: "from-accent/20 to-accent/5 border-accent/10",
    };
    return colors[color] || colors.primary;
  };

  const getTextColor = (color) => {
    const colors = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
    };
    return colors[color] || colors.primary;
  };

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
            <div
              key={paper.id}
              className={`break-inside-avoid mb-6 ${
                index % 3 === 1 ? "lg:mt-8" : ""
              } ${index % 3 === 2 ? "lg:mt-4" : ""}`}
            >
              <div
                className={`bg-gradient-to-br ${getColorClasses(
                  paper.color
                )} border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden h-full flex flex-col`}
              >
                {/* Header */}
                <div className="p-6 border-b border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getTextColor(
                        paper.color
                      )} bg-base/50 backdrop-blur-sm`}
                    >
                      {paper.category}
                    </span>
                    <button
                      onClick={() => toggleLike(paper.id)}
                      className={`p-2 rounded-full transition-all duration-200 ${
                        likedPapers.has(paper.id)
                          ? "text-red-500 bg-red-500/10"
                          : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedPapers.has(paper.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {paper.title}
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {paper.description}
                  </p>
                </div>

                {/* Meta Information */}
                <div className="p-6 space-y-3 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{paper.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(paper.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Download className="w-4 h-4" />
                      <span>{paper.downloads.toLocaleString()} downloads</span>
                    </div>
                    <span className="text-muted-foreground">
                      {paper.pages} pages
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {paper.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-base text-foreground/70 rounded-md text-xs border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-border/50">
                  <div className="flex items-center space-x-3">
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary text-primary-content py-2 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-all duration-300 flex items-center justify-center space-x-2 group/link"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Read Paper</span>
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>

                    <button className="p-2 border border-border text-foreground rounded-lg hover:bg-base transition-colors group/share">
                      <Share2 className="w-4 h-4 group-hover/share:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
}
