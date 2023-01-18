import React, {useState} from 'react';
import rentalFacade from "../utils/rentalFacade.js";

function APAssignRentalToTenant(props) {
    const [assign, setAssign] = useState(false)

    const initRentalToTenant = {rentalID: "", tenantID: ""}
    const [rentalToTenantInput, setRentalToTenantInput] = useState(initRentalToTenant)

    const performAssign = (evt) => {
        evt.preventDefault()

        assigning(rentalToTenantInput.rentalID, rentalToTenantInput.tenantID)
        props.setRefresh(false)
        setAssign(false)
    }

    const assigning = (rentalID, tenantID) => {
        rentalFacade.assignRentalToTenant(rentalID, tenantID)
            .then(() => props.setRefresh(true))

    }

    const handleOnChange = (evt) => {
        setRentalToTenantInput({...rentalToTenantInput, [evt.target.id]: evt.target.value})
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
                                    <th>TO TENANT ID</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input type="number" placeholder="ASSIGN RENTAL ID" name="rental_id" id="rentalID"/>
                                    </td>
                                    <td>
                                        <input type="number" placeholder="TO TENANT ID" name="tenant_id" id="tenantID"/>
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
                    }}><i className="fa fa-exchange"></i> CHANGE RENTAL FOR A TENANT</button>
                </div>
            )}
        </>
    );
}

export default APAssignRentalToTenant;