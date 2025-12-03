import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function SampleConfirmDialog({ sample, isOpen, onOpenChange, onConfirm }) {
  if (!sample) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Konfirmasi Tindakan
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-700 text-sm mb-6">
          Apakah kamu yakin ingin menyelesaikan proses untuk sampel:
          <span className="font-bold text-primary-hijauTua"> {sample.name}</span>?
        </p>

        <DialogFooter className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>

          <Button
            className="bg-primary-hijauTua"
            onClick={() => onConfirm(sample)}
          >
            Ya, Selesaikan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
