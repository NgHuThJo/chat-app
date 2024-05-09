// Third party
import { Link, useLocation } from "react-router-dom";
// Contexts
import { useEffect } from "react";
import { useApiContext } from "../../utility/context/ApiContext";
// Custom hooks
import useFetch from "../../utility/hooks/useFetch";
// Components
import List from "../../components/List/List";
// Types
import { GeneralObject } from "../../utility/types/utilityType";
// Styles
import styles from "./ChatLayout.module.css";

function ChatLayout() {
  const location = useLocation();
  const { apiBaseUrl } = useApiContext();
  const { data, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${apiBaseUrl}/chat`, {
      method: "GET",
    }).then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <article className={styles.default}>
      <aside>
        {data && (
          <List>
            {data.map((user: GeneralObject) => (
              <li key={user._id}>
                <Link to={`${location.pathname}/form`}>{user.username}</Link>
              </li>
            ))}
          </List>
        )}
      </aside>
      <section>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error mollitia
        esse possimus in blanditiis quia, est tenetur, nulla quaerat ad iusto
        facere quis ea veritatis voluptatem commodi molestias repellendus
        exercitationem beatae quidem. Corrupti error voluptatibus quisquam
        explicabo earum accusantium esse in, voluptatum, et aperiam ut minima
        iure consequuntur similique doloremque.
      </section>
    </article>
  );
}

export default ChatLayout;
