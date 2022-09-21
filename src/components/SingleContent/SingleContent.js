import React from "react";
import "./SingleContent.css";
import { img_300, unavailable } from "../../config/config";

import Badge from "@mui/material/Badge";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="image"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <p className="title">{title}</p>
      <div className="date">
        <p className="media-type">
          {media_type === "tv" ? "TV Series" : "Movie"}
        </p>
        <p className="actual-date">{date}</p>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
