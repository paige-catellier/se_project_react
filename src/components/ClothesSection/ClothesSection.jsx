import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your Items</p>
        <button onClick={handleAddClick} className="clothes-section__add">
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onClick={handleCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
