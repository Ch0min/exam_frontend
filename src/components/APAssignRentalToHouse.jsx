import React, {useState} from 'react';
import rentalFacade from "../utils/rentalFacade.js";

function APAssignRentalToHouse(props) {
    const [assign, setAssign] = useState(false)

    const initRentalToHouse = {rentalID: "", houseId: ""}
    const [rentalToHouseInput, setRentalToHouseInput] = useState(initRentalToHouse)

    const performAssign = (evt) => {
        evt.preventDefault()

        assigning(rentalToHouseInput.rentalID, rentalToHouseInput.houseID)
        props.setRefresh(false)
        setAssign(false)
    }

    const assigning = (rentalID, houseID) => {
        rentalFacade.assignRentalToHouse(rentalID, houseID)
            .then(() => props.setRefresh(true))

    }

    const handleOnChange = (evt) => {
        setRentalToHouseInput({...rentalToHouseInput, [evt.target.id]: evt.target.value})
    }

    return (
        <>
            {assign ? (
                <div>
                    <div>
                        <form onChange={handleOnChange}>
                            <table>
                                <thead>
                                <tr>
                                    <th>ASSIGN RENTAL ID</th>
                                    <th>TO HOUSE ID</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input type="number" placeholder="ASSIGN RENTAL ID" name="rental_id" id="rentalID"/>
                                    </td>
                                    <td>
                                        <input type="number" placeholder="TO HOUSE ID" name="house_id" id="houseID"/>
                                    </td>
                                    <td>
                                        <button className="btn-standard" onClick={performAssign} type="submit" style={{fontSize: "24px"}}>Assign</button>
                                        <br/>
                                        <button className="btn-cancel" onClick={() => {
                                            setAssign(false)
                                        }}><i className="fa fa-close"></i> Cancel
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <button className="btn-standard" style={{fontSize: "26px"}} onClick={() => {
                        setAssign(true)
                    }}><i className="fa fa-arrows-h"></i> ASSIGN RENTAL TO A HOUSE</button>
                </div>
            )}
        </>
    );
}

export default APAssignRentalToHouse;
