import { Button } from "@yamada-ui/react";
import { LuArrowUpRight, LuFlaskConical, LuLayers, LuUsers } from "react-icons/lu";
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
    <div className="dashboard">
      <header className="dashboard-header">
        <a className="logo" href="/">
          moshi2<span>.dev</span>
        </a>
        <ThemeSwitcher value={preference} onChange={onThemeChange} />
        <a
          className="github-link"
          href="https://github.com/moshi2dev"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub（新しいタブ）"
          data-magnetic
        >
          <SiGithub aria-hidden="true" />
          <span>GitHub</span>
          <LuArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <div className="dashboard-main">
        <nav className="section-nav" aria-label="メインナビゲーション">
          <ul className="nav-list">
            <li>
              <Button
                className="nav-item"
                variant="ghost"
                aria-pressed={section === "members"}
                title="メンバー"
                onClick={() => onSectionChange("members")}
                data-magnetic
              >
                <LuUsers aria-hidden="true" /> <span className="nav-label">メンバー</span>
              </Button>
              <ul className="member-rail" id="member-list" aria-label="メンバー">
                {MEMBERS.map((item, index) => (
                  <li key={item.handle}>
                    <Button
                      className="member-button"
                      variant="ghost"
                      aria-label={item.name}
                      title={item.name}
                      aria-pressed={memberIndex === index && section === "members"}
                      onClick={() => onMemberChange(index)}
                      data-magnetic
                    >
                      <img src={item.avatar} alt="" />
                    </Button>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Button
                className="nav-item"
                variant="ghost"
                aria-pressed={section === "about"}
                title="チーム"
                onClick={() => onSectionChange("about")}
                data-magnetic
              >
                <LuLayers aria-hidden="true" />
                <span className="nav-label">チーム</span>
              </Button>
            </li>
            <li>
              <Button
                className="nav-item"
                variant="ghost"
                aria-pressed={section === "experiments"}
                title="実験"
                onClick={() => onSectionChange("experiments")}
                data-magnetic
              >
                <LuFlaskConical aria-hidden="true" />
                <span className="nav-label">実験</span>
              </Button>
            </li>
          </ul>
        </nav>
        {section === "members" ? (
          <article className="member-view" key={member.handle}>
            <div className="portrait-stage" aria-hidden="true">
              <div className="portrait-frame">
                <img src={member.avatar} alt="" />
              </div>
            </div>
            <div className="member-detail">
              <h1>{member.name}</h1>
              <a
                className="detail-handle"
                href={`https://x.com/${member.handle}`}
                target="_blank"
                rel="noreferrer"
              >
                <SiX aria-hidden="true" /> @{member.handle} <LuArrowUpRight aria-hidden="true" />
              </a>
              <p className="detail-description">{member.description}</p>
              <h2>関心・技術</h2>
              <ul className="skills">
                {member.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
              <a
                className="profile-link"
                href={member.website}
                target="_blank"
                rel="noreferrer"
                data-magnetic
              >
                プロフィールを見る <LuArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </article>
        ) : (
          <article className="info-view" key={section}>
            {section === "about" ? (
              <>
                <h1>moshi2.dev</h1>
                <p>
                  moshi2.devは、ものづくりが好きな技術者のチームです。メンバーそれぞれの興味や技術を持ち寄り、さまざまなことに取り組みます。
                </p>
                <Button
                  className="info-button"
                  variant="ghost"
                  onClick={() => onSectionChange("members")}
                  data-magnetic
                >
                  メンバーを見る <LuArrowUpRight aria-hidden="true" />
                </Button>
              </>
            ) : (
              <>
                <h1>実験</h1>
                <p>技術を使った実験や制作を、このサイトで紹介していく予定です。</p>
                <a
                  className="info-button"
                  href="https://github.com/moshi2dev"
                  target="_blank"
                  rel="noreferrer"
                  data-magnetic
                >
                  <SiGithub aria-hidden="true" /> GitHubを見る <LuArrowUpRight aria-hidden="true" />
                </a>
              </>
            )}
          </article>
        )}
      </div>
      <footer className="dashboard-footer">© moshi2.dev</footer>
    </div>
  );
}
