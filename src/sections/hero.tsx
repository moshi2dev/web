import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Tag,
  Text,
  VStack,
} from "@yamada-ui/react";
import { HeroCanvas } from "../components/hero-canvas";
import { CopyIpButton } from "../components/copy-ip-button";
import { SERVER } from "../data/site";

function scrollToJoin() {
  document.querySelector("#join")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <Box as="section" position="relative" minH="dvh" overflow="hidden">
      <HeroCanvas />

      <Container.Root
        bg="transparent"
        border="0px"
        borderRadius="0px"
        maxW="6xl"
        position="relative"
        py={{ base: "2xl", md: "3xl" }}
        h="full"
      >
        <Center h="full">
          <VStack align="center" gap="lg" textAlign="center">
            <HStack gap="sm" flexWrap="wrap" justify="center">
              <Tag size="md" colorScheme="emerald" borderRadius="full">
                ⛏️ Java & Bedrock 対応
              </Tag>
              <Tag size="md" colorScheme="blue" borderRadius="full">
                🟢 オンライン: {SERVER.onlinePlayers} / {SERVER.maxPlayers} 人
              </Tag>
            </HStack>

            <VStack gap="sm" align="center">
              <Heading
                as="h1"
                size={{ base: "3xl", md: "5xl" }}
                fontWeight="extrabold"
                style={{
                  backgroundImage: "linear-gradient(to right, #a5f3d0, #7dd3fc, #c4b5fd)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {SERVER.name}
              </Heading>
              <Text fontSize={{ base: "lg", md: "xl" }} color="whiteAlpha.700">
                {SERVER.tagline}
              </Text>
            </VStack>

            <Text maxW="2xl" color="whiteAlpha.500" fontSize="sm">
              土地保護あり・無課金・ラグなしのサバイバルサーバー。
              {SERVER.version} で稼働中。いま {SERVER.onlinePlayers}
              人が世界にログインしています。
            </Text>

            <HStack gap="sm" flexWrap="wrap" justify="center">
              <Button colorScheme="emerald" size="lg" onClick={scrollToJoin}>
                参加方法を見る
              </Button>
              <CopyIpButton size="lg" />
            </HStack>
          </VStack>
        </Center>
      </Container.Root>
    </Box>
  );
}
