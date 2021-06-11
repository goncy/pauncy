import {ParsedUrlQuery} from "querystring";

import * as React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {Recipe} from "../recipe/types";
import api from "../recipe/api";
import RecipesScreen from "../recipe/screens/Recipes";

interface Props {
  recipes: Recipe[];
}

interface Params extends ParsedUrlQuery {
  mock: string;
}

const IndexRoute: React.FC<Props> = ({recipes}) => {
  return <RecipesScreen recipes={recipes} />;
};

export const getStaticProps: GetStaticProps<unknown, Params> = async ({params}) => {
  const recipes = await api.mock.list(params.mock);

  return {
    revalidate: 10,
    props: {
      recipes,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: process.env.NODE_ENV === "production" ? false : "blocking",
  };
};

export default IndexRoute;
