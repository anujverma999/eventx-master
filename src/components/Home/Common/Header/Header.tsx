import { AppShell, Group, Image, Avatar, Text } from "@mantine/core";
import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import tcgLogo from "../../../../assets/tcg.png";
import profileIcon from "../../../../assets/profileIcon.svg";

const Header = () => {
  const avatarRef = useRef(null);

  return (
    <AppShell className={styles.header}>
      <Group
        sx={{ justifyContent: "space-between" }}
        className={styles.headerMainDiv}
      >
        <Group className={styles.headerLogoDiv}>
          <Image
            src={tcgLogo}
            className={styles.headerLogo}
            alt="Logo"
            height={30}
            fit="contain"
          />
        </Group>
        <Text className={styles.projectName}>EventX</Text>

        <Group
          sx={{ justifyContent: "space-between" }}
          className={styles.userServerBox}
        >
          <div>
            <Avatar
              radius="xl"
              size="md"
              className={styles.headerAvatar}
              src={profileIcon}
              alt="User"
              style={{ cursor: "pointer" }}
              ref={avatarRef}
            />
            {/* {showProfile && (
              <div ref={profileRef}>
                <UserProfilePopup onClose={() => setShowProfile(false)} />
              </div>
            )} */}
          </div>
        </Group>
      </Group>
      <div className={styles.yellowDiv}></div>
    </AppShell>
  );
};

export default Header;
