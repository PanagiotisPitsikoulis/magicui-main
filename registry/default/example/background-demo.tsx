import Background from "@/registry/default/magicui/background";

export default function BackgroundDemo() {
  return (
    <div className="relative justify-center">
      <Background background="https://images.pexels.com/photos/27137595/pexels-photo-27137595/free-photo-of-facade-of-the-hotel-residence-maximus-in-rome.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
        <div className="size-[400px]"></div>
      </Background>
    </div>
  );
}
