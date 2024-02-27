import { Modal } from "antd";

export interface DeleteItemModalProps {
  itemType: string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  removeItem: (id: string) => void;
}

function DeleteItemModal({
  itemType,
  isModalOpen,
  handleOk: handleRemove,
  handleCancel,
}: DeleteItemModalProps) {
  const title = "Remove " + itemType;
  return (
    <>
      <Modal
        wrapClassName="centered-modal"
        title={title}
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

export default DeleteItemModal;
