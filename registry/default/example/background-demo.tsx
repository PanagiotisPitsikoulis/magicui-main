import Background from "@/registry/default/magicui/background";

export default function BackgroundDemo() {
  return (
    <div className="relative justify-center">
      <Background
        background={{
          default:
            "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          dark: "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="w-[400px] h-[400px]"></div>
      </Background>
    </div>
  );
}
