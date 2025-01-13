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
        {
          title: "Banner",
          href: `/docs/components/banner`,
          items: [],
        },
        {
          title: "Carousel",
          href: `/docs/components/carousel`,
          items: [],
        },
        {
          title: "Container",
          href: `/docs/components/container`,
          items: [],
        },
        {
          title: "CTA",
          href: `/docs/components/cta`,
          items: [],
        },
        {
          title: "Features",
          href: `/docs/components/features`,
          items: [],
        },
        {
          title: "Footer",
          href: `/docs/components/footer`,
          items: [],
        },
        {
          title: "Grid",
          href: `/docs/components/grid`,
          items: [],
        },
        {
          title: "Hero",
          href: `/docs/components/hero`,
          items: [],
        },
        {
          title: "Navbar",
          href: `/docs/components/navbar`,
          items: [],
        },
        {
          title: "Section",
          href: `/docs/components/section`,
          items: [],
        },
        {
          title: "Testimonials",
          href: `/docs/components/testimonials`,
          items: [],
        },
      ],
    },
  ],
};
