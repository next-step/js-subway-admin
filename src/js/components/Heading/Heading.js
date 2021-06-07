const Heading = ({ level, className, children }) => {
  const $heading = document.createElement(`h${level}`);
  $heading.className = className;
  $heading.append(children);

  return $heading;
};

export default Heading;
