import {useState, useEffect} from 'react';
import { SpaceDetail } from './SpaceDetail';

export const LocSpaces = ({location_id, selSpace}) => {
	const [locSpaces, setLocSpaces] = useState({});
	
	const fetchData = async () => {
		let url = '../APIv01/get_locspaces.php';
		let hdr = {	method: 'POST',	headers: {'Content-Type': 'application/json'}, body: JSON.stringify({location_id})};
		if (window.location.href.startsWith('http://localhost')) {
			let dbtxt = '{"php":"get_locspaces","LocationID":4,"spaces":[{"ID":12,"ID_OWNER":1,"ID_LOCATION":4,"NAME":"zzz","WIDTH":11,"LENGTH":22,"HEIGHT":33,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":44,"CITY":null,"STREET":"hugd","STREET_NR":34,"COMMENT":"","CREATED":"2025-02-10 15:23:14","LAST_CHANGE":"2025-02-10 15:23:14","OFFERS":0,"USER":"Harmanek JÁN"},{"ID":13,"ID_OWNER":1,"ID_LOCATION":4,"NAME":"zzz","WIDTH":11,"LENGTH":22,"HEIGHT":33,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":44,"CITY":null,"STREET":"hugd","STREET_NR":34,"COMMENT":"","CREATED":"2025-02-10 15:27:57","LAST_CHANGE":"2025-02-10 15:27:57","OFFERS":0,"USER":"Harmanek JÁN"},{"ID":14,"ID_OWNER":1,"ID_LOCATION":4,"NAME":"zzz","WIDTH":11,"LENGTH":22,"HEIGHT":33,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":44,"CITY":null,"STREET":"hugd","STREET_NR":34,"COMMENT":"","CREATED":"2025-02-10 15:28:32","LAST_CHANGE":"2025-02-10 15:28:32","OFFERS":0,"USER":"Harmanek JÁN"},{"ID":15,"ID_OWNER":1,"ID_LOCATION":4,"NAME":"RazDva Tri","WIDTH":900,"LENGTH":450,"HEIGHT":1000,"GPS_LON":0,"GPS_LAN":0,"ACCESS":1,"PARCEL_NR":"12841/963","CITY":"Honolulu","STREET":"Krasna","STREET_NR":"2311/18","COMMENT":"Takove krasne misto na havaji","CREATED":"2025-02-10 15:35:22","LAST_CHANGE":"0000-00-00 00:00:00","OFFERS":0,"USER":"Harmanek JÁN"},{"ID":16,"ID_OWNER":1,"ID_LOCATION":4,"NAME":"abcde","WIDTH":39,"LENGTH":24,"HEIGHT":61,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":68,"CITY":null,"STREET":"gzj","STREET_NR":60,"COMMENT":"","CREATED":"2025-02-10 15:35:35","LAST_CHANGE":"2025-02-10 15:35:35","OFFERS":0,"USER":"Harmanek JÁN"},{"ID":17,"ID_OWNER":1,"ID_LOCATION":4,"NAME":"","WIDTH":0,"LENGTH":0,"HEIGHT":0,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":0,"CITY":null,"STREET":"","STREET_NR":0,"COMMENT":"","CREATED":"2025-02-10 15:37:13","LAST_CHANGE":"2025-02-10 15:37:13","OFFERS":0,"USER":"Harmanek JÁN"},{"ID":20,"ID_OWNER":1,"ID_LOCATION":4,"NAME":"RazDva Tri","WIDTH":900,"LENGTH":450,"HEIGHT":1000,"GPS_LON":0,"GPS_LAN":0,"ACCESS":1,"PARCEL_NR":"12841/963","CITY":"Honolulu","STREET":"Krasna","STREET_NR":"2311/18","COMMENT":"Takove krasne misto na havaji","CREATED":"2025-02-10 15:38:41","LAST_CHANGE":"2025-02-27 09:15:45","OFFERS":0,"USER":"Harmanek JÁN"},{"ID":21,"ID_OWNER":1,"ID_LOCATION":4,"NAME":"RazDva Trictr","WIDTH":900,"LENGTH":450,"HEIGHT":1000,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":"12841/963","CITY":"Honolulu","STREET":"Krasna","STREET_NR":"2311/18","COMMENT":"Takove krasne misto na havaji","CREATED":"2025-02-10 15:40:12","LAST_CHANGE":"2025-03-01 14:01:12","OFFERS":0,"USER":"Harmanek JÁN"},{"ID":22,"ID_OWNER":1,"ID_LOCATION":4,"NAME":"RazDva Tri","WIDTH":900,"LENGTH":450,"HEIGHT":1000,"GPS_LON":0,"GPS_LAN":0,"ACCESS":1,"PARCEL_NR":"12841/963","CITY":"Honolulu","STREET":"Krasna","STREET_NR":"2311/18","COMMENT":"Takove krasne misto na havaji","CREATED":"2025-02-10 15:40:54","LAST_CHANGE":"2025-02-27 09:49:35","OFFERS":0,"USER":"Harmanek JÁN"},{"ID":5,"ID_OWNER":3,"ID_LOCATION":4,"NAME":"zggg","WIDTH":11,"LENGTH":22,"HEIGHT":33,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":44,"CITY":null,"STREET":"hugd","STREET_NR":34,"COMMENT":"","CREATED":"2024-10-15 20:11:25","LAST_CHANGE":"2025-02-22 13:49:52","OFFERS":0,"USER":"Vopršálek FERO"},{"ID":6,"ID_OWNER":3,"ID_LOCATION":4,"NAME":"Misto pro náklaďák - trochu větší","WIDTH":6,"LENGTH":8,"HEIGHT":7,"GPS_LON":0,"GPS_LAN":0,"ACCESS":0,"PARCEL_NR":"","CITY":null,"STREET":"","STREET_NR":"","COMMENT":"Betonová ploch parkovacího místa","CREATED":"2025-02-07 20:11:25","LAST_CHANGE":"2025-02-07 08:01:45","OFFERS":0,"USER":"Vopršálek FERO"}],"sts":"OK"}';
			setLocSpaces(JSON.parse(dbtxt));
		}
		else {
			fetch(url, hdr)
			.then((r) => r.json())
			.then((r) => {
				if ('OK' === r.sts) {
					setLocSpaces(r);
				} else {
					console.log(JSON.stringify(r));
				}
			})
			.catch(error => console.error("Neco se stalo: " + error));
		}
	};

	useEffect(() => {
		document.getElementById('admin-footer').innerHTML = 'Location ID = ' + location_id;
		if (location_id >= 0)
		{
			fetchData();
		}
	}, [location_id]);

	const setSelSpace = (spc) => {
		selSpace(<SpaceDetail spaceIn={spc} />)
	}

	if (!locSpaces.spaces) return <></>

	let deta = require("./img/detaila.png");
	return (
		<tr className='loc-usr-container'><td colSpan={10}>
			<table className='loc-usr-tab'>
				<thead>
					<tr><th>#</th><th>Space User</th><th>Space Name</th><th>Comment</th><th>Detail</th></tr>
				</thead>
				<tbody>
					{
						locSpaces.spaces.map(space => 
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
};
//cookies