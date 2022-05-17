import { Portal } from "~/components/portal";
import { useNavigate } from "@remix-run/react";

interface IModel {
  children: React.ReactNode;
  isOpen: boolean;
  ariaLabel?: string;
  className?: string;
}

export default function Modal({
  children,
  isOpen,
  ariaLabel,
  className,
}: IModel) {
  const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <Portal wrapperId='modal'>
      <div
        className='fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-80'
        aria-labelledby={ariaLabel ?? "modal-title"}
        role='dialog'
        aria-modal='true'
        onClick={() => navigate("/home")}></div>
      <div className='fixed inset-0 flex items-center justify-center max-h-screen overflow-scroll pointer-events-none'>
        <div
          className={`${className} p-4 bg-gray-200 pointer-events-auto max-h-screen md:rounded-xl`}>
          {/* This is where the modal content is rendered  */}
          {children}
        </div>
      </div>
    </Portal>
  );
}
