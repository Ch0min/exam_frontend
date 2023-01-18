import React, {useState, useEffect} from 'react';
import rentalFacade from "../utils/rentalFacade.js";
import userFacade from "../utils/userFacade.js";

function MyRentalAgreements() {
    const [rentals, setRentals] = useState([])
    const [clicked, setClicked] = useState(true)

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
        let text = "Show House";
        if (!clicked) {
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
                            <td>
                                {!clicked ? <button onClick={() => {
                                        setClicked(true)
                                    }}
                                    >{hideBtn()}

                                        <td>{data.house.houseID}</td>
                                        <td>{data.house.houseAddress}</td>
                                        <td>{data.house.houseCity}</td>

                                    </button>
                                    :
                                    <button onClick={() => {
                                        setClicked(false)
                                    }}
                                    >{hideBtn()}
                                    </button>}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>


        </div>
    );
}

export default MyRentalAgreements;