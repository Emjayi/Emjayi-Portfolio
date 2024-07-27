export const post =
{
    name: "post",
    type: "document",
    title: "Post",
    fields: [
        {
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: 'title',  // Automatically generate the slug from the title field
                maxLength: 200,   // Optional: specify the maximum length for the slug
                slugify: (input: string) => input
                    .toLowerCase()
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .slice(0, 200)         // Optional: enforce maximum length
            },
        },
        {
            type: 'image',
            name: 'articleImage',
            fields: [
                {
                    type: 'text',
                    name: 'promptForImage',
                    title: 'Image prompt',
                    rows: 2,
                },
            ],
            options: {
                aiAssist: {
                    imageInstructionField: 'promptForImage',
                },
            },
        },
        {
            name: "shortDescription",
            type: "text",
            title: "Short Description"
        },
        {
            name: "content",
            type: "array",
            title: "Content",
            of: [{ type: 'block' }]
        },
    ]
}