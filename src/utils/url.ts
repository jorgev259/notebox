import { BETTER_AUTH_URL } from "astro:env/client";

export const getFullUrl = (path: string) => `${BETTER_AUTH_URL}${path}`;
