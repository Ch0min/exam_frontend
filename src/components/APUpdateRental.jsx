import React, {useState, useEffect} from 'react';
import rentalFacade from "../utils/rentalFacade.js";

function APUpdateRental(props) {
    const [rentals, setRentals] = useState([])
    const [update, setUpdate] = useState(0)

    const initInfo = {
        rentalID: "", rentalStartDate: "", rentalEndDate: "", rentalPriceAnnual: "", rentalDeposit: "",
        rentalContactPerson: "", houseID: ""
    }
    const [infoInput, setInfoInput] = useState(initInfo)

    useEffect(() => {
        const getData = async () => {
            await rentalFacade.getAllRentals((data) => {
                setRentals(data)
            })
        }
        getData()
    }, [props.refresh])


    const performUpdate = (evt) => {
        evt.preventDefault();

        updateInfo(infoInput.rentalID, infoInput.rentalStartDate, infoInput.rentalEndDate, infoInput.rentalPriceAnnual, infoInput.rentalDeposit,
            infoInput.rentalContactPerson, infoInput.houseID)
        setUpdate(0)
        props.setRefresh(false)
    }

    const updateInfo = (rentalID, rentalStartDate, rentalEndDate, rentalPriceAnnual, rentalDeposit, rentalContactPerson, houseID) => {
        rentalFacade.updateRental(rentalID, rentalStartDate, rentalEndDate, rentalPriceAnnual, rentalDeposit, rentalContactPerson, houseID)
            .then(() => props.setRefresh(true))
    }

    const handleOnChange = (evt) => {
        setInfoInput({...infoInput, [evt.target.id]: evt.target.value})
        console.log(infoInput)
    }


    return (
        <>
            <div>
                <h2>RENTALS</h2>
                <form onChange={handleOnChange}>
                    <table>
                        <thead>
                        <tr>
                            <th>RENTAL ID</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>PRICE ANNUAL</th>
                            <th>DEPOSIT</th>
                            <th>CONTACT PERSON</th>
                            <th>HOUSE</th>
                            <th>OPTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rentals.map((data) => {
                            if (update === data.rentalID) {
                                return (
                                    <tr key={data.rentalID}>
                                        <td>
                                            <input type="number" placeholder={data.rentalID} name="rental_id"
                                                   id="rentalID"/>
                                        </td>
                                        <td>
                                            <input type="text" placeholder={data.rentalStartDate}
                                                   name="rental_start_date"
                                                   id="rentalStartDate"/>
                                        </td>
                                        <td>
                                            <input type="text" placeholder={data.rentalEndDate} name="rental_end_date"
                                                   id="rentalEndDate"/>
                                        </td>
                                        <td>
                                            <input type="text" placeholder={data.rentalPriceAnnual}
                                                   name="rental_price_annual"
                                                   id="rentalPriceAnnual"/>
                                        </td>
                                        <td>
                                            <input type="text" placeholder={data.rentalDeposit} name="rental_deposit"
                                                   id="rentalDeposit"/>
                                        </td>
                                        <td>
                                            <input type="text" placeholder={data.rentalContactPerson}
                                                   name="rental_contact_person" id="rentalContactPerson"/>
                                        </td>
                                        <td>
                                            <select defaultValue={data.house.houseID} name="house_id" id="houseID">
                                                <option value="DEFAULT" disabled>Choose House</option>
                                                <option value="1">Kløvervej 7, Kongens Lyngby</option>
                                                <option value="2">Lyngborgvej 3, Kastrup</option>
                                                <option value="3">Tvingsager 10, Hvidovre</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className="btn-standard" onClick={performUpdate} type="submit"><i className="fa fa-mail-forward"></i> Submit</button>
                                            <br/>
                                            <button className="btn-cancel" onClick={() => {
                                                setUpdate(0)
                                            }}><i className="fa fa-close"></i> Cancel
                                            </button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <>
                                        <tr key={data.rentalID}>
                                            <th>{data.rentalID}</th>
                                            <td>{data.rentalStartDate}</td>
                                            <td>{data.rentalEndDate}</td>
                                            <td>{data.rentalPriceAnnual}</td>
                                            <td>{data.rentalDeposit}</td>
                                            <td>{data.rentalContactPerson}</td>
                                            <td>{data.house.houseID}</td>
                                            <td>
                                                <button className="btn-standard" onClick={() => {
                                                    setUpdate(data.rentalID)
                                                }}><i className="fa fa-pencil"></i> Update
                                                </button>
                                                <br/>
                                                <button className="btn-trash" onClick={() => {
                                                    rentalFacade.deleteRental(data.rentalID)
                                                        .then(() => props.setRefresh(false))   // Still refreshes the site
                                                }}><i className="fa-solid fa fa-trash"></i> delete</button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                        })}
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}

export default APUpdateRental;