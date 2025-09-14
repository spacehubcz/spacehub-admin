import { useState } from "react";
import { CityLoc } from "./LocCityLoc";

export const LocCity = ({city}) => {
	const [expLocations, setExpLocations] = useState(0);

	return (
		<>
			<tr className='loc-city'>
				<td><div className='loc-row-big-nr'>{city.POTENTIAL}</div></td>
				<td className='loc-row-bold'>{city.CITY}</td>
				<td onClick={() => setExpLocations(!expLocations)}><span className={(expLocations > 0) ? 'loc-row-usr-active' : 'loc-row-usr'}>{city.CNT}</span></td>
				<td>{city.SPACES}</td>
				<td>{city.OWNERS}</td>
				<td>{(city.SPACES / city.POTENTIAL).toFixed(3)+'%'}</td>
			</tr>
			{(expLocations > 0) && <CityLoc city={city.CITY}/>}
		</>
	);
};