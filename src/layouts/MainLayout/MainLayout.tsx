import { AppShell, Container } from "@mantine/core";
import { useState } from "react";
import Header from "../../components/Home/Common/Header/Header";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }: any) => {
  return (
    <AppShell className={styles.appShell}>
      <AppShell h={60} className={styles.header}>
        <Header />
      </AppShell>

      <AppShell className={styles.main}>
        <Container fluid className={styles.container}>
          {children}
        </Container>
      </AppShell>
    </AppShell>
  );
};

export default MainLayout;
