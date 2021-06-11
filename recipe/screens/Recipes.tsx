import * as React from "react";
import styled from "@emotion/styled";
import {useDisclosure} from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Link,
  Stack,
} from "@chakra-ui/react";

import {Recipe} from "../types";
import Card from "../../components/Card";

interface Props {
  recipes: Recipe[];
}

const Deck = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const RecipesScreen: React.FC<Props> = ({recipes}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [recipesStack, setRecipesStack] = React.useState<Recipe[]>(recipes);
  const [matches, setMatches] = React.useState<Recipe[]>([]);

  function handleVote(recipe: Recipe, result: boolean) {
    if (result) {
      setMatches((matches) => matches.concat(recipe));
    }

    setRecipesStack((recipeStack) => recipeStack.slice(0, -1));
  }

  function handleReset() {
    onClose();
    setRecipesStack(recipes);
    setMatches([]);
  }

  React.useEffect(() => {
    if (!recipesStack.length) {
      onOpen();
    }
  }, [recipesStack, matches, onOpen]);

  return (
    <>
      <Stack alignItems="center" height="100%">
        <Deck>
          {recipesStack.map((recipe, index) => (
            <Card
              key={recipe.link}
              drag={index === recipesStack.length - 1}
              recipe={recipe}
              onVote={handleVote}
            />
          ))}
        </Deck>
        <Stack direction="row" spacing={3}>
          <Button colorScheme="primary" isDisabled={!Boolean(matches.length)} onClick={onOpen}>
            Ver selección
          </Button>
          <Button
            colorScheme="red"
            isDisabled={recipesStack.length === recipes.length}
            onClick={handleReset}
          >
            Volver a empezar
          </Button>
        </Stack>
      </Stack>
      <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recetas matcheadas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {Boolean(matches.length) ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Receta</Th>
                    <Th>Link</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {matches.map((match) => (
                    <Tr key={match.link}>
                      <Td>{match.title}</Td>
                      <Td>
                        <Link isExternal href={match.link}>
                          Ver receta
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text color="primary.500" marginY={6} textAlign="center">
                No te decidiste por ninguna receta, volvé a empezar!
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="primary" variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecipesScreen;
