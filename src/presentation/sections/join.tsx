import { Box, Card, Container, Heading, HStack, Tag, Text, VStack } from "@yamada-ui/react";
import { CopyIpButton } from "../components/copyIpButton";
import { JOIN_STEPS, SERVER } from "../../domain/site";
import { useReveal } from "../../application/hooks/useReveal";

export function JoinGuide() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Box as="section" id="join" bg="#080d1a" py={{ base: "3xl", md: "4xl" }}>
      <Container.Root bg="transparent" border="0px" borderRadius="0px" maxW="6xl">
        <VStack ref={ref} className="reveal" data-visible={visible} align="stretch" gap="xl">
          <VStack align="center" gap="sm" textAlign="center">
            <Heading as="h2" size={{ base: "xl", md: "2xl" }}>
              🖥️ 参加手順
            </Heading>
            <Text color="whiteAlpha.600">3 ステップで世界に参加できます。</Text>
          </VStack>

          <HStack
            gap={{ base: "sm", md: "md" }}
            flexDir={{ base: "column", md: "row" }}
            alignItems="stretch"
          >
            {JOIN_STEPS.map((step) => (
              <Card.Root
                key={step.step}
                flex="1"
                bg="whiteAlpha.100"
                border="1px solid rgba(255, 255, 255, 0.08)"
                borderRadius="xl"
              >
                <Card.Header>
                  <HStack gap="sm">
                    <Text
                      fontFamily="mono"
                      fontSize="2xl"
                      fontWeight="extrabold"
                      color="emerald.400"
                    >
                      {step.step}
                    </Text>
                    <Heading size="sm">{step.title}</Heading>
                  </HStack>
                </Card.Header>
                <Card.Body>
                  <Text color="whiteAlpha.700" fontSize="sm">
                    {step.description}
                  </Text>
                </Card.Body>
              </Card.Root>
            ))}
          </HStack>

          <Card.Root
            bg="linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(59, 130, 246, 0.10))"
            border="1px solid rgba(52, 211, 153, 0.3)"
            borderRadius="xl"
          >
            <Card.Body>
              <VStack align="stretch" gap="md">
                <HStack justify="space-between" flexWrap="wrap" gap="sm">
                  <VStack align="start" gap="xs">
                    <Heading size="sm">サーバーアドレス</Heading>
                    <Text fontFamily="mono" fontSize={{ base: "md", md: "xl" }} color="emerald.300">
                      {SERVER.ip}
                    </Text>
                  </VStack>
                  <CopyIpButton />
                </HStack>

                <HStack gap="sm" flexWrap="wrap">
                  {SERVER.stats.map((stat) => (
                    <Box key={stat.label} bg="whiteAlpha.100" borderRadius="lg" px="md" py="sm">
                      <Text fontSize="2xs" color="whiteAlpha.500">
                        {stat.label}
                      </Text>
                      <Text fontSize="md" fontWeight="bold">
                        {stat.value}
                      </Text>
                    </Box>
                  ))}
                </HStack>

                <HStack gap="sm" flexWrap="wrap">
                  <Tag size="sm" colorScheme="blue">
                    🛏️ ベッドで復活 OK
                  </Tag>
                  <Tag size="sm" colorScheme="emerald">
                    🎮 クロスプレイ (Java / Bedrock)
                  </Tag>
                  <Tag size="sm" colorScheme="violet">
                    🔒 土地保護あり
                  </Tag>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container.Root>
    </Box>
  );
}
