import React, {useState} from 'react';
import houseFacade from "../utils/houseFacade.js";

function CreateHouse(props) {
    const [create, setCreate] = useState(false)

    const initHouse = {
        houseAddress: "", houseCity: "", numberOfRooms: ""
    }
    const [houseInput, setHouseInput] = useState(initHouse)

    const performCreateHouse = (evt) => {
        evt.preventDefault()

        // Alerts if missing input.
        if (houseInput.houseAddress.trim().length === 0 || houseInput.houseCity.trim().length === 0 ||
            houseInput.numberOfRooms.trim().length === 0) {
            alert("The House needs more information.")
            return
        }

        createHouse(houseInput.houseAddress, houseInput.houseCity, houseInput.numberOfRooms)
        props.setRefresh(false)
        setCreate(false)
    }

    const createHouse = (houseAddress, houseCity, numberOfRooms) => {
        houseFacade.createHouse(houseAddress, houseCity, numberOfRooms)
            .then(() => props.setRefresh(true))
    }

    const handleOnChange = (evt) => {
        setHouseInput({...houseInput, [evt.target.id]: evt.target.value})
    }

    return (
        <>
            {create ? (
                <div>
                    <div>
                        <button onClick={() => {
                            setCreate(false)
                        }}>Cancel
                        </button>
                    </div>
                    <div>
                        <form onChange={handleOnChange}>
                            <table>
                                <thead>
                                <tr>
                                    <th>ADDRESS</th>
                                    <th>CITY</th>
                                    <th>NUMBER OF ROOMS</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input type="text" placeholder="Address" name="house_address"
                                               id="houseAddress"/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="City" name="house_city"
                                               id="houseCity"/>
                                    </td>
                                    <td>
                                        <input type="number" placeholder="Number of Rooms" name="number_of_rooms"
                                               id="numberOfRooms"/>
                                    </td>
                                    <td>
                                        <button onClick={performCreateHouse} type="submit">Create</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <button className="btn-standard" style={{fontSize: "24px"}} onClick={() => {
                        setCreate(true)
                    }}>CREATE NEW HOUSE
                    </button>
                </div>
            )}
            <div>

            </div>
        </>
    );
}

export default CreateHouse;