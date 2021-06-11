export interface RawRecipe {
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  wpmagazine_modules_lite_featured_media_urls: {
    "cvmm-portrait": [
      string, // url
      number, // width
      number, // height
    ];
  };
  categories_names: Record<
    string,
    {
      name: string;
      link: string;
    }
  >;
}

export interface Recipe {
  link: string;
  excerpt: string;
  title: string;
  thumbnail: string;
  category: string;
}
