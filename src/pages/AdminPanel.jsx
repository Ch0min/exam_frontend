import React, {useState} from 'react';
import APCreateRental from "../components/APCreateRental.jsx";
import APUpdateRental from "../components/APUpdateRental.jsx";
import APCreateTenant from "../components/APCreateTenant.jsx";
import APTenantOverview from "../components/APTenantOverview.jsx";
import Houses from "../components/Houses.jsx";
import APAssignRentalToHouse from "../components/APAssignRentalToHouse.jsx";
import APAssignRentalToTenant from "../components/APAssignRentalToTenant.jsx";

function AdminPanel() {
    const [refresh, setRefresh] = useState(false);

    return (
        <>
            <div className="table-styling">
                <h1>ADMIN PANEL</h1>

                <div>
                    {<APUpdateRental refresh={refresh} setRefresh={setRefresh}/>}

                    <br/>
                    {<APCreateRental setRefresh={setRefresh}/>}
                    <br/>
                    {<APAssignRentalToHouse setRefresh={setRefresh}/>}
                    <br/>
                    {<APAssignRentalToTenant setRefresh={setRefresh}/>}
                </div>

                <br/><br/>
                <h1>____________________________________________________________________________</h1>

                {<Houses refresh={refresh} setRefresh={setRefresh}/>}

                <br/><br/>
                <h1>____________________________________________________________________________</h1>

                <div>
                    {<APTenantOverview refresh={refresh} setRefresh={setRefresh}/>}

                    <br/>
                    {<APCreateTenant setRefresh={setRefresh}/>}
                </div>


            </div>
        </>
    );
}

export default AdminPanel;