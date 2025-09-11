import { useState, useEffect } from "react";

export const CityLoc = ({city}) => {
	const [locations, setLocations] = useState([{
		ID: 0,
		NAME: '-',
		DISTRICT: '-',
		SPACES: 0,
		NUM_OF_SPACES: 1,
		URL: ''
	}]);
	const [locOk, setLocOk] = useState('');

	const fetchData = async () => {
		setLocOk(0);
		console.log(city);
		if (window.location.href.startsWith('http://localhost')) 
		{
			let dbtxt = '{"Locations": [{"ID":2,"CITY":"Brno","DISTRICT":"Slatina","NAME":"Nov\u00e1 Slatina","GPS":0,"ADMIN_STATUS":1,"AREA":41221,"CATASTRAL":"Slatina (okres Brno-m\u011bsto)","CATASTRAL_NR":612286,"NUM_OF_SPACES":400,"URL":"9mVeUxTocsIDGTNZJqIbHrNV2HgYJf1tULZILJYbfdQgZs&x=16.6755764&y=49.1851127&z=16","CREATED":"2025-02-02 09:33:23","LAST_CHANGE":"2025-02-02 09:34:26","COMMENT":"","SPACES":2}, {"ID":3,"CITY":"Brno","DISTRICT":"L\u00ed\u0161e\u0148","NAME":"L\u00ed\u0161e\u0148 - Horn\u00edkova","GPS":0,"ADMIN_STATUS":0,"AREA":3089,"CATASTRAL":"L\u00ed\u0161e\u0148 (okres Brno-m\u011bsto)","CATASTRAL_NR":5,"NUM_OF_SPACES":91,"URL":"9mX5oxTzEMNR6jLdRhCXRvHiFBMwLIOxNBOPQqW9Jl6TIa&x=16.6826038&y=49.2120828&z=17","CREATED":"2025-01-30 17:24:52","LAST_CHANGE":"2025-02-02 09:34:26","COMMENT":"","SPACES":0}, {"ID":7,"CITY":"Brno","DISTRICT":"Horn\u00ed Her\u0161pice","NAME":"Panorama Jih","GPS":0,"ADMIN_STATUS":3,"AREA":7962,"CATASTRAL":"Brno","CATASTRAL_NR":0,"NUM_OF_SPACES":300,"URL":"9mMgTxTj9NGdJlPDgT8gX98nNnIifgQFvLdAG&x=16.6101684&y=49.1666723&z=18&ovl=1","CREATED":"2025-01-30 17:54:34","LAST_CHANGE":"2025-02-09 21:08:01","COMMENT":"","SPACES":4}, {"ID":9,"CITY":"Brno","DISTRICT":"Slatina","NAME":"Slatina - K\u0159ehl\u00edkova","GPS":0,"ADMIN_STATUS":0,"AREA":14420,"CATASTRAL":"Slatina (okres Brno-m\u011bsto)","CATASTRAL_NR":0,"NUM_OF_SPACES":250,"URL":"9mZFExTmIAG9D-gW1fclSNUQfeJgYw&x=16.6892546&y=49.1721697&z=17","CREATED":"2025-02-02 09:32:24","LAST_CHANGE":"2025-02-02 09:34:26","COMMENT":"","SPACES":0}, {"ID":10,"CITY":"Brno","DISTRICT":"Slatina","NAME":"Slatina - B\u016f\u010dkova","GPS":0,"ADMIN_STATUS":0,"AREA":15964,"CATASTRAL":"Slatina (okres Brno-m\u011bsto)","CATASTRAL_NR":0,"NUM_OF_SPACES":50,"URL":"9mZ65xTmXIJn4ogX8faSSqVcfdGg-9Jd4j&x=16.6905850&y=49.1726169&z=18&ovl=1","CREATED":"2024-10-28 08:12:10","LAST_CHANGE":"2025-02-02 09:36:56","COMMENT":"","SPACES":0}, {"ID":11,"CITY":"Brno","DISTRICT":"Star\u00fd L\u00edskovec","NAME":"U Leskavy","GPS":null,"ADMIN_STATUS":0,"AREA":26521,"CATASTRAL":"Brno","CATASTRAL_NR":444,"NUM_OF_SPACES":100,"URL":"9mGf8xTjHaIjU2fjXNmM9fh7D9KLCGKHNQCvQnMETDNNN9RqU0N06DOjV0Mn6NVZYNNVN8Uu&x=16.5689217&y=49.1637130&z=18&ovl=1","CREATED":"2024-10-28 08:31:45","LAST_CHANGE":"2025-02-03 10:17:39","COMMENT":"","SPACES":0}, {"ID":27,"CITY":"Brno","DISTRICT":"L\u00ed\u0161e\u0148","NAME":"L\u00ed\u0161e\u0148 - Sedl\u00e1\u010dkova","GPS":null,"ADMIN_STATUS":0,"AREA":19182,"CATASTRAL":"L\u00ed\u0161e\u0148 (okres Brno-m\u011bsto)","CATASTRAL_NR":612405,"NUM_OF_SPACES":120,"URL":"9mWFExTvf3JeLbIo2nfjVEqRvfi8gOBTq6e8RRQTUJgg6B&x=16.6714741&y=49.2030273&z=19&ovl=1","CREATED":"2024-10-26 16:42:12","LAST_CHANGE":"2025-02-05 09:19:27","COMMENT":"","SPACES":0}, {"ID":38,"CITY":"Brno","DISTRICT":"Lesn\u00e1","NAME":"Lesn\u00e1 - Dus\u00edkova","GPS":null,"ADMIN_STATUS":0,"AREA":16605,"CATASTRAL":"Lesn\u00e1","CATASTRAL_NR":610887,"NUM_OF_SPACES":130,"URL":"9mO9tx8E874DN4HEEGfd0K9NGJC81LmNbIQOSFkUVM96Q8EWjNzOBW9UgNoNDRnInOK&x=16.6259904&y=49.2356309&z=19&ovl=1","CREATED":"2025-02-11 15:23:17","LAST_CHANGE":"2025-02-11 15:23:17","COMMENT":"Je to tam takov\u00e9 divn\u00e9, nutno po\u0159\u00e1dn\u011b prov\u011b\u0159it","SPACES":0}, {"ID":39,"CITY":"Brno","DISTRICT":"Horn\u00ed Her\u0161pice","NAME":"Bohunick\u00e1","GPS":null,"ADMIN_STATUS":0,"AREA":3964,"CATASTRAL":"Horn\u00ed Her\u0161pice","CATASTRAL_NR":612065,"NUM_OF_SPACES":45,"URL":"9mJ.exTjPaEo66LZB6UJLM6lYP&x=16.5949050&y=49.1643023&z=19&ovl=1","CREATED":"2025-02-11 15:38:08","LAST_CHANGE":"2025-02-11 15:38:32","COMMENT":"Zat\u00edm jen v katastru","SPACES":0}], "sts": "OK", "Total": 9}';
			setLocations(JSON.parse(dbtxt).Locations);
			setLocOk('');
		}
		else
		{
			try {
				const resp = await fetch('../APIv01/get_cityloc.php?city='+city);
				const locs = await resp.json();
				console.log(JSON.stringify(locs));
				if (locs.sts === "OK")
				{
					setLocOk('');
					setLocations(locs.Locations);
				}
				else
					setLocOk(locs.msg);
			}
			catch (error) {
				console.error('Error fetching data:', error);
				setLocOk('Error fetching data:' + error);
			}
		}
	};

	useEffect(() => {
		fetchData();
	});

	let rqm = require("./img/editmap36.png");

	const showLocations = () => {
		return (
			<>
				<thead>
					<tr><th>ID</th><th>Potential</th><th>NAME</th><th>DISTRICT</th><th>Spaces</th><th>Util.</th><th>map</th></tr>
				</thead>
				<tbody>
					{
						locations.map
						(
							loc => <tr key={loc.ID}>
								<td>{loc.ID}</td>
								<td>{loc.NUM_OF_SPACES}</td>
								<td>{loc.NAME}</td>
								<td>{loc.DISTRICT}</td>
								<td>{loc.SPACES}</td>
								<td>{(loc.SPACES / loc.NUM_OF_SPACES).toFixed(3)+' %'}</td>
								<td><a rel="noreferrer" href={'https://mapy.cz/zakladni?mereni-vzdalenosti&rm='+loc.URL} target='_blank'><img className="city-loc-img" src={rqm} alt="map" /></a></td>
								</tr>
						)
					}
				</tbody>
			</>
		)
	}

	const showNullLoc = () => {
		return (
			<tbody><tr><td className="city-loc-error">{locOk}</td></tr></tbody>
		)
	}

	return (
		<tr className="city-loc-tr">
			<td colSpan={6}>
			<table className="city-loc">
				{(locOk==='')?showLocations():showNullLoc()}
			</table>
			</td>
		</tr>
	);
};