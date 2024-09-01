import { ITeamCardProps } from "@/app/interfaces/interfaces";



export default function TeamCardTwo({ img, name, desig }: ITeamCardProps) {
  return (
    <div className="single-volunteer single-volunteer-2">
      <img
        src={img}
        width={280}
        height={388}
        alt="volunteer img"
        className="thumb"
      />

      <div className="inner-box2">
        <h5>{name}</h5>
        <p>{desig}</p>
      </div>
    </div>
  );
}
