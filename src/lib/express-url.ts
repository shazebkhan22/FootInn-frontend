export default function getExpressURL(): string {
    return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:5001";
  }
  