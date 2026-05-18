import { useEffect } from "react";
import { getAllItemsService } from "../services/api";

export default function HomePage() {
    const getAllItems = async () => {
        const data = await getAllItemsService();
        console.log(data);
    };
    useEffect(() => {
        getAllItems();
    }, []);
    return (
        <div>homePage</div>
    )
}
