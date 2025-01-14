import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/components",
    },
    {
      title: "Examples",
      href: "/examples",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [
            {
              title: "Next.js",
              href: `/docs/installation/next`,
              items: [],
            },
            {
              title: "Vite",
              href: `/docs/installation/vite`,
              items: [],
            },
            {
              title: "Manual",
              href: `/docs/installation/manual`,
              items: [],
            },
          ],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
      ],
    },
    {
      title: "Sections",
      items: [],
    },
    {
      title: "Components",
      items: [
        {
          title: "Typography",
          href: `/docs/components/typography`,
          items: [],
        },
        {
          title: "Textbox",
          href: `/docs/components/textbox`,
          items: [],
        },
        {
          title: "Animate",
          href: `/docs/components/animate`,
          items: [],
        },
        {
          title: "Background",
          href: `/docs/components/background`,
          items: [],
        },
      ],
    },
    {
      title: "Composed",
      items: [],
    },
  ],
};
