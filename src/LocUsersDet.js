import {useState, useEffect} from 'react';

export const LocUsers = ({location_id}) => {
	const [locusrs, setLocUsrs] = useState({});
	
	const fetchData = async () => {
		let url = '../APIv01/get_locusers.php';
		let hdr = {	method: 'POST',	headers: {'Content-Type': 'application/json'}, body: JSON.stringify({location_id})};
		if (window.location.href.startsWith('http://localhost')) {
			let dbtxt = '{"LocationID":1,"users":[{"ID":2,"NAME":"Filip","SURNAME":"Harman","USERNAME":"filip","EMAIL":"harmanfilip643@gmail.com","PHONE":456987,"STREET":"Popelakova 16","CITY":"Brno","PSC":639852,"PASSWORD":"2d1a5249a77ea9fb0983541857a50af54ed8e83b22d47827d205e66700d4d70d","RECOVERY_TOKEN":"3a07cec18eee16c6e5156c23218069cd","TOKEN_VALID_UNTIL":1738507343,"ACCOUNT_NR":"9874123/200","CREATED":"2024-10-15 08:16:16","LAST_CHANGE":"2025-02-02 15:32:22","SPCNT":1},{"ID":1,"NAME":"JÁN","SURNAME":"Harmanek","USERNAME":"jan","EMAIL":"harmanelectronicdesign@gmail.com","PHONE":"","STREET":"dfasd","CITY":"Brnosadf","PSC":"62800fsdf","PASSWORD":"6a0ac0fd972c325d6ca5512b67a5e0ad996c4a3e9b59971d125164e6d4db1a1c","RECOVERY_TOKEN":"68571cddec876c416ef02c68f347fe4a","TOKEN_VALID_UNTIL":1738505883,"ACCOUNT_NR":"123456/0100","CREATED":"2024-10-15 08:16:16","LAST_CHANGE":"2025-02-07 13:48:58","SPCNT":2}],"sts":"OK"}';
			setLocUsrs(JSON.parse(dbtxt));
		}
		else {
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
			.catch(error => console.error("Neco se stalo: " + error));
		}
	};

	useEffect(() => {
		document.getElementById('admin-footer').innerHTML = 'Location ID = ' + location_id;
		if (location_id > 0)
		{
			fetchData();
		}
	}, [location_id]);

	if (!locusrs.users) return <></>

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