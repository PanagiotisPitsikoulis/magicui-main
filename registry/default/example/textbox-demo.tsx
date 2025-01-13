import Textbox from "@/registry/default/magicui/textbox";

export default function TextboxDemo() {
  return (
    <div className="relative flex flex-col items-center space-y-8 p-8">
      {/* Example 1: Medium-sized textbox with title and subtitle, oriented to the left */}
      <Textbox
        orientation="left"
        title="Welcome to MagicUI"
        subtitle="This is a customizable textbox component"
        size="md"
      />
    </div>
  );
}
