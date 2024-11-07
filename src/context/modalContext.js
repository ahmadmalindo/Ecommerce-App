import { createContext, useContext, useState, useCallback } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState({});
  
    const showModal = useCallback((modalId, props = {}) => {
      setModals(prev => ({
        ...prev,
        [modalId]: { isVisible: true, props }
      }));
    }, []);
  
    const hideModal = useCallback((modalId) => {
      setModals(prev => ({
        ...prev,
        [modalId]: { isVisible: false, props: prev[modalId]?.props || {} }
      }));
    }, []);
  
    return (
      <ModalContext.Provider value={{ showModal, hideModal, modals }}>
        {children}
      </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};