import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export const ConfirmDialog = ({
  modal,
  setModal,
  message,
  handleResolve,
}: {
  modal: boolean;
  setModal: (v: boolean) => void;
  message: string;
  handleResolve: () => void;
}) => {
  return (
    <Dialog open={modal}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={() => setModal(false)}
        className="max-w-1/3 outline-0"
      >
        <DialogHeader>
          <DialogTitle>Confirmar acción</DialogTitle>
        </DialogHeader>
        <p className="my-5">{message}</p>
        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={() => setModal(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleResolve();
              setModal(false);
            }}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
