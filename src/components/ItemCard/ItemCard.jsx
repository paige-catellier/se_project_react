import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import liked from "../../images/liked.svg";
import likebutton from "../../images/likebutton.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = currentUser && currentUser._id;
  const handleCardClick = () => {
    onCardClick(item);
  };
  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `likeButton ${
    isLiked ? "likeButton_active" : ""
  }`;

  const handleCardLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
      {isLoggedIn && (
        <button
          className={itemLikeButtonClassName}
          type="button"
          onClick={handleCardLike}
        >
          <img src={isLiked ? liked : likebutton} alt="Like button" />
        </button>
      )}
    </li>
  );
}

export default ItemCard;
