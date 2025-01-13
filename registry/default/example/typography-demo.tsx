import Typography from "@/registry/default/magicui/typography";

export default function TypographyDemo() {
  return (
    <div className="relative flex flex-col items-start space-y-4 p-4">
      <Typography as="h1" className="text-4xl font-bold">
        Welcome to MagicUI
      </Typography>
      <Typography as="h2" className="text-3xl font-semibold">
        Typography Showcase
      </Typography>
      <Typography as="p" className="text-lg text-gray-600">
        MagicUI's typography component makes it easy to render accessible and
        consistent headings and text elements with a variety of styles and
        customizations.
      </Typography>
      <Typography
        as="blockquote"
        className="text-lg italic text-gray-500 border-l-4 pl-4 border-gray-300"
      >
        "Design is not just what it looks like and feels like. Design is how it
        works." – Steve Jobs
      </Typography>
      <Typography as="ul" className="list-disc list-inside text-gray-700">
        <li>Responsive design</li>
        <li>Customizable styles</li>
        <li>Accessible components</li>
      </Typography>
    </div>
  );
}
