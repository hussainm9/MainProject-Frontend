import { Link, Route, Routes, useParams } from "react-router-dom";
import Table from "./Table";

function RestaurantDashboard() {
    const { restaurantId } = useParams();
    const id = restaurantId
    console.log(restaurantId);

    return (
        <div>
            <h2>Restaurant Dashboard</h2>
            
        </div>
    );
}

export default RestaurantDashboard;
