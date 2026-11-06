import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { Box } from "@yamada-ui/react/components/box";
import { Text } from "@yamada-ui/react/components/text";
import { MEMBERS } from "../domain/members";
import { useThemeContext } from "./hooks/useTheme";
import { Dashboard } from "../presentation/components/dashboard";
import { Scene } from "../presentation/components/scene";
import type { Section } from "../presentation/components/dashboard";

const rootRoute = createRootRoute({
  component: RootRoute,
  notFoundComponent: NotFoundRoute,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <DashboardRoute section="about" memberIndex={0} />,
});

const worksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/works",
  component: () => <DashboardRoute section="works" memberIndex={0} />,
});

const memberRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/members/$handle",
  component: MemberRoute,
});

const routeTree = rootRoute.addChildren([indexRoute, worksRoute, memberRoute]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function RootRoute() {
  const { theme } = useThemeContext();

  return (
    <Box as="main" className="app" minH="100svh">
      <Scene theme={theme}>
        <Outlet />
      </Scene>
    </Box>
  );
}

function DashboardRoute({ section, memberIndex }: { section: Section; memberIndex: number }) {
  const { preference, changePreference } = useThemeContext();
  const navigate = useNavigate();
  const member = MEMBERS[memberIndex]!;

  return (
    <Dashboard
      member={member}
      memberIndex={memberIndex}
      section={section}
      preference={preference}
      onThemeChange={changePreference}
      onMemberChange={(index) => {
        void navigate({
          to: "/members/$handle",
          params: { handle: MEMBERS[index]!.handle },
        });
      }}
      onSectionChange={(nextSection) => {
        void navigateToSection(navigate, nextSection, member.handle);
      }}
    />
  );
}

function MemberRoute() {
  const { handle } = memberRoute.useParams();
  const memberIndex = MEMBERS.findIndex((member) => member.handle === handle);

  if (memberIndex === -1) return <NotFoundRoute />;
  return <DashboardRoute section="members" memberIndex={memberIndex} />;
}

function NotFoundRoute() {
  return (
    <Box p={{ base: "40px", sm: "24px" }} color="var(--text)">
      <Text fontSize="24px" fontWeight="700">
        ページが見つかりません
      </Text>
    </Box>
  );
}

function navigateToSection(
  navigate: ReturnType<typeof useNavigate>,
  section: Section,
  handle: string,
) {
  if (section === "about") return navigate({ to: "/" });
  if (section === "works") return navigate({ to: "/works" });
  return navigate({ to: "/members/$handle", params: { handle } });
}
