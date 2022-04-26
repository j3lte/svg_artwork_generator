import { DefaultSeoProps } from 'next-seo';
import { getDeploymentUrl, hasPublicURL } from '@/util/url';
import websiteData from './website.json';

const deploymentURL = getDeploymentUrl();
const hasNextURL = hasPublicURL();

export const defaultSeo: DefaultSeoProps = {
    dangerouslySetAllPagesToNoFollow: !hasNextURL,
    dangerouslySetAllPagesToNoIndex: !hasNextURL,
    defaultTitle: websiteData.site_title,
    description: websiteData.site_description,
    additionalMetaTags: [
        { name: 'viewport', content: 'minimum-scale=1, initial-scale=1, width=device-width' }
    ],
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: deploymentURL,
        site_name: websiteData.site_title,
        images: [
            {
                url: `${deploymentURL}/preview.png`,
                width: 1200,
                height: 800,
                alt: websiteData.site_title
            }
        ]
    }
};

export const websiteTitle = websiteData.site_title;
