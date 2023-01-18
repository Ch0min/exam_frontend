import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

import React from 'react';

function TenantFacade() {

    const getAllTenants = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("tenants/all", updateAction, setErrorMessage)
    }

    const getTenantsByHouse = (houseID, updateAction, setErrorMessage) => {
        return apiFacade.fetchData("tenants/" + houseID, updateAction, setErrorMessage)
    }

    const createTenant = (tenantName, tenantPhone, tenantJob) => {
        const options = apiFacade.makeOptions("POST", null,
            {
                "tenantName": tenantName,
                "tenantPhone": tenantPhone,
                "tenantJob": tenantJob
            })
        return fetch(API_URL + "/api/tenants", options)
            .then(apiFacade.handleHttpErrors)
    }


    return {
        getAllTenants,
        getTenantsByHouse,
        createTenant
    }
}

const tenantFacade = TenantFacade();
export default tenantFacade;