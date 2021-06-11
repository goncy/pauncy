import React, {useRef, useEffect, useState} from "react";
import {Stack, Text, Box} from "@chakra-ui/react";
import {motion, useMotionValue, useAnimation, MotionProps} from "framer-motion";

import {Recipe} from "../recipe/types";

interface Props extends MotionProps {
  recipe: Recipe;
  onVote: (recipe: Recipe, result: boolean) => void;
}

const Card: React.FC<Props> = ({recipe, onVote, ...props}) => {
  const cardElem = useRef(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState<"left" | "right" | undefined>();
  const [velocity, setVelocity] = useState<number>(0);

  const getVote = (childNode, parentNode) => {
    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();
    let result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
        ? true
        : undefined;

    return result;
  };

  // determine direction of swipe based on velocity
  const getDirection = () => {
    return velocity >= 1 ? "right" : velocity <= -1 ? "left" : undefined;
  };

  const getTrajectory = () => {
    setVelocity(x.getVelocity());
    setDirection(getDirection());
  };

  const flyAway = (min) => {
    const flyAwayDistance = (direction) => {
      const parentWidth = cardElem.current.parentNode.getBoundingClientRect().width;
      const childWidth = cardElem.current.getBoundingClientRect().width;

      return direction === "left"
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2;
    };

    if (direction && Math.abs(velocity) > min) {
      setConstrained(false);
      controls.start({
        x: flyAwayDistance(direction),
      });
    }
  };

  useEffect(() => {
    const unsubscribeX = x.onChange(() => {
      const childNode = cardElem.current;
      const parentNode = cardElem.current.parentNode;
      const result = getVote(childNode, parentNode);

      result !== undefined && onVote(recipe, result);
    });

    return () => unsubscribeX();
  });

  return (
    <motion.div
      ref={cardElem}
      animate={controls}
      dragConstraints={constrained && {left: 0, right: 0, top: 0, bottom: 0}}
      dragElastic={1}
      style={{
        x,
        height: "100%",
        width: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      whileTap={{scale: 1.1}}
      onDrag={getTrajectory}
      onDragEnd={() => flyAway(500)}
      {...props}
    >
      <Stack
        backgroundColor="primary.50"
        borderRadius={8}
        boxShadow="lg"
        height="100%"
        justifyContent="space-between"
        maxHeight="600px"
        maxWidth="400px"
        spacing={0}
        width="100%"
      >
        <Box
          backgroundImage={`url(${recipe.thumbnail})`}
          backgroundPosition="center"
          backgroundSize="cover"
          borderTopRadius={8}
          height="100%"
        />
        <Stack marginTop="auto" padding={4}>
          <Text fontSize="lg" fontWeight="bold">
            {recipe.title}
          </Text>
          <Text
            style={
              {
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              } as any
            }
          >
            {recipe.excerpt}
          </Text>
        </Stack>
      </Stack>
    </motion.div>
  );
};

export default Card;
