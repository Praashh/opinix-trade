import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { eventData } from "@/lib/event-data";
import { EventCard } from "../ui/EventCard";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex items-center justify-center w-full">
                <div>
                    <motion.h1
                        className="text-5xl font-bold  mb-8"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                            OpiniX{" "}
                            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                    <span className="">Exploding beams.</span>
                                </div>
                                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                                    <span className="">Exploding beams.</span>
                                </div>
                            </div>
                        </h2>
                    </motion.h1>

                    <motion.p
                        className="text-lg flex justify-center items-center mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Share your thoughts, explore trending opinions, and engage with the community.
                    </motion.p>

                    <motion.div
                        className="space-x-4 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Button className="bg-blue-500 h-10 font-medium w-40 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Create Event
                        </Button>
                        <Button 
                        onClick={()=>{navigate('/portfolio')}}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg">
                            Portfolio
                        </Button>
                    </motion.div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full">

                {eventData.map((event: any, index) => (
                    <motion.div
                        key={index}
                        className="p-2 bg-[#232323] rounded-lg shadow-md "
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        <EventCard key={event.id} event={event} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
