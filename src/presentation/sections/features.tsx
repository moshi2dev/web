import { Box, Card, Container, Grid, Heading, HStack, Tag, Text, VStack } from "@yamada-ui/react";
import { FEATURES, type Feature } from "../../domain/site";
import { useReveal } from "../../application/hooks/useReveal";

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card.Root
      gridColumn={{ lg: feature.wide ? "span 2" : "auto" }}
      bg="whiteAlpha.100"
      backdropFilter="blur(8px)"
      border="1px solid rgba(255, 255, 255, 0.08)"
      borderRadius="xl"
      transition="transform 0.2s ease, border-color 0.2s ease"
      _hover={{ transform: "translateY(-4px)", borderColor: "rgba(52, 211, 153, 0.4)" }}
    >
      <Card.Header>
        <HStack gap="sm">
          <Box as="span" fontSize="2xl">
            {feature.icon}
          </Box>
          <Heading size="md">{feature.title}</Heading>
        </HStack>
      </Card.Header>
      <Card.Body>
        <VStack align="stretch" gap="sm">
          <Text color="whiteAlpha.700" fontSize="sm">
            {feature.description}
          </Text>
          <HStack gap="xs" flexWrap="wrap">
            {feature.tags.map((tag) => (
              <Tag key={tag} size="sm" colorScheme="emerald">
                {tag}
              </Tag>
            ))}
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}

export function Features() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Box as="section" id="features" bg="#0d1526" py={{ base: "3xl", md: "4xl" }}>
      <Container.Root bg="transparent" border="0px" borderRadius="0px" maxW="6xl">
        <VStack ref={ref} className="reveal" data-visible={visible} align="stretch" gap="xl">
          <VStack align="center" gap="sm" textAlign="center">
            <Heading as="h2" size={{ base: "xl", md: "2xl" }}>
              ✨ 何ができるの?
            </Heading>
            <Text color="whiteAlpha.600">まいくら鯖の特徴です。</Text>
          </VStack>

          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
            gap={{ base: "sm", md: "md" }}
            alignContent="start"
          >
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </Grid>
        </VStack>
      </Container.Root>
    </Box>
  );
}
