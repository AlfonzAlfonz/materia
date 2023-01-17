import ModalUnstyled from "@mui/base/ModalUnstyled";
import styled, { x } from "@xstyled/emotion";
import clsx from "clsx";
import { FC, forwardRef, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  open: boolean;
  onOpen?: () => unknown;
  onClose?: () => unknown;
  children?: ReactNode;
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
      <x.div bg="#EFEFEF" p="22px">
        {children}
      </x.div>
    </BaseModal>
  );
};

// eslint-disable-next-line react/display-name
const BackdropUnstyled = forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const BaseModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
