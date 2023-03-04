import { useEffect } from "react";
import { Get } from "../comman";

function Home() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3Mzc2Njg1MCwiZXhwIjoxNjczODUzMjUwfQ.tzMc-SDR3hE1B95zCcOzT8bz4odNDPTH8_nAI1FJ9Ak";
    const getDatas = async () => {
        const conf = {
            headers: {},
            params: {}
        };
        const response = await Get('users/online-users', token, conf);
        console.log(response);
    }
    useEffect(() => {
        // getDatas();
    }, [])
    return (
        "Hpme"
    )
}
export default Home;