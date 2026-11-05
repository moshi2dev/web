import { Heading, Text, VStack } from "@yamada-ui/react";

export function InfoView({ title, children }: { title: string; children: string }) {
  return (
    <VStack
      as="article"
      className="info-view"
      align="flex-start"
      gap="0"
      maxW="720px"
      alignSelf={{ base: "center", md: "flex-start" }}
      px={{ base: "clamp(30px, 8vw, 120px)", md: "22px" }}
      py={{ base: "80px", md: "55px" }}
    >
      <Heading
        as="h1"
        m="0"
        fontFamily="Barlow Condensed, Noto Sans JP, sans-serif"
        fontSize={{ base: "clamp(48px, 5.6vw, 82px)", md: "clamp(42px, 10vw, 64px)" }}
        fontWeight="800"
      >
        {title}
      </Heading>
      <Text
        my={{ base: "28px", md: "22px" }}
        fontSize={{ base: "15px", md: "14px" }}
        lineHeight="2"
      >
        {children}
      </Text>
    </VStack>
  );
}
