import {
  Box,
  Button,
  Image,
  List,
  Icon as YamadaIcon,
  VisuallyHidden,
  VStack,
} from "@yamada-ui/react";
import { LuLayers, LuShapes, LuUsers } from "react-icons/lu";
import { MEMBERS } from "../../../domain/members";
import type { Section } from "./types";

export function SectionNavigation({
  section,
  memberIndex,
  onMemberChange,
  onSectionChange,
}: {
  section: Section;
  memberIndex: number;
  onMemberChange: (index: number) => void;
  onSectionChange: (section: Section) => void;
}) {
  return (
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
          <NavButton
            title="トップ"
            icon={LuLayers}
            active={section === "about"}
            onClick={() => onSectionChange("about")}
          />
        </List.Item>
        <List.Item as="li">
          <NavButton
            title="メンバー"
            icon={LuUsers}
            active={section === "members"}
            onClick={() => onSectionChange("members")}
          />
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
          <NavButton
            title="ワークス"
            icon={LuShapes}
            active={section === "works"}
            onClick={() => onSectionChange("works")}
          />
        </List.Item>
      </List.Root>
    </Box>
  );
}

function NavButton({
  title,
  icon,
  active,
  onClick,
}: {
  title: string;
  icon: typeof LuLayers;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      className="nav-item"
      variant="ghost"
      aria-pressed={active}
      title={title}
      onClick={onClick}
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
      <YamadaIcon as={icon} aria-hidden="true" boxSize="18px" />
      <VisuallyHidden as="span">{title}</VisuallyHidden>
    </Button>
  );
}
