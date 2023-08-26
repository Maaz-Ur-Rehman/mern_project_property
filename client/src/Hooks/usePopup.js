import React, { useState } from "react";

function usePopup() {
  const [isPopupOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return {
    isPopupOpen,
    open,
    close,
  };
}

export default usePopup;
