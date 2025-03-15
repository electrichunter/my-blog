"use client";

import { useState } from "react";
import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import {
  Button,
  Card,
  Group,
  TextInput,
  Paper,
  Stack,
  Title,
  Tabs,
  PasswordInput,
  Divider,
  Container,
} from "@mantine/core";

export default function LoginOrRegister() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: {
      email: isEmail("Geçerli bir e-posta giriniz"),
      password: hasLength({ min: 6 }, "Şifre en az 6 karakter olmalıdır"),
      name: activeTab === "register" ? isNotEmpty("İsim alanı zorunludur") : undefined,
    },
  });

  return (
    <Container size={420} my={40}>
      <Card shadow="md" padding="xl" radius="md" withBorder>
      <Title order={2} style={{ textAlign: "center" }}>

          {activeTab === "login" ? "Giriş Yap" : "Kayıt Ol"}
        </Title>

        <Tabs value={activeTab} onChange={(value) => setActiveTab(value as "login" | "register")} mt="md">
          <Tabs.List grow>
            <Tabs.Tab value="login">Giriş</Tabs.Tab>
            <Tabs.Tab value="register">Kayıt</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Divider my="md" />

        <Paper withBorder shadow="xs" p="md" radius="md">
          <form onSubmit={form.onSubmit(() => {})}>
            <Stack>
              {activeTab === "register" && (
                <TextInput label="İsim" placeholder="Adınız" withAsterisk {...form.getInputProps("name")} />
              )}
              <TextInput label="E-posta" placeholder="ornek@mail.com" withAsterisk {...form.getInputProps("email")} />
              <PasswordInput label="Şifre" placeholder="******" withAsterisk {...form.getInputProps("password")} />

              <Group justify="center" mt="md">
                <Button type="submit" size="md" radius="md" fullWidth>
                  {activeTab === "login" ? "Giriş Yap" : "Kayıt Ol"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Card>
    </Container>
  );
}
