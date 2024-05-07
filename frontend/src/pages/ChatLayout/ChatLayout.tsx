// Components
import Sidebar from "../../components/Sidebar/Sidebar";
// Types
import { ComponentBaseProps } from "../../utility/types/utilityType";
// Styles
import styles from "./ChatLayout.module.css";

function ChatLayout() {
  return (
    <article className={styles.default}>
      <aside>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          nemo, totam accusantium dicta odio autem vel illum fugit quas voluptas
          recusandae iste deleniti nostrum dolores excepturi ab fuga repudiandae
          minus assumenda voluptatum in! Cum, corporis numquam. Beatae sint
          excepturi officiis fugit laudantium quo libero aliquid dolores. Ipsa
          eos harum explicabo?
        </p>
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
