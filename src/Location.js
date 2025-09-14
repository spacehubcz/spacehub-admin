import { useState } from "react";
import { LocUsers } from "./LocUsersDet.js"
import { LocSpaces } from "./LocSpacesDet.js"

export const Location = ({loc, setSelected, setSpaceDetail}) => {
	const [expLocUsers, setExpLocUsers] = useState(0);
	const [expLocSpaces, setExpLocSpaces] = useState(0);

	let url = 'https://mapy.cz/zakladni?mereni-vzdalenosti&rm='+loc.URL;

	let rqe = require("./img/detailw.png");
	let rqm = require("./img/editmap36.png");
	return (
		<>
			<tr className='loc-row'>
				<td><div className='loc-row-big-nr'>{loc.NUM_OF_SPACES ?? 333}</div></td>
				<td className='loc-row-id'>{loc.ID ?? ''}</td>
				<td className='loc-row-bold'>{loc.NAME ?? ''}</td>
				<td>{(loc.CITY ?? '') + ' - ' + (loc.DISTRICT ?? '')}</td>
				{(loc.OWNERS > 0)?
					<td onClick={()=>setExpLocUsers(!expLocUsers)}><span className={(expLocUsers > 0)? 'loc-row-usr-active': 'loc-row-usr'}>{loc.OWNERS ?? ''}</span></td>
					:
					<td><span className='loc-row-usr-inactive'>{loc.OWNERS ?? ''}</span></td>
				}
				{(loc.SPACES > 0)?
					<td onClick={()=>setExpLocSpaces(!expLocSpaces)}><span className={(expLocSpaces > 0)? 'loc-row-usr-active': 'loc-row-usr'}>{loc.SPACES ?? ''}</span></td>
					:
					<td><span className='loc-row-usr-inactive'>{loc.SPACES ?? ''}</span></td>
				}
				<td>{loc.OFFER ?? ''}</td>
				<td>{loc.ACTIVE ?? ''}</td>
				<td><img className="loc-row-img" src={rqe} alt="location" onClick={() => setSelected(loc.ID)} /></td>
				<td><a rel="noreferrer" href={url} target='_blank'><img className="loc-row-img" src={rqm} alt="map" /></a></td>
				<td><input type='checkbox' defaultChecked={loc.ADMIN_STATUS & 1} className="loc-row-chb"></input></td>
				<td><input type='checkbox' defaultChecked={loc.GPS_LON && loc.GPS_LAT} className="loc-row-chb"></input></td>
			</tr>
			{(expLocUsers > 0) && <LocUsers location_id={loc.ID} />}
			{(expLocSpaces > 0) && <LocSpaces location_id={loc.ID} selSpace={setSpaceDetail} />}
		</>
	);
};