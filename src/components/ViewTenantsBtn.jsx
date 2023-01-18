import React, {useEffect, useState} from 'react';

function ViewTenantsBtn(props) {


    const hideBtn = () => {
        const houseID = props.houses.houseID
        let text = "Show Tenants";
        if (props.viewTenants === houseID) {
            text = "Hide"
        }
        return text;
    }

    return (
        <>
            <div>
                {!props.clicked ? <button onClick={() => {
                        props.setViewTenants(props.houses.houseID)
                        props.setClicked(true)
                    }}
                    >{hideBtn()}
                    </button>
                    :
                    <button onClick={() => {
                        props.setViewTenants(0)
                        props.setClicked(false)
                    }}
                    >{hideBtn()}
                    </button>}

                <table>
                    <tbody>
                    {props.houses.tenants.map((t) => {
                            if (props.houses.houseID === props.viewTenants) {
                                return (
                                    <tr key={t.tenantID}>
                                        <td>{t.tenantName}</td>
                                        <td>{t.tenantPhone}</td>
                                        <td>{t.tenantJob}</td>
                                    </tr>
                                )
                            }
                        }
                    )}
                    </tbody>
                </table>

            </div>
        </>
    );
}

export default ViewTenantsBtn;