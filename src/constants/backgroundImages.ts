export const BACKGROUND_IMAGES = [
  "/assets/bg-img-1.png",
  "/assets/bg-img-2.png",
  "/assets/bg-img-3.png",
  "/assets/bg-img-4.png",
  "/assets/bg-img-5.png",
];

export function getRandomBackgroundImage(): string {
  return BACKGROUND_IMAGES[
    Math.floor(Math.random() * BACKGROUND_IMAGES.length)
  ];
}
