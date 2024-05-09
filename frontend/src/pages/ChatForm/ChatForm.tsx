// Third party
import { useEffect } from "react";
// Custom hooks
import { useApiContext } from "../../utility/context/ApiContext";
// Components
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";

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

function ChatForm() {
  const { webSocketBaseUrl } = useApiContext();
  const socket = new WebSocket(webSocketBaseUrl);

  useEffect(() => {
    const handleOpen = (event) => {
      socket.send("Hello, Server!");
    };

    const handleMessage = (event) => {
      console.log("Message from server ", event.data);
    };

    socket.addEventListener("open", handleOpen);
    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("open", handleOpen);
      socket.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleSubmit = () => {};

  console.log("chat form");

  return (
    <Form
      method="post"
      className="room"
      fields={inputFields}
      onSubmit={handleSubmit}
    >
      <Button>Create new room</Button>
    </Form>
  );
}

export default ChatForm;
