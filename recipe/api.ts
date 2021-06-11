import axios from "axios";

import {parseRecipes} from "./selectors";
import {Recipe, RawRecipe} from "./types";

export default {
  list: async (): Promise<Recipe[]> => {
    return axios
      .get<RawRecipe[]>("https://www.paulinacocina.net/wp-json/wp/v2/posts?categories=38")
      .then((response) => parseRecipes(response.data));
  },
  mock: {
    list: (mock: string): Promise<Recipe[]> =>
      import(`./mocks/${mock}.json`).then((result) => parseRecipes(result.default)),
  },
};
