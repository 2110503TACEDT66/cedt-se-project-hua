export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/mybooking','/profile', '/booking/:path*', '/registerhoteladmin']
}