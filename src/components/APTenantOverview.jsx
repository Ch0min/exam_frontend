import React, {useEffect, useState} from 'react';
import tenantFacade from "../utils/tenantFacade.js";

function APTenantOverview(props) {
    const [tenants, setTenants] = useState([])

    useEffect(() => {
        const getData = async () => {
            await tenantFacade.getAllTenants((data) => {
                setTenants(data)
            })
        }
        getData()
    }, [props.refresh])

    return (
        <>
            <div>
                <h2>TENANTS & USERS</h2>
                <table>
                <thead>
                <tr>
                    <th>TENANT ID</th>
                    <th>NAME</th>
                    <th>PHONE</th>
                    <th>JOB</th>
                    <th>USERNAME</th>
                    <th>EMAIL</th>
                </tr>
                </thead>
                <tbody>
                {tenants.map((t) => {
                    return (
                        <tr key={t.tenantID}>
                            <td>{t.tenantID}</td>
                            <td>{t.tenantName}</td>
                            <td>{t.tenantJob}</td>
                            <td>{t.tenantPhone}</td>
                            <td>{t.user.userName}</td>
                            <td>{t.user.userEmail}</td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
            </div>

        </>
    );
}

export default APTenantOverview;