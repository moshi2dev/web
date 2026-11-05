import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Icon as YamadaIcon,
  Link,
  List,
  Text,
  VisuallyHidden,
  VStack,
} from "@yamada-ui/react";
import { LuArrowUpRight, LuFlaskConical, LuHouse, LuLayers, LuUsers } from "react-icons/lu";
import { SiGithub, SiX } from "react-icons/si";
import { MEMBERS, type Member } from "../data/members";
import type { ThemePreference } from "../hooks/use-theme";
import { ThemeSwitcher } from "./theme-switcher";

type Section = "members" | "about" | "experiments";

type Props = {
  member: Member;
  memberIndex: number;
  section: Section;
  preference: ThemePreference;
  onThemeChange: (value: ThemePreference) => void;
  onMemberChange: (index: number) => void;
  onSectionChange: (section: Section) => void;
};

export function Dashboard({
  member,
  memberIndex,
  section,
  preference,
  onThemeChange,
  onMemberChange,
  onSectionChange,
}: Props) {
  return (
    <Flex
      className="dashboard"
      minH="100svh"
      direction="column"
      position="relative"
      isolation="isolate"
    >
      <Flex
        as="header"
        className="dashboard-header"
        minH={{ base: "75px", md: "65px" }}
        align="center"
        px={{ base: "60px", md: "24px", sm: "12px" }}
        gap="12px"
        borderBottom="1px solid var(--border)"
      >
        <Link
          className="logo"
          href="/"
          fontFamily="Barlow Condensed, sans-serif"
          fontSize={{ base: "30px", md: "27px", sm: "24px" }}
          fontWeight="800"
          lineHeight="1"
          letterSpacing="-.035em"
          flex="none"
        >
          moshi2<Text as="span">.dev</Text>
        </Link>
        <ThemeSwitcher value={preference} onChange={onThemeChange} />
        <Link
          className="github-link"
          href="https://github.com/moshi2dev"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub（新しいタブ）"
          data-magnetic
          display="inline-flex"
          alignItems="center"
          gap="8px"
          px="12px"
          py="10px"
          fontSize="13px"
        >
          <YamadaIcon as={SiGithub} aria-hidden="true" boxSize="18px" />
          <Text as="span" m="0" fontSize="13px">
            GitHub
          </Text>
          <YamadaIcon as={LuArrowUpRight} aria-hidden="true" boxSize="13px" />
        </Link>
      </Flex>

      <Grid
        as="main"
        className="dashboard-main"
        flex="1"
        templateColumns={{ base: "76px minmax(0, 1fr)", sm: "64px minmax(0, 1fr)" }}
        alignItems="stretch"
      >
        <Box
          as="nav"
          className="section-nav"
          aria-label="メインナビゲーション"
          alignSelf="stretch"
          m="0"
          p="10px 0"
          bg="var(--sidebar-panel)"
        >
          <List.Root
            as="ul"
            className="nav-list"
            styleType="none"
            display="flex"
            direction="column"
            m="0"
            p="0"
          >
            <List.Item as="li">
              <Button
                className="nav-item"
                variant="ghost"
                aria-pressed={section === "members"}
                title="メンバー"
                onClick={() => onSectionChange("members")}
                data-magnetic
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                minW="0"
                h="51px"
                p="0"
                borderRadius="0"
                bg="transparent"
                color="var(--text)"
                fontSize="13px"
                fontWeight="700"
              >
                <YamadaIcon as={LuUsers} aria-hidden="true" boxSize="18px" />{" "}
                <VisuallyHidden as="span">メンバー</VisuallyHidden>
              </Button>
              <VStack
                as="ul"
                className="member-rail"
                id="member-list"
                aria-label="メンバー"
                align="center"
                gap={{ base: "5px", md: "6px" }}
                p={{ base: "7px 5px", md: "8px 5px" }}
                m="0"
                listStyleType="none"
                bg="var(--rail-inset)"
                boxShadow="inset 7px 0 12px var(--rail-shadow), inset 0 5px 10px var(--rail-shadow), inset -1px 0 var(--rail-edge)"
              >
                {MEMBERS.map((item, index) => (
                  <List.Item as="li" key={item.handle}>
                    <Button
                      className="member-button"
                      variant="ghost"
                      aria-label={item.name}
                      title={item.name}
                      aria-pressed={memberIndex === index && section === "members"}
                      onClick={() => onMemberChange(index)}
                      data-magnetic
                      display="flex"
                      justifyContent="center"
                      w="48px"
                      h="48px"
                      minW="0"
                      p="4px"
                      border="1px solid transparent"
                      borderRadius="full"
                      bg="transparent"
                      color="var(--text)"
                    >
                      <Image
                        src={item.avatar}
                        alt=""
                        fit="cover"
                        w="34px"
                        h="34px"
                        borderRadius="full"
                        filter="grayscale(.5)"
                      />
                    </Button>
                  </List.Item>
                ))}
              </VStack>
            </List.Item>
            <List.Item as="li">
              <Button
                className="nav-item"
                variant="ghost"
                aria-pressed={section === "about"}
                title="チーム"
                onClick={() => onSectionChange("about")}
                data-magnetic
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                minW="0"
                h="51px"
                p="0"
                borderRadius="0"
                bg="transparent"
                color="var(--text)"
                fontSize="13px"
                fontWeight="700"
              >
                <YamadaIcon as={LuLayers} aria-hidden="true" boxSize="18px" />
                <VisuallyHidden as="span">チーム</VisuallyHidden>
              </Button>
            </List.Item>
            <List.Item as="li">
              <Button
                className="nav-item"
                variant="ghost"
                aria-pressed={section === "experiments"}
                title="実験"
                onClick={() => onSectionChange("experiments")}
                data-magnetic
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
                minW="0"
                h="51px"
                p="0"
                borderRadius="0"
                bg="transparent"
                color="var(--text)"
                fontSize="13px"
                fontWeight="700"
              >
                <YamadaIcon as={LuFlaskConical} aria-hidden="true" boxSize="18px" />
                <VisuallyHidden as="span">実験</VisuallyHidden>
              </Button>
            </List.Item>
          </List.Root>
        </Box>
        {section === "members" ? (
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
        ) : (
          <VStack
            as="article"
            className="info-view"
            key={section}
            align="flex-start"
            gap="0"
            maxW="720px"
            alignSelf={{ base: "center", md: "flex-start" }}
            px={{ base: "clamp(30px, 8vw, 120px)", md: "22px" }}
            py={{ base: "80px", md: "55px" }}
          >
            {section === "about" ? (
              <>
                <Heading
                  as="h1"
                  m="0"
                  fontFamily="Barlow Condensed, Noto Sans JP, sans-serif"
                  fontSize={{ base: "clamp(48px, 5.6vw, 82px)", md: "clamp(42px, 10vw, 64px)" }}
                  fontWeight="800"
                >
                  moshi2.dev
                </Heading>
                <Text
                  my={{ base: "28px", md: "22px" }}
                  fontSize={{ base: "15px", md: "14px" }}
                  lineHeight="2"
                >
                  moshi2.devは、ものづくりが好きな技術者のチームです。メンバーそれぞれの興味や技術を持ち寄り、さまざまなことに取り組みます。
                </Text>
              </>
            ) : (
              <>
                <Heading
                  as="h1"
                  m="0"
                  fontFamily="Barlow Condensed, Noto Sans JP, sans-serif"
                  fontSize={{ base: "clamp(48px, 5.6vw, 82px)", md: "clamp(42px, 10vw, 64px)" }}
                  fontWeight="800"
                >
                  実験
                </Heading>
                <Text
                  my={{ base: "28px", md: "22px" }}
                  fontSize={{ base: "15px", md: "14px" }}
                  lineHeight="2"
                >
                  技術を使った実験や制作を、このサイトで紹介していく予定です。
                </Text>
                <Link
                  className="info-button"
                  href="https://github.com/moshi2dev"
                  target="_blank"
                  rel="noreferrer"
                  data-magnetic
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt="30px"
                  px="17px"
                  py="13px"
                  bg="var(--accent)"
                  color="var(--accent-text)"
                  fontSize="13px"
                  fontWeight="700"
                >
                  <HStack as="span" gap="28px">
                    <YamadaIcon as={SiGithub} aria-hidden="true" boxSize="16px" /> GitHubを見る{" "}
                    <YamadaIcon as={LuArrowUpRight} aria-hidden="true" boxSize="16px" />
                  </HStack>
                </Link>
              </>
            )}
          </VStack>
        )}
      </Grid>
      <Box
        as="footer"
        className="dashboard-footer"
        px={{ base: "60px", md: "24px", sm: "20px" }}
        py="17px"
        fontSize="12px"
        borderTop="1px solid var(--border)"
        color="var(--muted)"
      >
        © moshi2.dev
      </Box>
    </Flex>
  );
}
