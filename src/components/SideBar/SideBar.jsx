import "./SideBar.css";
import Avatar from "../../images/avatar.png";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">Terrance Tegegne</p>
        <img src={Avatar} alt="Terrance Tegegne" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
