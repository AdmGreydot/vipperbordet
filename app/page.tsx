import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/components/Hero";
import How from "@/components/How";
import Places from "@/components/Places";
import CustomizationSection from "@/components/CustomizationSection";
import OrderForm from "@/components/OrderForm";

export default function Home() {
  return (
    <div>
        <Hero />
        <How />
        <Places />
        <CustomizationSection />
        <OrderForm />
    </div>
  );
}
