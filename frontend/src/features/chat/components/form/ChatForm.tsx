// Third party
import { useEffect } from "react";
// Components
import { Button } from "@/components/ui/button/Button";
import { Form } from "@/components/ui/form/Form";

const inputFields = [
  {
    type: "text",
    id: "roomname",
    name: "roomname",
    label: "Room name: ",
    placeholder: "Enter the name of this room...",
    error: "The room name does not satisfy requirements.",
  },
];

function ChatForm({ className = "room" }) {
  return (
    <Form
      method="post"
      className={className}
      fields={inputFields}
      onSubmit={handleSubmit}
    >
      <Button>Create new room</Button>
    </Form>
  );
}

export default ChatForm;
