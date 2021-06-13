import * as React from "react";
import Head from "next/head";
import {ChakraProvider, Box, Center, Spinner} from "@chakra-ui/react";
import {AppProps} from "next/app";

import theme from "../theme";
import {Recipe} from "../recipe/types";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  const [shuffled, setShuffled] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    if (pageProps.recipes) setShuffled([...pageProps.recipes].sort(() => 0.5 - Math.random()));
  }, [pageProps.recipes]);

  return (
    <>
      <Head>
        <title>Recetas de Paulina Cocina</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        {/* Inicio de meta tags de licencia - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
        <meta content="goncy" name="author" />
        <meta content="Gonzalo Pozzo" name="copyright" />
        {/* Fin de meta tags de licencia */}
      </Head>
      <ChakraProvider theme={theme}>
        <Box height="100%">
          {shuffled.length ? (
            <Component {...pageProps} recipes={shuffled} />
          ) : (
            <Center height="100%">
              <Spinner color="primary.50" />
            </Center>
          )}
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
