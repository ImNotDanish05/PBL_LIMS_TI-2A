import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function SampleUnConfirmDialog({ sample, isOpen, onOpenChange, onUnconfirm }) {
  if (!sample) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Batalkan Penyelesaian?
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-700 text-sm mb-6">
          Apakah kamu yakin ingin membatalkan status penyelesaian pada sampel
          <span className="font-bold text-primary-hijauTua"> {sample.title}</span>?
        </p>

        <DialogFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>

          <Button
            variant="destructive"
            onClick={() => onUnconfirm(sample)}
          >
            Ya, Batalkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
