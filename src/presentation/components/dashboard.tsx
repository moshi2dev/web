import { lazy, Suspense } from "react";
import { Box } from "@yamada-ui/react/components/box";
import { Flex } from "@yamada-ui/react/components/flex";
import { Grid } from "@yamada-ui/react/components/grid";
import { Link } from "@yamada-ui/react/components/link";
import { Text } from "@yamada-ui/react/components/text";
import { LuArrowUpRight } from "react-icons/lu";
import { SiGithub } from "react-icons/si";
import { ThemeSwitcher } from "./themeSwitcher";
import { AboutView } from "./dashboard/aboutView";
import { SectionNavigation } from "./dashboard/sectionNavigation";
import type { DashboardProps, Section } from "./dashboard/types";
import { WorksView } from "./dashboard/worksView";

const LazyMemberView = lazy(() =>
  import("./dashboard/memberView").then(({ MemberView }) => ({ default: MemberView })),
);

export type { Section } from "./dashboard/types";

export function Dashboard({
  member,
  memberIndex,
  section,
  preference,
  onThemeChange,
  onMemberChange,
  onSectionChange,
}: DashboardProps) {
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
          moshi2.dev
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
          <SiGithub aria-hidden="true" size={18} />
          <Text as="span" m="0" fontSize="13px">
            GitHub
          </Text>
          <LuArrowUpRight aria-hidden="true" size={13} />
        </Link>
      </Flex>
      <Grid
        as="main"
        className="dashboard-main"
        flex="1"
        templateColumns={{ base: "76px minmax(0, 1fr)", sm: "64px minmax(0, 1fr)" }}
        alignItems="stretch"
      >
        <SectionNavigation
          section={section}
          memberIndex={memberIndex}
          onMemberChange={onMemberChange}
          onSectionChange={onSectionChange}
        />
        <SectionContent section={section} member={member} />
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

function SectionContent({
  section,
  member,
}: {
  section: Section;
  member: DashboardProps["member"];
}) {
  if (section === "about") return <AboutView />;
  if (section === "members") {
    return (
      <Suspense fallback={null}>
        <LazyMemberView member={member} />
      </Suspense>
    );
  }
  return <WorksView />;
}
