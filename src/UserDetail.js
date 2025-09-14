import {useState, useEffect} from 'react';
import { SpaceDetail } from './SpaceDetail';

export const UserDetail = ({ user_id, setDetail }) => {

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
		let url = 'https://www.spacehub.cz/APIv01/get_user.php';
		let hdr = {	method: 'POST',	headers: {'Content-Type': 'application/json'}, body: JSON.stringify({uid: user_id})};
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
			.catch(err => console.error("Neco se stalo: " + err));
	};

	useEffect(() => {
		document.getElementById('admin-footer').innerHTML = 'User ID = ' + user_id;
		if (user_id > 0) fetchData();
	}, [user_id]);

	const setSelSpace = (spc) => {
		setDetail(<SpaceDetail spaceIn={spc} />)
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