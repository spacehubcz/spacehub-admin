import {useState, useEffect} from 'react';
import { SpaceDetail } from './SpaceDetail';

export const UserDetail = ({user_id, setdetail}) => {

	let [usrDet, setUsrDet] = useState({
		ID: user_id, 
		NAME: 'A',
		SURNAME: 'B',
		USERNAME: 'U',
		EMAIL: 'COM',
		PHONE: 123,
		STREET: 'C',
		CITY: 'D',
		PSC: 628,
		PASSWORD: 'E',
		ACCOUNT_NR: 'F',
		CREATED: 'G',
		LAST_CHANGE: 'H'
	});
	let [usrSpace, setUsrSpace] = useState([]);

	
	const fetchData = async () => {
		let url = '../APIv01/get_user.php';
		let hdr = {	method: 'POST',	headers: {'Content-Type': 'application/json'}, body: JSON.stringify({uid: user_id})};
		if (window.location.href.startsWith('http://localhost')) {
			let dbtxt = '{"user":{"ID":3,"NAME":"FERO","SURNAME":"Vopršálek","USERNAME":"franta","EMAIL":"rantavonta@nicnicnic.cz","PHONE":123456789,"STREET":"Ulice je jen název","CITY":"Praha","PSC":65498,"PASSWORD":"5f9755db013a24c05628b2d59219a85b751afee38ae9916ddcc49ae336843286","RECOVERY_TOKEN":null,"TOKEN_VALID_UNTIL":null,"ACCOUNT_NR":"","CREATED":"2024-10-15 14:52:30","LAST_CHANGE":"2025-02-04 20:29:18"},"spaces":[{"ID":5,"ID_OWNER":3,"ID_LOCATION":4,"NAME":"Misto pro větší automobil","WIDTH":4,"LENGTH":9,"HEIGHT":9,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":"","STREET":"","STREET_NR":"","COMMENT":"Toto je místo třeba i pro dodávku","CREATED":"2024-10-15 20:11:25","LAST_CHANGE":"2025-02-07 08:01:45","LNAME":"Holandská čtvrť","CITY":"Olomouc","DISTRICT":"Neředín"},{"ID":6,"ID_OWNER":3,"ID_LOCATION":4,"NAME":"Misto pro náklaďák - trochu větší","WIDTH":6,"LENGTH":8,"HEIGHT":7,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":"","STREET":"","STREET_NR":"","COMMENT":"Betonová ploch parkovacího místa","CREATED":"2025-02-07 20:11:25","LAST_CHANGE":"2025-02-07 08:01:45","LNAME":"Holandská čtvrť","CITY":"Olomouc","DISTRICT":"Neředín"},{"ID":7,"ID_OWNER":3,"ID_LOCATION":2,"NAME":"Takove ctverete parkovaci misto blizko dubu","WIDTH":6,"LENGTH":8,"HEIGHT":7,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":"","STREET":"","STREET_NR":"","COMMENT":"U velkého stromj / dubu","CREATED":"2025-02-07 20:11:25","LAST_CHANGE":"2025-02-07 08:01:45","LNAME":"Nová Slatina","CITY":"Brno","DISTRICT":"Slatina"}],"sts":"OK"}';
			let alldb = JSON.parse(dbtxt);
			setUsrDet(alldb.user);
			setUsrSpace(alldb.spaces);
		}
		else {
			fetch(url, hdr)
			.then((r) => r.json())
			.then((r) => {
				if ('OK' === r.sts) {
					setUsrDet(r.user);
					if (r.spaces)
						setUsrSpace(r.spaces);
				} else {
					console.error('neco se stalo');
				}
				console.log(JSON.stringify(r));
			})
			.catch(error => console.error("Neco se stalo: " + error));
		}
	};

	useEffect(() => {
		document.getElementById('admin-footer').innerHTML = 'User ID = ' + user_id;
		if (user_id > 0)
		{
			fetchData();
		}
	}, [user_id]);

	const setSelSpace = (spc) => {
		setdetail(<SpaceDetail spaceIn={spc} />)
	}

	if (user_id <= 0) return <></>

	let deta = require("./img/detaila.png");
	return (
		<tr className='usr-det-container'><td colSpan={7}>
			<table className='usr-det-tab'>
				<tbody>
					<tr><td>User Name</td><td>{usrDet.USERNAME}</td><td>Email</td><td>{usrDet.EMAIL}</td></tr>
					<tr><td>Phone</td><td>{usrDet.PHONE}</td><td>PSC</td><td>{usrDet.PSC ?? 0}</td></tr>
					<tr><td>Account Nr.</td><td>{usrDet.ACCOUNT_NR ?? 0}</td><td>ID</td><td>{usrDet.ID}</td></tr>
					<tr><td>Created</td><td>{usrDet.CREATED}</td><td>Last change</td><td>{usrDet.LAST_CHANGE}</td></tr>
					<tr><td>Spaces:</td><td colspan={3} className='usr-det-spaces'>
						<table className='usr-det-spaces-tab'>
							<thead>
								<tr><th>ID</th><th>City</th><th>District</th><th>Space Name</th><th>Comment</th><th>Detail</th></tr>
							</thead>
							<tbody>
								{usrSpace.map(spac => (
									<tr>
										<td>{spac.ID}</td>
										<td>{spac.CITY}</td>
										<td>{spac.DISTRICT}</td>
										<td>{spac.NAME}</td>
										<td>{spac.COMMENT}</td>
										<td><img className="loc-row-img" src={deta} alt="location" onClick={() => setSelSpace(spac)} /></td>
									</tr>
								))}							
							</tbody>
						</table>
					</td></tr>
				</tbody>
			</table></td></tr>
	);
};
//cookies