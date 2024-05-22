

import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Textarea } from '@chakra-ui/react'; 

function PrescriptionModal({isOpen,onClose,onSubmit}) {
    const [prescriptionText, setPrescriptionText] = useState('');

    const handleSubmit = async () => {
        onSubmit(prescriptionText); 
        onClose();
      };


  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prescription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Textarea placeholder="Write your prescription here..."
           value={prescriptionText}
           onChange={(e) => setPrescriptionText(e.target.value)}
          />
       
         
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PrescriptionModal;
