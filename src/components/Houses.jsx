import React, {useState, useEffect} from 'react';
import houseFacade from "../utils/houseFacade.js";

import ViewTenantsBtn from "./ViewTenantsBtn.jsx";
import CreateHouse from "./CreateHouse.jsx";

function Houses(props) {
    const [houses, setHouses] = useState([])
    const [viewTenants, setViewTenants] = useState(0)
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        const getData = async () => {
            await houseFacade.getAllHouses((data) => {
                setHouses(data)
            }, "Can't fetch all Houses!")
        }
        getData()
    }, [props.refresh])


    return (
        <div>
            <h2>HOUSES</h2>

            <table>
                <thead>
                <tr>
                    <th>HOUSE ID</th>
                    <th>ADDRESS</th>
                    <th>CITY</th>
                    <th>NUMBER OF ROOMS</th>
                    <th>TENANTS</th>
                </tr>
                </thead>
                <tbody>
                {houses.map((data) => {
                        return (
                            <tr key={data.houseID}>
                                <td>{data.houseID}</td>
                                <td>{data.houseAddress}</td>
                                <td>{data.houseCity}</td>
                                <td>{data.numberOfRooms}</td>
                                <td>
                                    <ViewTenantsBtn houses={data} viewTenants={viewTenants} setViewTenants={setViewTenants}
                                                   clicked={clicked} setClicked={setClicked}/>
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
            <br/>
            <div>
                {<CreateHouse setRefresh={props.setRefresh}/>}
            </div>
        </div>
    );
}

export default Houses;