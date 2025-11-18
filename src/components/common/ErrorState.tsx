import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export const ErrorState = ({
  title = "Error al cargar propiedades",
  message = "Intenta nuevamente en unos segundos.",
}: ErrorStateProps) => {
  return (
    <Alert variant="destructive">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

