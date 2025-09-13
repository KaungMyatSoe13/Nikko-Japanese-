import { Poppins, Lora } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function Home() {
  return (
    <div>
      <div className={`${poppins.className} `}>This is Poppins</div>
      <div className={`${lora.className} `}>This is Lora</div>
    </div>
  );
}
