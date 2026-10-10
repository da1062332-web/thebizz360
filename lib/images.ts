/** Registry of optimised images in /public/images (built by scripts/build-images.mjs). */
export type ImageAsset = {
  base: string;
  widths: readonly number[];
  width: number;
  height: number;
  alt: string;
};

export const images = {
  foodApp: {
    base: "/images/food-app",
    widths: [380, 760],
    width: 760,
    height: 1307,
    alt: "thebizz360 Food home screen with dish search, a veg filter, food categories such as breakfast, lunch, thali and biryani, and special offers",
  },
  workApp: {
    base: "/images/work-app",
    widths: [380, 760],
    width: 760,
    height: 1250,
    alt: "thebizz360 Work home screen with a search for services like a CA or tax consultant, a featured business card, and categories such as print, salon, clinic and pharmacy",
  },
  foodThali: {
    base: "/images/food-thali",
    widths: [720, 1400],
    width: 1400,
    height: 1050,
    alt: "Top-down view of an Indian thali with small bowls of curries, rice and sides on a banana leaf",
  },
  foodDesk: {
    base: "/images/food-desk",
    widths: [720, 1400],
    width: 1400,
    height: 933,
    alt: "A plate of food next to a laptop on a wooden office desk",
  },
  foodSnacks: {
    base: "/images/food-snacks",
    widths: [720, 1400],
    width: 1400,
    height: 1050,
    alt: "Plates of samosas, a wrap and a bun snack on a table",
  },
  workTower: {
    base: "/images/work-tower",
    widths: [720, 1400],
    width: 1400,
    height: 2114,
    alt: "Glass facade of a modern commercial office building against a blue sky",
  },
  workLobby: {
    base: "/images/work-lobby",
    widths: [720, 1400],
    width: 1400,
    height: 933,
    alt: "Bright reception lobby of a commercial office building with a long front desk",
  },
  workMeetingRoom: {
    base: "/images/work-meeting-room",
    widths: [720, 1400],
    width: 1400,
    height: 933,
    alt: "Professionals meeting in a glass-walled conference room inside an office floor",
  },
  workLounge: {
    base: "/images/work-lounge",
    widths: [720, 1400],
    width: 1400,
    height: 2100,
    alt: "Glass-walled ground-floor lounge of an office building looking out onto a commercial plaza",
  },
} satisfies Record<string, ImageAsset>;
