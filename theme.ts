import {extendTheme, theme} from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      "html, body, #__next": {
        height: "100%",
        backgroundColor: "primary.800",
      },
    },
  },
  colors: {
    primary: theme.colors["gray"],
  },
});
