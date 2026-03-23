import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleCardLike,
  handleAddClick,
  onEditProfileClick,
  onLogOutClick,
}) {
  return (
    <section className="profile">
      <div className="profile__action-buttons">
        <SideBar />
        <button
          type="button"
          className="profile__edit-button"
          onClick={onEditProfileClick}
        >
          Change Profile Data
        </button>
        <button
          type="button"
          className="profile__logout"
          onClick={onLogOutClick}
        >
          Log Out
        </button>
      </div>
      <ClothesSection
        handleCardClick={handleCardClick}
        handleCardLike={handleCardLike}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
