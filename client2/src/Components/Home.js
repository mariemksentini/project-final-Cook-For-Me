import { Button } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footerr from "./Footerr";

const Home = () => {
    const token = localStorage.getItem("token")
    const [left, setLeft] = useState(0);
    const tickerRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate()

    const foods = [
        { 
            id: 1, 
            price: "5dt", 
            description: "A crispy, wood-fired pizza topped with rich tomato sauce, melted mozzarella, and fresh basil.", 
            Stock: "7 pizzas", 
            name: "Pizza", 
            chef: "Mariem Ksentini", 
            chefImage: "/person-home-1.jpg" 
        },
        { 
            id: 2, 
            price: "10dt", 
            description: "A juicy, flame-grilled beef patty stacked with fresh lettuce, tomatoes, and a toasted bun.", 
            Stock: "7 pieces", 
            name: "Burger",  
            chef: "Mahmoud Zaouchi", 
            chefImage: "/person-home-4.jpg" 
        },
        { 
            id: 3, 
            price: "9dt", 
            description: "Al dente pasta tossed in a creamy sauce with garlic, parmesan, and fresh herbs.", 
            Stock: "9 plats", 
            name: "Pasta",  
            chef: "Ala Chiba", 
            chefImage: "/person-home-3.jpg" 
        },
        { 
            id: 4, 
            price: "28dt", 
            description: "A delicate selection of fresh sushi rolls, crafted with premium seafood and Japanese flavors.", 
            Stock: "8 boxes", 
            name: "Sushi",  
            chef: "Iram Younes", 
            chefImage: "/person-home-2.jpg" 
        }
    ];

    const feedbacks = [
        {
          id: 1,
          person: "James Carter",
          feedback: "The food is absolutely delicious! 'Cook For Me' has saved me so much time, allowing me to focus on work and spend more quality time with my kids.",
          persImage: "/feedback-man-white.jpg",
        },
        {
          id: 2,
          person: "Emily Johnson",
          feedback: "This website is a lifesaver! I no longer have to stress about cooking after a long day, and I get to enjoy amazing home-cooked meals without the effort.",
          persImage: "/feedback-girl-white.jpg",
        },
        {
          id: 3,
          person: "Sarah Thompson",
          feedback: "I always cook extra food, and I hate wasting it. Selling it on 'Cook For Me' lets me share my home-cooked meals with people who need them.",
          persImage: "/person-home-2.jpg",
        },
        {
          id: 4,
          person: "Hannah Anderson",
          feedback: "I love cooking, but I always end up making more than I need. Thanks to this platform, I can share my meals instead of letting them go to waste!",
          persImage: "/person-home-1.jpg",
        },
    ];
      
    

    const foodNames = [
        "Pizza 🍕", "Sushi 🍣", "Tacos 🌮", "Pasta 🍝", "Burgers 🍔", 
        "Salads 🥗", "Paella 🥘", "Croissants 🥐", "Falafel 🧆", "Ramen 🍜",
        "Steak 🥩", "Lasagna 🧀", "Donuts 🍩", "Ice Cream 🍨", "BBQ Ribs 🍖",
        "Shawarma 🌯", "Cheesecake 🍰", "Macarons 🍪", "Couscous 🥙", "Pancakes 🥞"
    ];

    const adjectives = [
        "Trust", "Love", "Family", "Unity", "Peace", 
        "Hope", "Happiness", "Courage", "Strength", "Kindness",
        "Wisdom", "Joy", "Respect", "Gratitude", "Compassion",
        "Freedom", "Success", "Growth", "Inspiration", "Empathy"
    ];
    

    useEffect(() => {
        const tickerWidth = tickerRef.current?.offsetWidth || 0;
        const containerWidth = containerRef.current?.offsetWidth || 0;
        let position = containerWidth;

        const tick = () => {
            position -= 1;
            if (position < -tickerWidth) {
                position = containerWidth;
            }
            setLeft(position);
            requestAnimationFrame(tick);
        };

        tick();
    }, []);
    

   
    

    return (
        <>
        <div className="relative w-full h-[500px]">
            {/* Vidéo en arrière-plan */}
            <video 
                className="w-full h-full" 
                style={{
                    filter: "blur(3px)"
                }}
                autoPlay 
                loop 
                muted
            >
                <source src="chicken-salad.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Contenu au-dessus de la vidéo */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white bg-black bg-opacity-50 text-center px-4">
                <h1 className="headHome" >
                    Where Homemade Food <br/>
                    Meets Hungry Hearts
                </h1>
                {!token &&
                    <div style={{width : "600px", marginTop : "40px"}} className="flex items-center justify-between">
                        <Button className="bg-transparent homeBtnn" as={Link} to={'/SignUp'} color="gray">Regiser</Button>
                        <Button className="bg-transparent homeBtnn" as={Link} to={'/SignIn'} color="gray">login</Button>
                    </div>
                }
                
            </div>
        </div>

        {/* Section about COOK FOR ME */}
        {/* <div style={{height : "100vh", fontFamily : "sans-serif"}} className="w-full flex flex-col items-center justify-center py-16 bg-white text-center px-6">
            <h2 style={{ fontSize: "3rem", lineHeight: "1.2" }} className=" font-bold text-teal-900 mb-4">COOK FOR ME</h2>
            <p className="text-lg  max-w-2xl mx-auto  text-gray-600 italic leading-relaxed text-center ">
                COOK FOR ME is a Tunisian startup dedicated to making healthy homemade food easily accessible to everyone. 
                At the same time, it fosters a spirit of sharing and community, connecting people through the love of good food.
            </p> */}
            {/* <div style={{width : "600px", marginTop : "40px"}} className="flex items-center justify-between">
                <Button className=" homeBtnn" style={{color : "black"}} color="gray"><span></span>App Store</Button>
                <Button className=" homeBtnn" style={{color : "black"}} color="gray">Google Play</Button>
            </div> */}
            {/* <div style={{ width: "450px", marginTop: "40px" }} className="flex items-center justify-between">
                <img 
                    src="/app-store-black.png" 
                    alt="app-store" 
                    className="image-download-home cursor-pointer" 
                    onClick={() => window.open("https://apps.apple.com/", "_blank")}
                />
                <img 
                    src="/google-play-black.png" 
                    alt="google-play" 
                    className="image-download-home cursor-pointer" 
                    onClick={() => window.open("https://play.google.com/store", "_blank")}
                />
            </div>
        </div> */}

        <div style={{ height: "550px", fontFamily: "sans-serif" }} className="w-full flex flex-col items-center justify-center py-16  text-center px-6">
            <h2 style={{fontSize : "48px"}} className="text-5xl font-extrabold text-teal-900 mb-4 tracking-tight">COOK FOR ME</h2>
            
            <p className="text-lg max-w-xl mx-auto text-gray-600 italic leading-relaxed">
                A platform that connects food lovers and home chefs, making it easy to enjoy delicious homemade meals while reducing food waste.  
            </p>

            <div style={{ width: "450px", marginTop: "40px" }} className="flex items-center justify-between">
                <img 
                src="/app-store-black.png" 
                alt="app-store" 
                className="image-download-home cursor-pointer" 
                onClick={() => window.open("https://apps.apple.com/", "_blank")}
                />
                <img 
                src="/google-play-black.png" 
                alt="google-play" 
                className="image-download-home cursor-pointer" 
                onClick={() => window.open("https://play.google.com/store", "_blank")}
                />
            </div>
        </div>


        {/* tick  food*/}
        <div ref={containerRef} className="overflow-hidden ticker-container py-3">
            <div 
                ref={tickerRef} 
                className="inline-block whitespace-nowrap ticker-text text-lg font-bold animate-scroll"
                style={{ marginLeft: `${left}px` }}
            >
                {foodNames.map((food, index) => (
                    <span key={index} className="mx-4">{food}</span>
                ))}
            </div>
        </div>

        <div 
            style={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                backgroundColor: '#F9F3F0',  // This is your background color
            }}>
            <img 
                src={`${process.env.PUBLIC_URL}/person-eating-fresh-cheese.jpg`} 
                alt="Background"
                style={{
                    objectFit: 'cover',  // Makes the image cover the entire div
                    width: '100%',
                    height: '100%',
                    position: 'absolute',  // Image covers the div without affecting content
                    top: 0,
                    left: 0,
                    zIndex: 20,  // Ensure the image stays behind the content
                }} 
            />
            
        </div>
        {/* tick  adj*/}
        <div ref={containerRef} className="overflow-hidden ticker-container py-3">
            <div 
                ref={tickerRef} 
                className="inline-block whitespace-nowrap ticker-text text-lg font-bold animate-scroll"
                style={{ marginLeft: `${left}px` }}
            >
                {adjectives.map((adj, index) => (
                    <span key={index} className="mx-4">{adj}</span>
                ))}
            </div>
        </div>
        <div className="h-screen flex items-center justify-between px-10 relative " >
            <div className="w-1/2 flex justify-center items-center">
                <img 
                className="flex justify-center items-center"
                src="sushi-ramen.jpg"
                alt="pizza"
                style={{
                    width : "340px", 
                    marginTop : "150px",
                    marginLeft : "20px"
                }}
                />
                <img 
                className="flex justify-center items-center"
                src="pizza-burger.jpg"
                alt="pizza"
                style={{
                    width : "340px", 
                    marginLeft : "20px",
                    marginBottom : "150px",
                    
                }}
                />
            </div>
            <div style={{ padding: "40px" }} className="w-1/2 flex flex-wrap justify-center  ">
                {foods.map((food) => (
                    <div
                    key={food.id}
                    className=" shadow-lg rounded-xl p-5 flex flex-col cursor-pointer transition-transform hover:scale-105"
                    style={{ width: "300px", margin: "10px" }}
                    onClick={()=> navigate('/IndexFoods')}

                >
                    {/* Chef Info */}
                    <div className="flex items-center mb-3">
                        <img
                            src={food.chefImage || "/user-placeholder.png"}
                            alt={food.chef}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                        />
                        <p className="text-sm font-medium text-gray-700 ml-3">{food.chef}</p>
                    </div>
                
                    
                
                    {/* Food Details */}
                    <div className="mt-3 ">
                        <p className="text-lg font-semibold text-gray-900">{food.name}</p>
                        <p className="text-sm text-gray-500">{food.description}</p>
                        <p className="text-sm text-gray-600">Stock : {food.Stock} available</p>
                        <p className="mt-1 text-md font-bold text-teal-600">{food.price}</p>
                    </div>
                </div>
                
                ))}
            </div>


        </div>

        {/* tick  food*/}
        {/* <div ref={containerRef} className="overflow-hidden ticker-container py-3">
            <div 
                ref={tickerRef} 
                className="inline-block whitespace-nowrap ticker-text text-lg font-bold animate-scroll"
                style={{ marginLeft: `${left}px` }}
            >
                {foodNames.map((food, index) => (
                    <span key={index} className="mx-4">{food}</span>
                ))}
            </div>
        </div> */}

        <div 
            style={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                backgroundColor: '#F9F3F0',  // This is your background color
            }}>
            <img 
                src={`/pasta-black.jpg`} 
                alt="Background"
                style={{
                    objectFit: 'cover',  // Makes the image cover the entire div
                    width: '100%',
                    height: '100%',
                    position: 'absolute',  // Image covers the div without affecting content
                    top: 0,
                    left: 0,
                    zIndex: 20,  // Ensure the image stays behind the content
                }} 
            />
            
        </div>
        {/* tick  adj*/}
        {/* <div ref={containerRef} className="overflow-hidden ticker-container py-3">
            <div 
                ref={tickerRef} 
                className="inline-block whitespace-nowrap ticker-text text-lg font-bold animate-scroll"
                style={{ marginLeft: `${left}px` }}
            >
                {adjectives.map((adj, index) => (
                    <span key={index} className="mx-4">{adj}</span>
                ))}
            </div>
        </div> */}

        {/* <div style={{ padding: "40px" }} className="w-full flex flex-wrap justify-center">
            {feedbacks.map((feedback) => (
                <div
                key={feedback.id}
                className="shadow-lg rounded-xl p-5 flex flex-col cursor-pointer transition-transform hover:scale-105 bg-white"
                style={{ width: "500px", margin: "30px" }}
                >
                <div className="flex items-center mb-3">
                    <img
                    src={feedback.persImage}
                    alt={feedback.person}
                    className=" rounded-full object-cover border-2 border-gray-300"
                    style={{width : "40px", height : "40px"}}
                    />
                    <p className="text-base font-medium text-gray-700 ml-3" style={{margin : "10px"}}>{feedback.person}</p>
                </div>
                <p className="text-sm text-gray-600 italic">"{feedback.feedback}"</p>
                </div>
            ))}
        </div> */}


        <div style={{ padding: "40px" }} className="w-full flex flex-wrap justify-center">
        {feedbacks.map((feedback) => (
            <div
            key={feedback.id}
            className="shadow-lg rounded-xl p-6 flex flex-col transition-transform hover:scale-105 bg-white"
            style={{ width: "500px", margin: "30px" }}
            >
            {/* Person Info */}
            <div className="flex items-center mb-4">
                <img
                src={feedback.persImage}
                alt={feedback.person}
                className="rounded-full object-cover border-2 border-gray-300"
                style={{ width: "40px", height: "40px" }}
                />
                <p className="text-base font-medium text-gray-700 ml-3" style={{margin : "10px"}}>{feedback.person}</p>
            </div>

            {/* Feedback Text */}
            <p className="text-sm text-gray-600 italic leading-relaxed text-left">
                "{feedback.feedback}"
            </p>
            </div>
        ))}
        </div>



        
                
        <div>
           <Footerr/>
        </div>
        </>
    );
};

export default Home;
