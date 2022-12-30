import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export const ModalPage:React.FC = () => {
    
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <div>
            <button onClick={onOpenModal}>Open modal</button>
            <Modal open = {open} onClose = {onCloseModal} center>
            <h2>Modal Name</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                hendrerit risus, sed porttitor quam.
                </p>
                <button>submit</button>
            </Modal>
        </div>
    );
};