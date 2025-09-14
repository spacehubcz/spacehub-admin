import {useState, useEffect} from 'react';

export const LocUsers = ({location_id}) => {
	const [locusrs, setLocUsrs] = useState({});

	const fetchData = async () => {
		let url = 'https://www.spacehub.cz/APIv01/get_locusers.php';
		let hdr = {	method: 'POST',	headers: {'Content-Type': 'application/json'}, body: JSON.stringify({location_id})};
		fetch(url, hdr)
			.then((r) => r.json())
			.then((r) => {
				if ('OK' === r.sts) {
					setLocUsrs(r);
					console.log(JSON.stringify(r));
				} else {
					console.log(JSON.stringify(r));
				}
			})
			.catch(err => console.error("Neco se stalo: " + err));
	};

	useEffect(() => {
		document.getElementById('admin-footer').innerHTML = 'Location ID = ' + location_id;
		if (location_id > 0)
		{
			fetchData();
		}
	}, [location_id]);

	return (
		<tr className='loc-usr-container'><td colSpan={10}>
			<table className='loc-usr-tab'>
				<thead>
					<tr><th>#</th><th>Surname</th><th>Name</th><th>City</th><th>Spaces</th><th>Street</th><th>Email</th><th>User-name</th><th rowSpan={3}>Lnk</th></tr>
				</thead>
				<tbody>
					{
						locusrs.users.map(usr => 
							<tr key={usr.ID} className='loc-usr-row'>
								<td>{usr.ID}</td>
								<td>{usr.SURNAME}</td>
								<td>{usr.NAME}</td>
								<td>{usr.CITY}</td>
								<td>{usr.SPCNT}</td>
								<td>{usr.STREET}</td>
								<td>{usr.EMAIL}</td>
								<td>{usr.USERNAME}</td>
								<td></td>
							</tr>
						)
					}
				</tbody>
			</table></td>
		</tr>
	);
};
//cookies