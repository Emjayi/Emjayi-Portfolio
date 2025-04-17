import { projects, other_projects, tools } from "@/content/data"

export default async function sitemap() {
    const baseUrl = "https://emjaysepahi.com"

    // Base routes
    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tools`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ]

    // Project routes
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}${project.link}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    }))

    // Other project routes
    const otherProjectRoutes = other_projects.map((project) => ({
        url: `${baseUrl}${project.link}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    }))

    // Tool routes
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/${tool.href}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
    }))

    return [...routes, ...projectRoutes, ...otherProjectRoutes, ...toolRoutes]
}
