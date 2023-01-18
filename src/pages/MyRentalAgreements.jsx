import React, {useState, useEffect} from 'react';
import rentalFacade from "../utils/rentalFacade.js";
import tenantFacade from "../utils/tenantFacade.js";
import userFacade from "../utils/userFacade.js";

function MyRentalAgreements() {
    const [rentals, setRentals] = useState([])
    const [viewHouseDetails, setViewHouseDetails] = useState(0)
    const [clicked, setClicked] = useState(false)


    const tenant = userFacade.getUserName();
    useEffect(() => {
        const getData = async () => {
            await rentalFacade.getRentalsByTenant(tenant, (data) => {
                setRentals(data)
            }, "Can't get Rentals by Tenants")
        }
        getData()
    }, [])

    const hideBtn = () => {
        const rID = rentals.rentalID
        let text = "Show House Details";
        if (viewHouseDetails === rID) {
            text = "Hide"
        }
        return text;
    }


    return (
        <div className="table-styling">
            <h1>MY RENTAL AGREEMENTS</h1>
            <table>
                <thead>
                <tr>
                    <th>START DATE</th>
                    <th>END DATE</th>
                    <th>PRICE ANNUALLY</th>
                    <th>DEPOSIT</th>
                    <th>CONTACT PERSON</th>
                    <th>HOUSE DETAILS</th>
                </tr>
                </thead>
                <tbody>
                {rentals.map((data) => {
                        return (
                        <tr key={data.rentalID}>
                            <td>{data.rentalStartDate}</td>
                            <td>{data.rentalEndDate}</td>
                            <td>{data.rentalPriceAnnual} kr.</td>
                            <td>{data.rentalDeposit} kr.</td>
                            <td>{data.rentalContactPerson}</td>

                        </tr>

                    )
                })}
                </tbody>
            </table>



        </div>
    );
}

export default MyRentalAgreements;