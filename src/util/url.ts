export const getURL = () => {
    const url =
      process?.env?.URL && process.env.URL !== ''
        ? process.env.URL
        : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
        ? process.env.VERCEL_URL
        : 'http://localhost:3000';
    return url.includes('http') ? url : `https://${url}`;
};

export const getPublicURL = () => {
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
        return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    }
    return null;
}
