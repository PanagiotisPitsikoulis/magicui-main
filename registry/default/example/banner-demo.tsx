import Banner from "@/registry/default/magicui/banner";

export default function BannerDemo() {
  return (
    <div className="w-full">
      <Banner
        pathName="/"
        pathsData={[
          {
            path: "/",
            emoji: "🎨",
            primaryText: "The ShadCN for landing pages",
            secondaryLink: { href: "/" },
            primaryLink: {
              href: "/docs/get_started",
              label: "Get Started",
            },
          },
        ]}
      />
    </div>
  );
}
