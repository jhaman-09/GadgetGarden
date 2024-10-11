import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import displayCurrency from "../helper/displayCurrency";
import RecommendationProducts from "../components/RecommendationProducts";
import { useFetchAddToCart } from "../hooks/useFetchAddToCart";
import { categories } from "../helper/categoriesOptions";
import { useFetchProductDetails } from "../hooks/useFetchProductDetails";
import Review from "../components/Review";
import { useReviewProduct } from "../hooks/useReviewProduct";
import AddReview from "../components/AddReview";
const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
    category: "",
    discount: "",
    reviews: [],
  });
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  // for forcly re-reder this component again and again when detail of product change
  const [forceUpdate, setForceUpdate] = useState(0);

  const [reviewInput, setReviewInput] = useState({
    name: "",
    text: "",
    rating: 0,
  });

  const [openReviewAdd, setOpenReviewAdd] = useState(true);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Reviews scroll
  const [isReviewSectionVisible, setIsReviewSectionVisible] = useState(false);
  const reviewSectionRef = useRef(null);
  const scrollAbleSectionRef = useRef(null);

  const params = useParams();
  const navigate = useNavigate();

  const productDetails = useFetchProductDetails();

  const productImageLodingArray = new Array(4).fill(null);

  const fetchProductDetails = async (paramsId) => {
    setLoading(true);
    const jsonData = await productDetails(paramsId);
    if (jsonData.success) {
      setData(jsonData?.data);
      setActiveImage(jsonData?.data?.productImage[0]);
      setForceUpdate((prev) => prev + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails(params?.id);
  }, [params?.id]);

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const fetchAddToCart = useFetchAddToCart();

  const handleAddToCart = (e, product_id) => {
    fetchAddToCart(e, product_id);
  };

  const handleBuYNow = (e, product_id) => {
    fetchAddToCart(e, product_id);
    navigate("/cart");
  };

  // Scroll review and description
  const handleScroll = () => {
    const scrollAbleSection = scrollAbleSectionRef.current;
    const reviewSection = reviewSectionRef.current;

    if (scrollAbleSection && reviewSection) {
      const reviewPosition = reviewSection.getBoundingClientRect();
      const containerPosition = scrollAbleSection.getBoundingClientRect();

      // Check if review section is in view
      if (reviewPosition.top <= containerPosition.bottom) {
        setIsReviewSectionVisible(true);
      } else {
        setIsReviewSectionVisible(false);
      }
    }
  };

  useEffect(() => {
    const scrollAbleSection = scrollAbleSectionRef.current;
    if (scrollAbleSection) {
      scrollAbleSection.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollAbleSection) {
        scrollAbleSection.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // review, comment, replies

  const reviewProduct = useReviewProduct();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    const newReview = {
      reviewText: reviewInput.text,
      rating: reviewInput.rating,
      productId: params?.id,
    };

    const jsonData = await reviewProduct({ ...newReview });
    if (jsonData.success) {
      setData((prevData) => ({
        ...prevData,
        reviews: [...prevData.reviews, newReview],
      }));
    }
    setReviewInput({ name: "", rating: 0, text: "" });
    setIsSubmittingReview(true);
  };

  return (
    <div className="container mx-auto p-4 scrollBar-none">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex flex-col-reverse lg:flex-row  gap-4">
          {/* Side Product Images */}
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col scrollBar-none overflow-scroll h-full">
                {productImageLodingArray.map((ele, idx) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={"image" + idx}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollBar-none h-full">
                {data?.productImage?.map((imageUrl) => (
                  <div
                    key={imageUrl}
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                  >
                    <img
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      src={imageUrl}
                      alt="side_bar_products_image"
                      onMouseEnter={() => handleMouseEnterProduct(imageUrl)}
                      onClick={() => handleLeaveImageZoom(imageUrl)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Product Image */}
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt="main_product_image"
              className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {/* Main Product Image Zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* product Details */}

        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full">
              {" "}
            </h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>
          </div>
        ) : (
          <div className="flex flex-col gap-1 max-h-[500px]">
            <p className="bg-primary text-white px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium line-clamp-2">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            {/* {Stars Rating} */}
            <div className="flex items-center gap-1 text-xl text-primary">
              {data.reviews.map((review) => review.rating * <FaStar />)}
            </div>

            {/* {Price and Discount} */}

            <div className="flex lg:flex-row gap-2 lg:gap-2 lg:items-center my-1 text-2xl">
              <div className="flex items-center gap-2">
                <p className="text-primary  lg:text-3xl font-medium">
                  {displayCurrency(data?.sellingPrice)}
                </p>
                <p className="text-slate-400 lg:text-lg line-through font-medium">
                  {displayCurrency(data?.sellingPrice)}
                </p>
              </div>
              <p className="text-green-900 text-[20px] lg:text-lg font-medium">
                {Math.floor(data?.discount)}% off
              </p>
            </div>

            {/* {Buy and Sell Button} */}

            <div className="flex flex-col lg:flex-row gap-3 w-1/2 lg:w-full lg:items-center">
              <button
                className="border-2 border-primary rounded px-3 py-1 min-w-[125px] text-primary font-medium hover:bg-primary hover:text-white transition-all"
                onClick={(e) => handleBuYNow(e, data._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-pink-600 hover:border-primary rounded px-3 py-1 min-w-[125px] text-white bg-primary font-medium hover:bg-white hover:text-secondary transition-all"
                onClick={(e) => handleAddToCart(e, data._id)}
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-2">
              <p className="text-slate-700 font-medium">
                {isReviewSectionVisible ? "Reviews" : "Description"}
              </p>
              <div
                className="text-base lg:text-sm overflow-y-scroll max-h-[146px]"
                ref={scrollAbleSectionRef}
              >
                {/* {Description} */}
                <p className="mb-4">{data?.description}</p>

                {/* {Reviews} */}
                <div ref={reviewSectionRef}>
                  <p className="font-medium">Ratings & Reviews: </p>
                  {data?.reviews?.length > 0 ? (
                    data?.reviews.map((review, index) => (
                      <Review review={review} index={index} />
                    ))
                  ) : (
                    <p>No Any Review yet..!</p>
                  )}
                  <AddReview
                    handleReviewSubmit={handleReviewSubmit}
                    reviewInput={reviewInput}
                    setReviewInput={setReviewInput}
                    isSubmittingReview={isSubmittingReview}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {categories?.length > 0 && data?.category && (
        <>
          {/* In This Component, I have to forcly re-reder the whole componnet which is not a good practice */}
          <RecommendationProducts
            key={forceUpdate}
            category={data.category}
            heading={"Recommended Product"}
          />

          {categories?.map((ele) => {
            const isNotCurrentCategory =
              ele?.value.toString() !== data?.category;
            return (
              isNotCurrentCategory &&
              ele?.value &&
              ele?.value.length > 0 && (
                <RecommendationProducts
                  key={ele?.value}
                  category={ele?.value}
                  heading={"Recommended Product"}
                />
              )
            );
          })}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
