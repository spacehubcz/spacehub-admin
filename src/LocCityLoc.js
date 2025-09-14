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
		try {
			const resp = await fetch(`https://www.spacehub.cz/APIv01/get_cityloc.php?city=${city}`);
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