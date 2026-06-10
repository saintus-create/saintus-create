const fs = require('fs');
const path = require('path');

const MDX_DIR = path.join(__dirname, '../data/mdx_archive');
const OUTPUT_FILE = path.join(__dirname, '../fern/openapi.json');

function generateOpenAPI() {
    const files = fs.readdirSync(MDX_DIR).filter(f => f.endsWith('.mdx'));
    
    // Base OpenAPI structure
    const openapi = {
        openapi: '3.1.0',
        info: {
            title: 'Encyclopedia of Rhetoric',
            description: 'The Encyclopedia of Rhetoric API provides programmatic access to over 295 entries covering rhetorical terms, theories, figures of speech, historical rhetoricians, and movements.',
            version: '1.0.0'
        },
        servers: [
            { url: 'https://api.encyclopedia-of-rhetoric.com/v1', description: 'Production server' }
        ],
        tags: [],
        paths: {}
    };

    const tagsSet = new Set();
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    alphabet.forEach(letter => {
        openapi.tags.push({ name: letter, description: `Terms starting with ${letter}` });
    });

    for (const file of files) {
        const content = fs.readFileSync(path.join(MDX_DIR, file), 'utf8');
        
        // Extract title from frontmatter
        const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
        if (!titleMatch) continue;
        
        let title = titleMatch[1].trim();
        if (title.toLowerCase() === 'index') continue;
        if (title.toLowerCase() === 'components') continue;
        
        // Extract description
        const descMatch = content.match(/description:\s*["']?([^"'\n]+)["']?/);
        let summaryText = descMatch ? descMatch[1].trim() : title;

        // Strip frontmatter to get markdown content
        const parts = content.split('---');
        let markdownBody = parts.length > 2 ? parts.slice(2).join('---').trim() : content;
        
        const slug = file.replace('.mdx', '');
        let firstLetter = title.charAt(0).toUpperCase();
        if (!alphabet.includes(firstLetter)) firstLetter = 'Other';
        
        if (firstLetter === 'Other' && !tagsSet.has('Other')) {
            openapi.tags.push({ name: 'Other', description: 'Miscellaneous' });
            tagsSet.add('Other');
        }

        // Add path
        openapi.paths[`/terms/${slug}`] = {
            get: {
                tags: [firstLetter],
                summary: title,
                description: markdownBody,
                operationId: `get_${slug}`,
                responses: {
                    '200': {
                        description: 'Successful retrieval of the term.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        term: { type: 'string', example: title },
                                        content: { type: 'string', example: summaryText }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(openapi, null, 2));
    console.log(`Successfully generated ${OUTPUT_FILE} with ${Object.keys(openapi.paths).length} terms.`);
}

generateOpenAPI();
