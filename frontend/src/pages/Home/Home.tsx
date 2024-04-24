// Third party
import { Link } from "react-router-dom";
// Components
import Image from "../../components/Image/Image.js";
// Assets
import * as assets from "../../assets/assets.js";
import List from "../../components/List/List.js";

function Home() {
  return (
    <>
      <List className="list--home">
        {Object.values<string>(assets).map((asset, index) => (
          <li key={index}>
            <Link to={`/game/${index}`} state={{ src: asset }}>
              <Image className="image" src={asset}></Image>
            </Link>
          </li>
        ))}
      </List>
    </>
  );
}

export default Home;
