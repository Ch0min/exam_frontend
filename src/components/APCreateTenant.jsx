import React, {useState} from 'react';
import tenantFacade from "../utils/tenantFacade.js";

function APCreateTenant(props) {
    const [create, setCreate] = useState(false)

    const initTenant = {
        tenantName: "", tenantPhone: "", tenantJob: "", userName: ""}
    const [tenantInput, setTenantInput] = useState(initTenant)

    const performCreateTenant = (evt) => {
        evt.preventDefault()

        // Alerts if missing input.
        if (tenantInput.tenantName.trim().length === 0 || tenantInput.tenantPhone.trim().length === 0 ||
            tenantInput.tenantJob.trim().length === 0 || tenantInput.userName.trim().length === 0) {
            alert("The Tenant needs more information.")
            return
        }

        createTenant(tenantInput.tenantName, tenantInput.tenantPhone, tenantInput.tenantJob, tenantInput.userName)
        props.setRefresh(false)
        setCreate(false)
    }

    const createTenant = (tenantName, tenantPhone, tenantJob, userName) => {
        tenantFacade.createTenant(tenantName, tenantPhone, tenantJob, userName, rentalID)
            .then(() => props.setRefresh(true))
    }

    const handleOnChange = (evt) => {
        setTenantInput({...tenantInput, [evt.target.id]: evt.target.value})
    }

    return (
        <>
            {create ? (
                <div>
                    <div>
                        <button onClick={() => {
                            setCreate(false)
                        }}>Cancel
                        </button>
                    </div>
                    <br/>
                    <div>
                        <form onChange={handleOnChange}>
                            <h1>TENANTS</h1>
                            <table>
                                <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>PHONE</th>
                                    <th>JOB</th>
                                    <th>USERNAME</th>
                                    <th>OPTIONS</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input type="text" placeholder="Name" name="tenant_name"
                                               id="tenantName"/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="Phone" name="tenant_phone"
                                               id="tenantPhone"/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="Job" name="tenant_job"
                                               id="tenantJob"/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="Add Existing Username" name="user_name"
                                               id="userName"/>
                                    </td>
                                    <td>
                                        <button onClick={performCreateTenant} type="submit">Create</button>
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
                    }}>CREATE NEW TENANT
                    </button>
                </div>
            )}
            <div>

            </div>
        </>
    );
}

export default APCreateTenant;