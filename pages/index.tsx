import * as React from "react";
import {GetStaticProps} from "next";

import {Recipe} from "../recipe/types";
import api from "../recipe/api";
import RecipesScreen from "../recipe/screens/Recipes";

interface Props {
  recipes: Recipe[];
}

const IndexRoute: React.FC<Props> = ({recipes}) => {
  return <RecipesScreen recipes={recipes} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await api.list();

  return {
    revalidate: 3600 * 24,
    props: {
      recipes,
    },
  };
};

export default IndexRoute;
