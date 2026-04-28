import farmerPhone from "@/assets/deep-farm-student.jpg";
import heroPaddy from "@/assets/hero-paddy.jpg";
import iotSystem from "@/assets/ito.jpg";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
};

export const siteImages = {
  hero: {
    src: heroPaddy,
    width: 1920,
    height: 1080,
  },
  challenge: {
    src: farmerPhone,
    width: 1024,
    height: 1024,
  },
  solarIot: {
    src: iotSystem,
    width: 1920,
    height: 1080,
  },
} satisfies Record<string, SiteImage>;
