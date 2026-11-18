import "../../css/home.css";
import { toast } from "react-toastify";

export default function featureCard({
  title,
  label,
  desc,
  imgSrc,
  navigate,
  user,
}) {
  const handleNavigate = () => {
    if (title === "OJT Companies" && !user) {
      toast.info("You must be logged in to access OJT Companies!");
      return; // Don't navigate if not logged in for OJT Companies
    }
    navigate();
  };

  return (
    <div className="offer-row">
      <img
        className="offer-badge"
        src={imgSrc}
        alt={label || ""}
        width="96"
        height="96"
        loading="lazy"
      />
      <p className="offer-desc">{desc}</p>
      <button type="button" className="offer-link" onClick={handleNavigate}>
        Explore <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
