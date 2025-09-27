import { Award, MessageCircle, Quote, Star, ThumbsUp } from "lucide-react";
import moment from "moment";
import Image from "next/image";

const ReviewSection = async () => {
  const base_url = process.env.BASE_API_URL;

  const res = await fetch(base_url + "/reviews", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: {
      revalidate: 3600,
      tags: ["REVIEWS"],
    },
  });

  console.log(res);
  const response = await res.json();

  if (!response?.data?.length) return null;

  const reviews = response?.data;

  // return <pre>{JSON.stringify(reviews, null, 2)}</pre>

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < rating
            ? "text-yellow-500 fill-yellow-500"
            : "text-muted-foreground/30"
        } transition-transform hover:scale-110`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-base to-muted/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              STUDENT REVIEWS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from students who have transformed their lives
            through quality education.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {reviews.map((review, index) => (
            <div
              key={review._id}
              className={`break-inside-avoid mb-6 ${
                index % 3 === 1 ? "lg:mt-8" : ""
              } ${index % 3 === 2 ? "lg:mt-4" : ""}`}
            >
              <div className="bg-base rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-border overflow-hidden h-full flex flex-col">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-16 h-16 text-primary" />
                </div>

                {/* Review Content */}
                <div className="p-6 flex-1">
                  {/* Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <Image
                        src={review?.user?.photo}
                        alt={review?.user?.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-primary/20"
                      />

                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3 text-primary-content" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground text-lg truncate">
                          {review?.user?.name}
                        </h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {moment(review?.createdAt).format("MMM DD, YYYY")}
                        </span>
                      </div>

                      <p className="text-primary font-medium text-sm mb-2">
                        {review?.college?.name}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      {renderStars(review?.rating)}
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {review?.rating}.0
                    </span>
                  </div>

                  {/* Comment */}
                  <div className="relative">
                    <Quote className="w-6 h-6 text-primary/30 mb-2" />
                    <p className="text-foreground/80 leading-relaxed text-sm pl-2">
                      "{review?.review}"
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors group/like">
                        <ThumbsUp className="w-4 h-4 group-hover/like:scale-110 transition-transform" />
                        <span className="text-sm">{review?.likes || 0}</span>
                      </button>

                      <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors group/reply">
                        <MessageCircle className="w-4 h-4 group-hover/reply:scale-110 transition-transform" />
                        <span className="text-sm">{review.replies || 0}</span>
                      </button>
                    </div>

                    <button className="text-xs text-primary hover:text-primary-focus font-medium transition-colors">
                      Read Full Story
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-base rounded-2xl border border-border">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Student Reviews</div>
          </div>
          <div className="text-center p-6 bg-base rounded-2xl border border-border">
            <div className="text-3xl font-bold text-secondary mb-2">4.8</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-base rounded-2xl border border-border">
            <div className="text-3xl font-bold text-accent mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Recommend</div>
          </div>
          <div className="text-center p-6 bg-base rounded-2xl border border-border">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Colleges Rated</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Share Your Experience
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Help future students make informed decisions by sharing your
              college experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-primary text-primary-content rounded-xl font-semibold hover:bg-primary-focus transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all duration-300">
                Browse All Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
