import ModalUnstyled from "@mui/base/ModalUnstyled";
import styled, { x } from "@xstyled/emotion";
import { FC, forwardRef, ReactElement, ReactNode } from "react";

interface Props {
  open: boolean;
  onOpen?: () => unknown;
  onClose?: () => unknown;
  children: ReactElement;
}

export const Modal: FC<Props> = ({ open, onOpen, onClose, children }) => {
  return (
    <BaseModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={onClose}
      slots={{ backdrop: Backdrop }}
    >
      {children}
    </BaseModal>
  );
};

const BaseModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;

  align-items: flex-start;
  justify-content: center; 

  @media (min-width: md) {
    align-items: center;
  }
`;

const Backdrop = styled.div`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  -webkit-tap-highlight-color: transparent;
`;
