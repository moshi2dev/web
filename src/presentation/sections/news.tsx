import { Box, Card, Container, HStack, Heading, Tag, Text, VStack } from "@yamada-ui/react";
import { NEWS } from "../../domain/site";
import { useReveal } from "../../application/hooks/useReveal";

const TAG_COLORS = {
  イベント: "pink",
  更新: "blue",
  機能: "green",
  お知らせ: "gray",
} as const;

export function News() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Box as="section" id="news" bg="#0d1526" py={{ base: "3xl", md: "4xl" }}>
      <Container.Root bg="transparent" border="0px" borderRadius="0px" maxW="6xl">
        <VStack ref={ref} className="reveal" data-visible={visible} align="stretch" gap="xl">
          <VStack align="center" gap="sm" textAlign="center">
            <Heading as="h2" size={{ base: "xl", md: "2xl" }}>
              📰 ニュース
            </Heading>
            <Text color="whiteAlpha.600">サーバーの最新情報です。</Text>
          </VStack>

          <VStack align="stretch" gap="sm">
            {NEWS.map((item) => {
              const color = TAG_COLORS[item.tag as keyof typeof TAG_COLORS] ?? "gray";

              return (
                <Card.Root
                  key={item.date}
                  bg="whiteAlpha.100"
                  border="1px solid rgba(255, 255, 255, 0.08)"
                  borderRadius="xl"
                  _hover={{ borderColor: "rgba(52, 211, 153, 0.25)" }}
                >
                  <Card.Body>
                    <HStack
                      justify="space-between"
                      align={{ base: "start", md: "center" }}
                      flexDir={{ base: "column", md: "row" }}
                      gap={{ base: "sm", md: "md" }}
                    >
                      <VStack
                        align={{ base: "start", md: "center" }}
                        gap="sm"
                        flexDir={{ base: "column", md: "row" }}
                      >
                        <Text fontFamily="mono" fontSize="sm" color="whiteAlpha.500">
                          {item.date}
                        </Text>
                        <Tag size="sm" colorScheme={color}>
                          {item.tag}
                        </Tag>
                        <Heading size="sm">{item.title}</Heading>
                      </VStack>
                      <Text color="whiteAlpha.700" fontSize="sm" maxW="md">
                        {item.description}
                      </Text>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              );
            })}
          </VStack>
        </VStack>
      </Container.Root>
    </Box>
  );
}
