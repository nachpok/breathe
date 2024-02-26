import { useState } from "react";
import { Button, Modal } from "antd";

export interface DeleteSessionModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  removeSession: (id: string) => void;
}

function DeleteSessionModal({
  isModalOpen,
  handleOk: handleRemove,
  handleCancel,
}: DeleteSessionModalProps) {
  return (
    <>
      <Modal
        wrapClassName="centered-modal"
        title="Remove Session"
        open={isModalOpen}
        onOk={handleRemove}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            backgroundColor: "#FF0000",
            borderColor: "#FF0000",
            color: "white",
          },
        }}
      ></Modal>
    </>
  );
}

export default DeleteSessionModal;
