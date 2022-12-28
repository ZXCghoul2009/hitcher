import React from 'react';
import { Dialog } from "@headlessui/react";

interface FilterPopupProps {
  isOpen: boolean,
}

export const FilterPopup: React.FC<FilterPopupProps> = ({isOpen}) => {
  return (
      <Dialog onClose={()=>false} open={isOpen} >
        
      </Dialog>
  );
};

