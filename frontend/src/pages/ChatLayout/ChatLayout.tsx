// Contexts
import { useEffect } from "react";
import { useApiContext } from "../../utility/context/ApiContext";
// Custom hooks
import useFetch from "../../utility/hooks/useFetch";
// Styles
import styles from "./ChatLayout.module.css";

function ChatLayout() {
  const { apiBaseUrl } = useApiContext();
  const { data, fetchData } = useFetch();

  // useEffect(async () => {
  //   const response = await fetchData(`${apiBaseUrl}/chat`, {
  //     method: "GET",
  //   });
  // });

  return (
    <article className={styles.default}>
      <aside></aside>
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
