import { DefaultSeoProps } from 'next-seo';
import websiteData from './website.json';

export const defaultSeo: DefaultSeoProps = {
    defaultTitle: websiteData.site_title,
    description: websiteData.site_description,
    additionalMetaTags: [
        { name: 'viewport', content: 'minimum-scale=1, initial-scale=1, width=device-width' }
    ],
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: process.env.VERCEL_URL,
        site_name: websiteData.site_title,
        images: [
            {
                url: `${process.env.VERCEL_URL}/preview.png`,
                width: 1200,
                height: 800,
                alt: websiteData.site_title
            }
        ]
    }
};

export const websiteTitle = websiteData.site_title;
