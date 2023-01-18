import apiFacade from "./apiFacade.js";
import {API_URL} from "../../settings.js";

import React from 'react';

function TenantFacade() {

    const getAllTenants = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("tenants/all", updateAction, setErrorMessage)
    }

    const getTenantByID = (tenantID) => {
        const options = apiFacade.makeOptions("GET",null,null);
        return fetch(API_URL+"/api/tenants/" + tenantID ,options)
            .then(apiFacade.handleHttpErrors)
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

    const getTenantID = (updateAction, setErrorMessage) => {
        return apiFacade.fetchData("tenants/" + getTenantByID(tenant.tenantName), updateAction, setErrorMessage)


    }



    return {
        getAllTenants,
        getTenantByID,
        getTenantsByHouse,
        createTenant,
        getTenantID
    }
}

const tenantFacade = TenantFacade();
export default tenantFacade;