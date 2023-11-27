import { useState } from "react";

export default function useModal() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return {
    showModal,
    toggleModal,
  };
}
