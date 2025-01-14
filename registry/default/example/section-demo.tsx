import Section from "@/registry/default/magicui/section";
import Safari from "../magicui/safari";

export default function SectionDemo() {
  return (
    <div className="relative justify-center">
      <Section
        landingTextProps={{
          title: "Modern Tools",
          subtitle:
            "🤖 Leverage the latest web technologies and best practices for building exceptional landing pages",
        }}
        animatedWrapperProps={{
          animatedWrapperPropsText: {
            triggerOnView: true,
            right: 40,
            duration: 0.5,
          },
          animatedWrapperPropsContent: {
            triggerOnView: true,
            left: 40,
            duration: 0.5,
          },
        }}
        orientation="left"
        content={
          <div className={"flex justify-start items-start"}>
            <Safari
              width={700}
              height={450}
              imageSrc="https://images.pexels.com/photos/27643389/pexels-photo-27643389/free-photo-of-santo-amaro-lencois-maranhenses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
        }
      />
    </div>
  );
}
