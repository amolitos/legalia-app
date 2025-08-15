import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Document } from "@/lib/types";
import { Label } from "../ui/label";

export const DetailDialog = ({
  document,
  setDocument,
}: {
  document: Document | null;
  setDocument: (v: Document | null) => void;
}) => {
  return (
    <Dialog open={document != null}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={() => setDocument(null)}
        className="max-w-1/3 outline-0"
      >
        <DialogHeader>
          <DialogTitle>{document?.original_filename}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div>
            <Label>Estatus</Label>
            <p className="text-neutral-600">{document?.ocr_status}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
