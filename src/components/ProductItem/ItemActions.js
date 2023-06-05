import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function ItemActions({ id, onEdit, onDelete }) {
  const router = useRouter();

  // Check if both onEdit and onDelete handlers are present
  const areHandlersPresent = !!onEdit && !!onDelete;

  if (areHandlersPresent) {
    return (
      <>
        <Button
          variant="contained"
          onClick={onEdit}
          style={{
            marginRight: '8px',
            backgroundColor: 'white',
            color: 'blue',
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          onClick={onDelete}
          style={{
            backgroundColor: 'white',
            color: 'red',
          }}
        >
          Delete
        </Button>
      </>
    );
  }

  return null;
}
