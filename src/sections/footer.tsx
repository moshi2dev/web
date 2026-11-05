import { Box, Container, HStack, Link, Separator, Text, VStack } from "@yamada-ui/react";

const NAV_LINKS = [
  { href: "#features", label: "特徴" },
  { href: "#join", label: "参加方法" },
  { href: "#news", label: "ニュース" },
  { href: "#faq", label: "FAQ" },
] as const;

export function Footer() {
  return (
    <Box as="footer" bg="#060a14" py="2xl">
      <Container.Root bg="transparent" border="0px" borderRadius="0px" maxW="6xl">
        <VStack align="stretch" gap="lg">
          <HStack
            justify="space-between"
            flexDir={{ base: "column", md: "row" }}
            align={{ base: "center", md: "start" }}
            gap="lg"
          >
            <VStack align="start" gap="sm">
              <HStack gap="sm">
                <Box aria-hidden="true" fontSize="2xl">
                  🌠
                </Box>
                <Text fontWeight="extrabold" fontSize="lg">
                  まいくら鯖
                </Text>
              </HStack>
              <Text color="whiteAlpha.500" fontSize="sm" maxW="sm">
                Java & Bedrock 対応のサバイバルマイクラサーバー。いつでも遊びに来てください。
              </Text>
            </VStack>

            <HStack gap="lg" flexWrap="wrap" justify="center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  color="whiteAlpha.600"
                  _hover={{ color: "emerald.300" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="https://discord.com"
                external
                color="whiteAlpha.600"
                _hover={{ color: "emerald.300" }}
              >
                Discord
              </Link>
            </HStack>
          </HStack>

          <Separator borderColor="whiteAlpha.100" />

          <HStack justify="space-between" flexWrap="wrap" gap="sm">
            <Text fontSize="xs" color="whiteAlpha.500">
              © 2026 まいくら鯖. Minecraft is a trademark of Mojang Synergies AB.
            </Text>
            <Text fontSize="xs" color="whiteAlpha.500">
              Powered by Vite+ & Yamada UI
            </Text>
          </HStack>
        </VStack>
      </Container.Root>
    </Box>
  );
}
