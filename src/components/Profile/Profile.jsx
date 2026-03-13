import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onEditProfileClick,
  onLogOutClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <button
        type="button"
        className="profile__edit-button"
        onClick={onEditProfileClick}
      >
        Edit Profile
      </button>
      <button type="button" className="profile_logout" onClick={onLogOutClick}>
        Log Out
      </button>
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
