import React, {useEffect, useRef} from "react";
const ScrollToSelectedListItem = ({isChosen, children}) => {
  const listItemRef = useRef(null);
  useEffect(() => {
    if (isChosen && listItemRef.current) {
      listItemRef.current.scrollIntoView({behavior: "smooth", block: "nearest"});
    }
  }, [isChosen]);
  return <span ref={listItemRef}>{children}</span>;
};
export default ScrollToSelectedListItem;
