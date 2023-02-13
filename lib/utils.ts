export const getImageUrl = (icon: string) =>
  `/api/image?icon=${encodeURIComponent(icon)}`
