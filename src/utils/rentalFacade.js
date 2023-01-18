import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

import React from 'react';

function RentalFacade() {

    const getAllRentals = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("rentals/all", updateAction, setErrorMessage)
    }

    const getRentalsByTenant = (tenantUserName, updateAction, setErrorMessage) => {
        return apiFacade.fetchData("rentals/" + tenantUserName, updateAction, setErrorMessage)
    }

    const createRental = (rentalStartDate, rentalEndDate, rentalPriceAnnual, rentalDeposit, rentalContactPerson, houseID) => {
        const options = apiFacade.makeOptions("POST", null,
            {
                "rentalStartDate": rentalStartDate,
                "rentalEndDate": rentalEndDate,
                "rentalPriceAnnual": rentalPriceAnnual,
                "rentalDeposit": rentalDeposit,
                "rentalContactPerson": rentalContactPerson,
                "house": {
                    "houseID": houseID
                }
            })
        return fetch(API_URL + "/api/rentals", options)
            .then(apiFacade.handleHttpErrors)
    }

    const assignRentalToHouse = (rentalID, houseID) => {
        const options = apiFacade.makeOptions("POST", null, null);
        return fetch(API_URL + "/api/rentals/assign/" + rentalID + "/" + houseID, options)
            .then(apiFacade.handleHttpErrors)
    }

    const assignRentalToTenant = (rentalID, tenantID) => {
        const options = apiFacade.makeOptions("POST", null, null);
        return fetch(API_URL + "/api/rentals/assignToTenant/" + rentalID + "/" + tenantID, options)
            .then(apiFacade.handleHttpErrors)
    }


    const updateRental = (rentalID, rentalStartDate, rentalEndDate, rentalPriceAnnual, rentalDeposit, rentalContactPerson, houseID) => {
        const options = apiFacade.makeOptions("PUT", null,
            {
                "rentalStartDate": rentalStartDate,
                "rentalEndDate": rentalEndDate,
                "rentalPriceAnnual": rentalPriceAnnual,
                "rentalDeposit": rentalDeposit,
                "rentalContactPerson": rentalContactPerson,
                "house": {
                    "houseID": houseID
                }
            }
        )
        return fetch(API_URL + "/api/rentals/update/" + rentalID, options)
            .then(apiFacade.handleHttpErrors)
    }

    const deleteRental = (rentalID) => {
        const options = apiFacade.makeOptions("DELETE", null, null);
        return fetch(API_URL + "/api/rentals/" + rentalID, options)
            .then(apiFacade.handleHttpErrors)
    }



    return {
        getAllRentals,
        getRentalsByTenant,
        createRental,
        assignRentalToHouse,
        assignRentalToTenant,
        updateRental,
        deleteRental
    }

}

const rentalFacade = RentalFacade();
export default rentalFacade;