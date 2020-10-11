import React, { useEffect, useState } from "react";
import "./Message.css";
function Message({ textArea }) {
  const [displayedMessage, setDisplayedMessage] = useState();

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      settingOutput(index);
    }, 5000);

    const settingOutput = () => {
      setDisplayedMessage(textArea[index]);
      if (index === textArea.length - 1) {
        clearInterval(timer);
      } else {
        index++;
      }
    };
  }, [textArea]);

  return (
    <div>
      <div className="testimonial">
        <div className="testimonial__author">{displayedMessage?.fullname}</div>
        <div className="testimonial__message">
          {displayedMessage?.textarea.length > 100
            ? displayedMessage?.textarea.slice(0, 100) + "..."
            : displayedMessage?.textarea}
        </div>
      </div>
    </div>
  );
}

export default Message;
