// https://next-auth.js.org/configuration/nextjs#middleware
// this is for authentication middleware via next-auth
export { default } from "next-auth/middleware";

// add this for specific routes only
//export const config = { matcher: ["/dashboard"] }
