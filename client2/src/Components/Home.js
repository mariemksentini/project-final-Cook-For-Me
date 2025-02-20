import { Button } from "flowbite-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const token = localStorage.getItem("token")
    const [left, setLeft] = useState(0);
    const tickerRef = useRef(null);
    const containerRef = useRef(null);

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
                <h1 style={{ fontSize: "5rem", fontWeight: "bold", lineHeight: "1.2", fontFamily : "Verdana" }}>
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
        <div style={{height : "550px", fontFamily : "sans-serif"}} className="w-full flex flex-col items-center justify-center py-16 bg-white text-center px-6">
            <h2 style={{ fontSize: "3rem", lineHeight: "1.2" }} className=" font-bold text-teal-900 mb-4">COOK FOR ME</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                COOK FOR ME is a Tunisian startup dedicated to making healthy homemade food easily accessible to everyone. 
                At the same time, it fosters a spirit of sharing and community, connecting people through the love of good food.
            </p>
            <div style={{width : "600px", marginTop : "40px"}} className="flex items-center justify-between">
                <Button className=" homeBtnn" style={{color : "black"}} color="gray">App Store</Button>
                <Button className=" homeBtnn" style={{color : "black"}} color="gray">Google Play</Button>
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
            }}
        >
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
        {/* tick  food*/}
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
        </>
    );
};

export default Home;
