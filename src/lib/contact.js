import { createContext, useContext } from 'react';

// Abre o diálogo "Falar com especialista" de qualquer ponto do site.
export const ContactContext = createContext(() => {});

export const useContact = () => useContext(ContactContext);
