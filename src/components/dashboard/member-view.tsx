import {
  Box,
  Grid,
  Heading,
  HStack,
  Image,
  Link,
  List,
  Text,
  VStack,
  Icon as YamadaIcon,
} from "@yamada-ui/react";
import { LuArrowUpRight, LuHouse, LuNotebookPen } from "react-icons/lu";
import { SiGithub, SiX } from "react-icons/si";
import type { Member } from "../../data/members";

function getBlogLink(member: Member) {
  if (!member.personalSite || !member.blog) return null;
  const { domain } = member.personalSite;
  const path = member.blog.path ?? "";
  return {
    href: path ? `https://${domain}${path}` : `https://blog.${domain}`,
    label: path ? `${domain}${path}` : `blog.${domain}`,
  };
}

export function MemberView({ member }: { member: Member }) {
  const blogLink = getBlogLink(member);

  return (
    <Grid
      as="article"
      className="member-view"
      key={member.handle}
      templateColumns={{
        base: "minmax(260px, 1fr) minmax(300px, .95fr)",
        lg: "minmax(200px, 1fr) minmax(250px, 1fr)",
        md: "1fr",
      }}
      alignItems="center"
      columnGap={{ base: "clamp(25px, 4vw, 65px)", lg: "22px" }}
      rowGap={{ base: "20px", md: "22px" }}
      p={{
        base: "35px clamp(30px, 5vw, 80px) 65px 35px",
        lg: "25px 28px 45px 15px",
        md: "22px 22px 50px",
      }}
    >
      <Grid
        className="portrait-stage"
        aria-hidden="true"
        placeItems="center"
        p={{ base: "45px 22px", lg: "25px 15px", md: "18px 12px" }}
        overflow="hidden"
        isolation="isolate"
      >
        <Box
          className="portrait-frame"
          position="relative"
          w={{ base: "min(100%, 430px)", md: "min(100%, 300px)" }}
          aspectRatio="1"
        >
          <Image src={member.avatar} alt="" fit="cover" w="100%" h="100%" />
        </Box>
      </Grid>
      <VStack className="member-detail" align="flex-start" gap="0" maxW="540px">
        <Heading
          as="h1"
          m="0"
          fontFamily="Barlow Condensed, Noto Sans JP, sans-serif"
          fontSize={{ base: "clamp(48px, 5.6vw, 82px)", md: "clamp(42px, 10vw, 64px)" }}
          fontWeight="800"
          lineHeight="1.1"
          letterSpacing="-.025em"
          overflowWrap="anywhere"
        >
          {member.name}
        </Heading>
        <HStack className="member-social-links" gap="16px" mt="13px" flexWrap="wrap">
          {member.personalSite && (
            <Link
              className="detail-handle"
              href={member.personalSite.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`個人サイト ${member.personalSite.domain}`}
              display="inline-flex"
              alignItems="center"
              gap="7px"
              color="var(--text)"
              fontSize="13px"
            >
              <YamadaIcon as={LuHouse} aria-hidden="true" boxSize="14px" />
              <Text as="span" m="0" fontSize="13px">
                {member.personalSite.domain}
              </Text>
              <YamadaIcon as={LuArrowUpRight} aria-hidden="true" boxSize="13px" />
            </Link>
          )}
          {blogLink && (
            <Link
              className="detail-handle"
              href={blogLink.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`ブログ ${blogLink.label}`}
              display="inline-flex"
              alignItems="center"
              gap="7px"
              color="var(--text)"
              fontSize="13px"
            >
              <YamadaIcon as={LuNotebookPen} aria-hidden="true" boxSize="14px" />
              <Text as="span" m="0" fontSize="13px">
                {blogLink.label}
              </Text>
              <YamadaIcon as={LuArrowUpRight} aria-hidden="true" boxSize="13px" />
            </Link>
          )}
          <Link
            className="detail-handle"
            href={`https://x.com/${member.handle}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`X @${member.handle}`}
            display="inline-flex"
            alignItems="center"
            gap="7px"
            color="var(--text)"
            fontSize="13px"
          >
            <YamadaIcon as={SiX} aria-hidden="true" boxSize="13px" />
            <Text as="span" m="0" fontSize="13px">
              @{member.handle}
            </Text>
            <YamadaIcon as={LuArrowUpRight} aria-hidden="true" boxSize="13px" />
          </Link>
          <Link
            className="detail-handle"
            href={`https://github.com/${member.handle}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub ${member.handle}`}
            display="inline-flex"
            alignItems="center"
            gap="7px"
            color="var(--text)"
            fontSize="13px"
          >
            <YamadaIcon as={SiGithub} aria-hidden="true" boxSize="14px" />
            <Text as="span" m="0" fontSize="13px">
              {member.handle}
            </Text>
            <YamadaIcon as={LuArrowUpRight} aria-hidden="true" boxSize="13px" />
          </Link>
        </HStack>
        <Text
          my={{ base: "28px", md: "22px" }}
          fontSize={{ base: "15px", md: "14px" }}
          lineHeight="2"
        >
          {member.description}
        </Text>
        <Heading as="h2" m="0 0 14px" fontSize="14px" fontWeight="700">
          関心・技術
        </Heading>
        <List.Root
          as="ul"
          className="skills"
          styleType="none"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          gap="9px"
          p="0"
          m="0"
          listStyleType="none"
        >
          {member.interests.map((interest) => (
            <List.Item
              as="li"
              key={interest}
              px="12px"
              py="7px"
              border="1px solid var(--skill-border)"
              bg="var(--skill-bg)"
              color="var(--text)"
              fontSize="12px"
            >
              {interest}
            </List.Item>
          ))}
        </List.Root>
      </VStack>
    </Grid>
  );
}
