"use client";
import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Heart,
  Share2,
  User,
} from "lucide-react";
import { useState } from "react";

const ResearchPapersCard = ({ paper, index }) => {
  const [likedPapers, setLikedPapers] = useState(new Set());

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

  return (
    <div
      key={paper.id}
      className={`break-inside-avoid mb-6 ${index % 3 === 1 ? "lg:mt-8" : ""} ${
        index % 3 === 2 ? "lg:mt-4" : ""
      }`}
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
              {paper?.category}
            </span>
            <button
              onClick={() => toggleLike(paper._id)}
              className={`p-2 rounded-full transition-all duration-200 ${
                likedPapers.has(paper._id)
                  ? "text-red-500 bg-red-500/10"
                  : "text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  likedPapers.has(paper._id) ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {paper?.title}
          </h3>

          <p className="text-muted-foreground text-sm line-clamp-3">
            {paper?.abstract}
          </p>
        </div>

        {/* Meta Information */}
        <div className="p-6 space-y-3 flex-1">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{paper.authors?.join(", ")}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date(paper?.publicationDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Download className="w-4 h-4" />
              <span>{paper?.totalDownloads?.toLocaleString()} downloads</span>
            </div>
            <span className="text-muted-foreground">{paper?.totalPages} pages</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {paper?.keywords?.map((tag, tagIndex) => (
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
              href={paper?.link}
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
  );
};

export default ResearchPapersCard;
