import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Alert className="max-w-md bg-background">
        <AlertTitle className="text-md font-semibold mb-2">
          Profil löschen
        </AlertTitle>

        <AlertDescription>
          <p className="mb-4">
            Möchtest du dein Profil wirklich unwiderruflich löschen?
          </p>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              Abbrechen
            </Button>
            <Button variant="default" onClick={onConfirm}>
              Löschen
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
