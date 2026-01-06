import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx/mdx-components";

export async function renderMdx(source: string) {
    return compileMDX({
        source,
        components: mdxComponents,
        options: {
            parseFrontmatter: false,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    [
                        rehypePrettyCode,
                        {
                            theme: {
                                dark: "github-dark",
                                light: "github-light",
                            },
                            keepBackground: false,
                            onVisitLine(node: {
                                children: Array<{ type: string; value?: string }>;
                            }) {
                                // Prevents lines from collapsing in `display: grid` mode
                                if (node.children.length === 0) {
                                    node.children = [{ type: "text", value: " " }];
                                }
                            },
                            onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
                                node.properties.className = ["line", "highlighted"];
                            },
                            onVisitHighlightedWord(node: { properties: { className?: string[] } }) {
                                node.properties.className = ["word", "highlighted"];
                            },
                        },
                    ],
                ],
            },
        },
    });
}
