"use client";
import { other_projects } from "@/content/data";
import { Button } from "../../components/ui/button";
import { Github } from "lucide-react";
import Script from "next/script";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
	const project = other_projects.find((project) => project.link === window.location.pathname);
	const git_link = project?.git_link
	return (
		<section>
			<Button
				onClick={() => window.history.back()}
				className="fixed z-50 left-4 top-4"
				variant="outline"
			>
				Back
			</Button>
			<Script
				id="structured-data-projects"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "ItemList",
						itemListElement: other_projects.map((project, index) => ({
							"@type": "ListItem",
							position: index + 1,
							url: `https://emjaysepahi.com/${project.link}`,
							name: project.title,
						})),
					}),
				}}
			/>
			{
				git_link &&
				<Link
					href={git_link ? git_link : "/tools"}
				>
					<Button
						variant="outline"
						size="sm"
						className="fixed z-50 right-4 top-4"
					>
						<Github className="mr-2 h-4 w-4" />
						GitHub
					</Button>
				</Link>
			}
			{children}
		</section>
	);
}
