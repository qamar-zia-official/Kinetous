import { MetadataRoute } from "next";
import { ourServicesData } from "./(company)/sections/our-services/our-services-data";
import { caseStudiesContent } from "@/content/case-studies";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://kinetous.com";

    // 1. Static structural endpoints
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
        },
        {
            url: `${baseUrl}/services`,
        },
        {
            url: `${baseUrl}/about`,
        },
        {
            url: `${baseUrl}/pricing`,
        },
        // /blog is a mirror of the blog that is canonically hosted on
        // blog.kinetous.com, so it is intentionally left out of this sitemap.
        {
            url: `${baseUrl}/case-studies`,
        },
        {
            url: `${baseUrl}/contact`,
        },
        {
            url: `${baseUrl}/overview`,
        },
        {
            url: `${baseUrl}/privacy`,
        },
        {
            url: `${baseUrl}/team`,
        },
        {
            url: `${baseUrl}/terms`,
        },
    ];

    // 2. Service pillar/cluster pages — one per service category
    const serviceRoutes: MetadataRoute.Sitemap = ourServicesData.map(
        (service) => ({
            url: `${baseUrl}/services/${service.slug}`,
        }),
    );

    // 3. Case study pages
    const caseStudyRoutes: MetadataRoute.Sitemap = caseStudiesContent.items.map(
        (study) => ({
            url: `${baseUrl}/case-studies/${study.slug}`,
        }),
    );

    return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes];
}
