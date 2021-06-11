import * as React from "react";
import Head from "next/head";
import {ChakraProvider, Text, Container, Link, Stack, Box, Center, Spinner} from "@chakra-ui/react";
import {AppProps} from "next/app";

import theme from "../theme";
import {Recipe} from "../recipe/types";

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  const [shuffled, setShuffled] = React.useState<Recipe[]>([]);

  React.useLayoutEffect(() => {
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
        <Container borderRadius="sm" height="100%" maxWidth="container.xl" padding={0}>
          <Stack height="100%">
            <Box height="100%" padding={4}>
              {shuffled.length ? (
                <Component {...pageProps} recipes={shuffled} />
              ) : (
                <Center height="100%">
                  <Spinner color="primary.50" />
                </Center>
              )}
            </Box>
            {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
            <Text color="primary.50" marginTop={4} padding={4} textAlign="center">
              © Copyright {new Date().getFullYear()}. Hecho con ♥ para la comunidad, por{" "}
              <Link isExternal href="https://gonzalopozzo.com">
                goncy
              </Link>
              .
            </Text>
            {/* Fin de copyright */}
          </Stack>
        </Container>
      </ChakraProvider>
    </>
  );
};

export default App;
