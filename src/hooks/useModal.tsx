import { useState } from "react";

export default function useModal() {
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setOpenModalId(id);
  };

  const closeModal = () => {
    setOpenModalId(null);
  };

  return {
    openModalId,
    openModal,
    closeModal,
  };
}
