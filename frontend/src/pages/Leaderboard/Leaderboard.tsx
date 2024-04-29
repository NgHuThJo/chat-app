// Third party
import { useEffect } from "react";
// Custom hooks
import useFetch from "../../utility/hooks/useFetch";
// Components
import List from "../../components/List/List";
// Types
import {
  ComponentBaseProps,
  GeneralObject,
} from "../../utility/types/utilityType";

const data: GeneralObject[] = [
  {
    id: 1,
    username: "JohnDoe",
    score: 200,
  },
];

function Leaderboard({ className = "list--leaderboard" }: ComponentBaseProps) {
  const { error, loading, fetchData } = useFetch();

  useEffect(() => {
    // fetchData("string");
    // console.log(data);
  }, []);

  if (error) {
    return <p>Error</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <List className={className}>
      {data.map((user: object) => (
        <li key={user.id}>
          <p>{user.username}</p>
          <p>{user.score}</p>
        </li>
      ))}
    </List>
  );
}

export default Leaderboard;
