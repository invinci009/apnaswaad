const About = () => {
    return (
        <section id="about" className="py-20 bg-indigo-100 min-h-screen flex items-center">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl border-4 border-red-500 animate-slideIn">
                    <h2 className="text-3xl font-bold text-indigo-900 font-raleway text-center mb-6">
                        Our Sweet Legacy
                    </h2>
                    <div className="space-y-4 text-lg text-gray-700 font-source-sans">
                        <p>
                            Apna Sawaad is India's love letter to the timeless joy of mithai. From the golden swirl of Jalebi
                            to the melt-in-your-mouth Rasmalai, our sweets celebrate tradition with a modern touch.
                        </p>
                        <p>
                            Inspired by festive colors and everyday smiles, we bring handcrafted happiness to every foodie's heart.
                            Each sweet is made with authentic recipes passed down through generations, using only the finest
                            ingredients.
                        </p>
                        <p>
                            Whether you're celebrating a special occasion or simply craving something sweet, Apna Sawaad is
                            here to make every moment sweeter. We deliver authentic Indian mithai right to your doorstep,
                            ensuring freshness and quality in every bite.
                        </p>
                        <div className="border-t border-gray-300 pt-4 mt-6">
                            <h3 className="text-xl font-bold text-indigo-900 font-raleway mb-2">Our Promise</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>100% authentic traditional recipes</li>
                                <li>Premium quality ingredients</li>
                                <li>Fresh preparation daily</li>
                                <li>Fast and reliable delivery</li>
                                <li>Hygienically prepared in certified kitchens</li>
                            </ul>
                        </div>
                        <div className="border-t border-gray-300 pt-4 mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Made with ❤️ by <strong>Md Amanullah</strong>
                                <br />
                                Instagram: <a href="https://www.instagram.com/_.amanullah/" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">@_.amanullah</a>
                                <br />
                                GitHub: <a href="https://github.com/amaan-exe" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">@amaan-exe</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
