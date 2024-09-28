import { useState } from "react";
import { Button } from "../ui/button";
import axios from 'axios';

const EndEvent = () => {
    const [result, setResult] = useState("");

    async function handleEventEnd() {
        try {
            const res = await axios.post('http://localhost:8080/end-event', { result });

            if (res.status !== 400) {
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            alert('An error occurred');
        }
    }

    return (
        <div className="h-screen w-full flex justify-center items-center flex-col gap-3">
            <label>Result</label>
            <input 
                type="text" 
                className="text-black p-2" 
                onChange={(e) => setResult(e.target.value)} 
            />
            <Button onClick={handleEventEnd}>end</Button>
        </div>
    );
}

export default EndEvent;
