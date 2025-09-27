import {
    ArrowRight,
    Calendar,
    GraduationCap,
    MapPin,
    Star,
    Users
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const CollegeCard = ({ college,redirect_for }) => {
  return (
    <div className="group bg-base rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={college.image || "/default-college.jpg"}
          alt={college.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        {college.rating && (
          <div className="absolute top-4 right-4 bg-base/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-foreground">
              {college.rating}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {college.name}
        </h2>

        {/* Location */}
        {college.location && (
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{college.location}</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">
              {college?.totalStudent?.toLocaleString() || "N/A"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <GraduationCap className="w-4 h-4 text-secondary" />
            <span className="text-foreground font-medium">
              {college?.researchPapers?.length || 0} research
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm col-span-2">
            <Calendar className="w-4 h-4 text-secondary" />{" "}
            <strong>Admission:</strong>
            <span className="text-foreground font-medium">
              {moment().isBetween(
                college?.admissionStart,
                college?.admissionEnd,
                "day",
                "[]"
              ) ? (
                <>
                  {moment(college?.admissionStart).format("DD MMM YYYY")} to{" "}
                  {moment(college?.admissionEnd).format("DD MMM YYYY")}
                </>
              ) : (
                <span className="text-red-500 font-semibold">Closed</span>
              )}
            </span>
          </div>
        </div>

        {/* Admission Date */}
        {college.admissionDate && (
          <div className="mb-4">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
              <span className="text-xs font-semibold text-primary">
                Admission: {college.admissionDate}
              </span>
            </div>
          </div>
        )}

        {/* Description (if available) */}
        {college.description && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
            {college.description}
          </p>
        )}

        {/* Action Button */}
        <Link
          href={`/${redirect_for}/${college._id}`}
          className="mt-auto flex items-center justify-center space-x-2 bg-primary text-primary-content py-3 px-4 rounded-lg font-semibold hover:bg-primary-focus transition-all duration-300 group/btn"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CollegeCard;
