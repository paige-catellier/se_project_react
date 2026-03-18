import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = currentUser && currentUser._id;
  const handleCardClick = () => {
    onClick(item);
  };
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `likeButton ${
    isLiked ? "likeButton_active" : ""
  }`;

  const handleLike = () => {
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
          onClick={handleLike}
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
