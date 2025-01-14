import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import AnimatedWrapper from "../magicui/animate";

export default function App() {
  const list = [
    {
      title: "Orange",
      img: "https://images.pexels.com/photos/29470460/pexels-photo-29470460/free-photo-of-stunning-ocher-landscape-of-rustrel-france.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://images.pexels.com/photos/20821566/pexels-photo-20821566/free-photo-of-footbridge-on-canal-in-venice.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://images.pexels.com/photos/29799573/pexels-photo-29799573/free-photo-of-coffee-farmer-harvesting-in-xicotepec-mexico.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://images.pexels.com/photos/28907971/pexels-photo-28907971/free-photo-of-refreshing-iced-drinks-in-cafe-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: "$5.30",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2">
      {list.map((item, index) => (
        <AnimatedWrapper
          key={index}
          triggerOnView={true}
          left={index % 2 === 0 ? 50 : 0} // Alternating left slide for variety
          duration={0.5 + index * 0.1} // Staggered animation duration
          delay={index * 0.3} // Staggered delay for cascading effect
        >
          <Card
            isPressable
            shadow="sm"
            onPress={() => console.log(`${item.title} pressed`)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.title}
                className="w-[350px] object-cover h-[170px]"
                radius="lg"
                shadow="sm"
                src={item.img}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        </AnimatedWrapper>
      ))}
    </div>
  );
}
