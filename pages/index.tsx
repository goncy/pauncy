import * as React from "react";
import {GetStaticProps} from "next";

import {Recipe} from "../recipe/types";
import api from "../recipe/api";
import RecipesScreen from "../recipe/screens/Recipes";

interface Props {
  recipes: Recipe[];
}

const IndexRoute: React.FC<Props> = ({recipes}) => {
  const [shuffled, setShuffled] = React.useState(recipes);

  React.useEffect(() => {
    setShuffled((items) => [...items].sort(() => 0.5 - Math.random()));
  }, []);

  return <RecipesScreen recipes={shuffled} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await api.list();

  return {
    revalidate: 3600,
    props: {
      recipes,
    },
  };
};

export default IndexRoute;
