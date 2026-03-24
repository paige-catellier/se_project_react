import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const itemAddButtonClassName = `clothes-section__add ${
    currentUser ? "" : "clothes-section__add_disabled"
  }`;

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your Items</p>
        <button onClick={handleAddClick} className={itemAddButtonClassName}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}
