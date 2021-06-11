import {RawRecipe, Recipe} from "./types";

export function parseRecipes(recipes: RawRecipe[]): Recipe[] {
  return recipes.map((recipe) => ({
    link: recipe.link,
    categories: Object.values(recipe.categories_names).map((category) => category.name),
    excerpt: recipe.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 140),
    title: recipe.title.rendered,
    thumbnail: recipe.wpmagazine_modules_lite_featured_media_urls["cvmm-portrait"][0],
  }));
}
