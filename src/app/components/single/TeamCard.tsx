import { ITeamCardProps } from "@/app/interfaces/interfaces";

export default function TeamCard({
  img,
  name,
  desig,
  facebook,
  twitter,
  instagram,
  linkedin
}: ITeamCardProps) {
  return (
    <div className="single-volunteer">
      <img
        src={img}
        width={280}
        height={388}
        alt="volunteer img"
        className="thumb"
      />

      <div className="inner-box">
        <h5>{name}</h5>
        <p>{desig}</p>

        <div className="social-wrapper">
          {facebook && (
            <a target="_blank" href={facebook}>
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          )}

          {twitter && (
            <a target="_blank" href={twitter}>
              <i className="fa-brands fa-twitter"></i>
            </a>
          )}

          {instagram && (
            <a target="_blank" href={instagram}>
              <i className="fa-brands fa-square-instagram"></i>
            </a>
          )}

          {linkedin && (
            <a target="_blank" href={linkedin}>
              <i className="fa-brands fa-linkedin"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
