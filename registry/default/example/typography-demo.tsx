import Typography from "@/registry/default/magicui/typography";

export default function ArticlePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Article Title */}
      <Typography as="h1" variant="hero" size="6xl" className="text-foreground">
        The Impact of Typography in Web Design
      </Typography>

      {/* Introduction Section */}
      <section className="space-y-6">
        <Typography as="p" variant="primary" size="base">
          Typography is one of the most crucial elements of web design. It
          shapes how users perceive content, enhancing readability and the
          overall user experience. In this article, we will explore the
          importance of typography in web design and how it can affect the
          perception of a website's design.
        </Typography>
      </section>

      {/* What is Typography? Section */}
      <section className="space-y-6">
        <Typography
          as="h2"
          variant="title"
          size="4xl"
          className="text-foreground"
        >
          What is Typography?
        </Typography>
        <Typography as="p" variant="primary" size="base">
          Typography refers to the arrangement of text in a visually appealing
          and readable manner. It involves choosing the right fonts, sizes,
          weights, line lengths, and spacing to create content that is not only
          legible but also aligns with the overall design style of a website or
          application.
        </Typography>
      </section>

      {/* Importance of Typography Section */}
      <section className="space-y-6">
        <Typography
          as="h2"
          variant="title"
          size="4xl"
          className="text-foreground"
        >
          Why is Typography Important in Web Design?
        </Typography>
        <Typography as="p" variant="primary" size="base">
          The right typography can set the tone for a website, guiding visitors
          through content and improving user interaction. It plays a role in:
        </Typography>
        <ul className="list-disc pl-6 space-y-2">
          <li>Improving readability and comprehension</li>
          <li>Creating a visual hierarchy for easy navigation</li>
          <li>Establishing brand identity and personality</li>
          <li>Enhancing the aesthetic appeal of a website</li>
        </ul>
      </section>

      {/* How to Choose the Right Typography Section */}
      <section className="space-y-6">
        <Typography
          as="h2"
          variant="title"
          size="4xl"
          className="text-foreground"
        >
          How to Choose the Right Typography
        </Typography>
        <Typography as="p" variant="primary" size="base">
          Choosing the right typography involves several considerations. Here
          are some factors to keep in mind:
        </Typography>
        <ul className="list-disc pl-6 space-y-2">
          <li>Consider the purpose and tone of the content</li>
          <li>Choose a readable font for body text</li>
          <li>Ensure sufficient contrast between text and background</li>
          <li>Use hierarchy to differentiate headings from body text</li>
        </ul>
      </section>

      {/* Example of Effective Typography Section */}
      <section className="space-y-6">
        <Typography
          as="h2"
          variant="title"
          size="4xl"
          className="text-foreground"
        >
          Example of Effective Typography
        </Typography>
        <Typography as="p" variant="primary" size="base">
          Let’s look at an example of how different typographic elements can be
          used effectively in web design:
        </Typography>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Typography as="strong" variant="highlight" size="base">
              Headings
            </Typography>
            : Headings should stand out to catch the reader's attention. Use
            larger sizes and bold weights for the main headings.
          </li>
          <li>
            <Typography as="strong" variant="highlight" size="base">
              Body Text
            </Typography>
            : The body text should be legible with good line spacing and an
            appropriate font size for easy reading.
          </li>
          <li>
            <Typography as="strong" variant="highlight" size="base">
              Quotes
            </Typography>
            : Blockquotes can help highlight important points and break up the
            text to maintain visual interest.
          </li>
        </ul>
      </section>

      {/* Conclusion Section */}
      <section className="space-y-6">
        <Typography
          as="h3"
          variant="subtitle"
          size="3xl"
          className="text-foreground-700"
        >
          Conclusion
        </Typography>
        <Typography as="p" variant="primary" size="base">
          Typography is more than just choosing fonts. It is an essential part
          of web design that affects both usability and aesthetic appeal. By
          understanding its importance and applying best practices, you can
          significantly improve the user experience on your website.
        </Typography>
      </section>

      {/* Final Thoughts Section */}
      <section className="space-y-6">
        <Typography as="p" variant="muted" size="sm" className="text-gray-600">
          Typography isn’t just about the text on your site, it’s about creating
          an experience that feels consistent and pleasant for your users.
          Whether it’s through the choice of fonts, the spacing, or the
          hierarchy, every element contributes to a successful design.
        </Typography>
      </section>
    </div>
  );
}
