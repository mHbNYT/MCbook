/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
import React, { MouseEventHandler } from "react";

const TwitterHeart : React.FC<{isLiked: boolean,
  onHeartClick: MouseEventHandler<HTMLDivElement>}> = ({ isLiked, onHeartClick }) => {
  const likeClass = isLiked ? 'is-active' : '';
  return (
    <div className="stage">
      <div className={`heart ${likeClass}`} onClick={onHeartClick} />
    </div>
  );
};

export default TwitterHeart;
