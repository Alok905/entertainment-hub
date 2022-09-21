import axios from "axios";
import { img_500, img_300, unavailable, noPicture } from "../../config/config";
import React, { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);
  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setCredits(data.cast);
    // console.log(data.cast);
  };
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };
  useEffect(() => {
    fetchCredits();
  }, []);

  const items = credits.map((c) => (
    <img
      src={c.profile_path ? `${img_300}/${c.profile_path}` : unavailable}
      alt={c?.name}
      onDragStart={handleDragStart}
    />
  ));
  // console.log(items);
  return (
    <AliceCarousel
      mouseTracking
      items={items}
      autoPlay
      infinite
      responsive={responsive}
    />
  );
};
export default Carousel;
