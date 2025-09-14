import {useState, useEffect} from 'react';
import { SpaceDetail } from './SpaceDetail';

export const LocSpaces = ({location_id, selSpace}) => {
	const [locSpaces, setLocSpaces] = useState({});
	const deta = require("./img/detaila.png");

	
	const fetchData = async () => {
		let url = 'https://www.spacehub.cz/APIv01/get_locspaces.php';
		let hdr = {	method: 'POST',	headers: {'Content-Type': 'application/json'}, body: JSON.stringify({location_id})};
		fetch(url, hdr)
			.then((r) => r.json())
			.then((r) => {
				if ('OK' === r.sts) {
					setLocSpaces(r);
				} else {
					console.log(JSON.stringify(r));
				}
			})
			.catch(err => console.error("Neco se stalo: " + err));
	};

	useEffect(() => {
		document.getElementById('admin-footer').innerHTML = 'Location ID = ' + location_id;
		if (location_id >= 0) fetchData();
	}, [location_id]);

	const setSelSpace = (spc) => {
		selSpace(<SpaceDetail spaceIn={spc} />)
	}


	return (
		<tr className='loc-usr-container'><td colSpan={10}>
			<table className='loc-usr-tab'>
				<thead>
					<tr><th>#</th><th>Space User</th><th>Space Name</th><th>Comment</th><th>Detail</th></tr>
				</thead>
				<tbody>
					{
						locSpaces?.spaces?.map(space => 
							<tr key={space.ID} className='loc-usr-row'>
								<td>{space.ID}</td>
								<td>{space.USER}</td>
								<td>{space.NAME}</td>
								<td>{space.COMMENT}</td>
								<td><img className="loc-row-img" src={deta} alt="location" onClick={() => setSelSpace(space)} /></td>
							</tr>
						)
					}
				</tbody>
			</table></td>
		</tr>
	);
}
//cookies