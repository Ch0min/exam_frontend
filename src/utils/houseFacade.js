import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

import React from 'react';
import loginFacade from "./loginFacade.js";

function HouseFacade() {

    const getAllHouses = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("houses/all", updateAction, setErrorMessage)
    }

    const getHouseByID = (houseID) => {
        const options = apiFacade.makeOptions("GET", null, null);
        return fetch(API_URL + "/api/houses/" + houseID, options)
            .then(apiFacade.handleHttpErrors)
    }

    const createHouse = (houseAddress, houseCity, numberOfRooms) => {
        const options = apiFacade.makeOptions("POST", null,
            {
                "houseAddress": houseAddress,
                "houseCity": houseCity,
                "numberOfRooms": numberOfRooms,
            })
        return fetch(API_URL + "/api/houses", options)
            .then(apiFacade.handleHttpErrors)
    }

    const getHouseID = () => {
        const token = loginFacade.getToken()
        if (token != null) {
            const payloadBase64 = loginFacade.getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            return decodedClaims.username.tenant.rental.house.houseID
        } else return ""
    }


    return {
        getAllHouses,
        getHouseByID,
        createHouse,
        getHouseID
    }

}

const houseFacade = HouseFacade();
export default houseFacade;