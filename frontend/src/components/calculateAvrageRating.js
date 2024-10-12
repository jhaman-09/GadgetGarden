import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // FaStarHalfAlt for half-stars

export const getAverageRating = (reviews) => {
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / reviews.length;
};

const renderStars = (avgRating) => {
  const fullStars = Math.floor(avgRating);
  const hasHalfStar = avgRating - fullStars >= 0.5;

  return (
    <>
      {/* Full Stars */}
      {Array.from({ length: fullStars }, (_, i) => (
        <FaStar key={i} />
      ))}
      {/* Half Star */}
      {hasHalfStar && <FaStarHalfAlt />}
    </>
  );
};

export const Reviews = ({ data }) => {
  const averageRating = getAverageRating(data.reviews);

  return (
    <div className="flex items-center gap-1 text-xl text-primary">
      {renderStars(averageRating)}
      <p className="text-white flex gap-2 items-center bg-green-700 rounded-md px-2 ml-2">
        {/* {Show rating at just one decimal place} */}
        {Math.round(getAverageRating(data.reviews) * 10)/10} <FaStar />   
      </p>
      {/* Optional: Show average value */}
    </div>
  );
};
