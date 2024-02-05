import { Link, Route, Routes, useParams } from "react-router-dom";
import Table from "./Table";

function RestaurantDashboard() {
    const { restaurantId } = useParams();
    console.log(restaurantId);

    return (
        <div>
            <h2>Restaurant Dashboard</h2>
            <Link to={`${restaurantId}/table`}>Add Table</Link>
            <Routes>
                <Route path={`${restaurantId}/table`} element={<Table />} />
            </Routes>
        </div>
    );
}

export default RestaurantDashboard;
