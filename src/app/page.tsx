"use client";

import Image from "next/image";
import Editor from "./companent/editor/editor";
import Sli from "./companent/slider/slider";
import Login from "./companent/loginorregister/loginorregister";
import { useForm, isNotEmpty, isEmail, hasLength } from "@mantine/form";
import { NextPage } from 'next'
export default function Home() {
  return (

    <Login />
  );
}
