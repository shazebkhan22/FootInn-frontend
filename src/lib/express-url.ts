export default function getExpressURL(): string {
    return process.env.BACKEND_URL ?? "http://localhost:5001";
  }
  