import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionRoot,
  Box,
  Container,
  Heading,
  Text,
  Card,
  VStack,
} from "@yamada-ui/react";
import { FAQ } from "../../domain/site";
import { useReveal } from "../../application/hooks/useReveal";

export function Faq() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Box as="section" id="faq" bg="#080d1a" py={{ base: "3xl", md: "4xl" }}>
      <Container.Root bg="transparent" border="0px" borderRadius="0px" maxW="3xl">
        <VStack ref={ref} className="reveal" data-visible={visible} align="stretch" gap="xl">
          <VStack align="center" gap="sm" textAlign="center">
            <Heading as="h2" size={{ base: "xl", md: "2xl" }}>
              ❔ よくある質問
            </Heading>
            <Text color="whiteAlpha.600">不明点は Discord でも受け付けています。</Text>
          </VStack>

          <Card.Root
            bg="whiteAlpha.100"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="xl"
          >
            <Card.Body as={Box} px="md" py="sm">
              <AccordionRoot>
                {FAQ.map((item, index) => (
                  <AccordionItem key={item.question} index={index} px="md">
                    <AccordionButton py="md">{item.question}</AccordionButton>
                    <AccordionPanel pb="md">
                      <Text color="whiteAlpha.700" fontSize="sm">
                        {item.answer}
                      </Text>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </AccordionRoot>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container.Root>
    </Box>
  );
}
