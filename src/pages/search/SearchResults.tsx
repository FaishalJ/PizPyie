import styles from "../styles/searchResults.module.scss";
import { useNavigation } from "react-router-dom";

import Spinner from "../../components/Spinner";
import SearchPizzaItem from "../../components/SearchPizzaItem";

export default function SearchResults() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" ? <Spinner /> : <SearchPizzaItem />}
    </>
  )
}