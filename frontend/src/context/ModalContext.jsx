import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Nueva función para abrir modal con proyecto específico
  const openProjectModal = (projectIndex) => {
    setSelectedProjectIndex(projectIndex);
    setIsModalOpen(true);
  };

  return (
    <ModalContext.Provider value={{ 
      isModalOpen, 
      openModal, 
      closeModal, 
      selectedProjectIndex, 
      openProjectModal 
    }}>
      {children}
    </ModalContext.Provider>
  );
};
