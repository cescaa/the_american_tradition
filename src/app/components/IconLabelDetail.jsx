import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconLabelDetail({
  icon,
  text,
  iconSize = "text-xs",
  textSize = 3,
}) {
  return (
    <div className="flex items-center gap-1">
      <FontAwesomeIcon icon={icon} className={`text-primary ${iconSize}`} />
      {textSize <= 3 ? <h4>{text}</h4> : <h3>{text}</h3>}
    </div>
  );
}
