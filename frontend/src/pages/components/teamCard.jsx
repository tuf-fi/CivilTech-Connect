import "../../css/home.css";

export default function teamCard({ img, name }) {
  const APP_URL = import.meta.env.VITE_APP_URL;

  return (
    <figure className="team-member">
      <div className="team-photo">
        <img
          src={`${APP_URL}/storage/${img}`}
          alt={`Portrait of ${name}`}
          loading="lazy"
        />
      </div>
      <figcaption className="team-name">{name}</figcaption>
    </figure>
  );
}
