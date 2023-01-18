import React, {useState} from 'react';
import rentalFacade from "../utils/rentalFacade.js";

function APCreateRental(props) {
    const [create, setCreate] = useState(false)

    const initRental = {
        rentalStartDate: "", rentalEndDate: "", rentalPriceAnnual: "", rentalDeposit: "", rentalContactPerson: "",
        houseID: ""
    }
    const [rentalInput, setRentalInput] = useState(initRental)

    const performCreateRental = (evt) => {
        evt.preventDefault()

        // Alerts if missing input.
        if (rentalInput.rentalStartDate.trim().length === 0 || rentalInput.rentalEndDate.trim().length === 0 ||
            rentalInput.rentalPriceAnnual.trim().length === 0 || rentalInput.rentalDeposit.trim().length === 0 ||
            rentalInput.rentalContactPerson.trim().length === 0 || rentalInput.houseID.trim().length === 0) {
            alert("The Rental needs more information.")
            return
        }

        createRental(rentalInput.rentalStartDate, rentalInput.rentalEndDate, rentalInput.rentalPriceAnnual, rentalInput.rentalDeposit,
            rentalInput.rentalContactPerson, rentalInput.houseID)
        props.setRefresh(false)
        setCreate(false)
    }

    const createRental = (rentalStartDate, rentalEndDate, rentalPriceAnnual, rentalDeposit, rentalContactPerson, houseID) => {
        rentalFacade.createRental(rentalStartDate, rentalEndDate, rentalPriceAnnual, rentalDeposit, rentalContactPerson, houseID)
            .then(() => props.setRefresh(true))
    }

    const handleOnChange = (evt) => {
        setRentalInput({...rentalInput, [evt.target.id]: evt.target.value})
    }



    return (
        <>
            {create ? (
                <div>

                    <div>
                        <form onChange={handleOnChange}>
                            <table>
                                <thead>
                                <tr>
                                    <th>START DATE</th>
                                    <th>END DATE</th>
                                    <th>PRICE ANNUAL</th>
                                    <th>DEPOSIT</th>
                                    <th>CONTACT PERSON</th>
                                    <th>HOUSE</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input type="text" placeholder="Start Date" name="rental_start_date"
                                               id="rentalStartDate"/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="End Date" name="rental_end_date"
                                               id="rentalEndDate"/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="Price Annual" name="rental_price_annual"
                                               id="rentalPriceAnnual"/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="Deposit" name="rental_deposit"
                                               id="rentalDeposit"/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="Contact Person"
                                               name="rental_contact_person" id="rentalContactPerson"/>
                                    </td>
                                    <td>
                                        <select defaultValue={"DEFAULT"} name="house_id" id="houseID">
                                            <option value="DEFAULT" disabled>Choose House</option>
                                            <option value="1">Kløvervej 7, Kongens Lyngby</option>
                                            <option value="2">Lyngborgvej 3, Kastrup</option>
                                            <option value="3">Tvingsager 10, Hvidovre</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="btn-standard" onClick={performCreateRental} type="submit" style={{fontSize: "24px"}}>Create</button>
                                        <br/>
                                        <button className="btn-cancel" onClick={() => {
                                            setCreate(false)
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
                    <button className="btn-standard" style={{fontSize: "24px"}} onClick={() => {
                        setCreate(true)
                    }}>CREATE NEW RENTAL
                    </button>
                </div>
            )}
            <div>

            </div>
        </>
    );
}

export default APCreateRental;