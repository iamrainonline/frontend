import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

function BSCarousel({ posts }) {
   const Sliders = [
      {
         img: "https://images.pexels.com/photos/5427671/pexels-photo-5427671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         title: "Exploring the Frontiers of Science",
         desc: "Embark on an exhilarating journey through cutting-edge scientific discoveries and breakthroughs in our latest article.",
      },
      {
         img: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         title: "Culinary Adventures - Savoring the World of Flavors",
         desc: "Indulge your taste buds in our gastronomic escapade as we traverse diverse cuisines",
      },
      {
         img: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
         title: "Frames of Enchantment - A Cinematic Journey",
         desc: "Embark on a mesmerizing cinematic voyage, exploring the captivating world of filmmaking, visual storytelling, and the magic of motion pictures",
      },
   ];

   return (
      <Carousel data-bs-theme="">
         <Carousel.Item className="carouselItem">
            <img src={Sliders[0].img} alt="First slide" />
            <Carousel.Caption>
               <h1>{Sliders[0].title}</h1>
               <p>{Sliders[0].desc}</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item className="carouselItem">
            <img src={Sliders[1].img} alt="First slide" />
            <Carousel.Caption>
               <h1>{Sliders[1].title}</h1>
               <p>{Sliders[1].desc}</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item className="carouselItem">
            <img src={Sliders[2].img} alt="First slide" />
            <Carousel.Caption>
               <h1>{Sliders[2].title}</h1>
               <p>{Sliders[2].desc}</p>
            </Carousel.Caption>
         </Carousel.Item>
      </Carousel>
   );
}

export default BSCarousel;
