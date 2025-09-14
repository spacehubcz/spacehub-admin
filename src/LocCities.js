import './styles/LocCities.css';
import { useState, useEffect } from 'react';
import { LocCity } from './LocCity';

export const LocCities = () => {
	const [cities, setCities] = useState([{}]);
	const [sort, setSort] = useState(1);

	const fetchData = async () => {
		try {
			const response = await fetch('https://www.spacehub.cz/APIv01/get_loccities.php');
			const facts = await response.json();
			setCities(facts.Cities);
			console.log(JSON.stringify(facts));
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const sortCites = (s) => {
		if (Math.abs(sort) === Math.abs(s)) s = sort * -1;
		setSort(s);
		switch (s)
		{
			default:
			case -1:	setCities([...cities].sort((a, b) => b.CITY.localeCompare(a.CITY))); break;
			case 1:		setCities([...cities].sort((a, b) => a.CITY.localeCompare(b.CITY))); break;
			case -2:	setCities([...cities].sort((a, b) => b.POTENTIAL - a.POTENTIAL)); break;
			case 2:		setCities([...cities].sort((a, b) => a.POTENTIAL - b.POTENTIAL)); break;
			case -3:	setCities([...cities].sort((a, b) => b.CNT - a.CNT)); break;
			case 3:		setCities([...cities].sort((a, b) => a.CNT - b.CNT)); break;
			case -4:	setCities([...cities].sort((a, b) => b.SPACES - a.SPACES)); break;
			case 4:		setCities([...cities].sort((a, b) => a.SPACES - b.SPACES)); break;
			case -5:	setCities([...cities].sort((a, b) => b.OWNERS - a.OWNERS)); break;
			case 5:		setCities([...cities].sort((a, b) => a.OWNERS - b.OWNERS)); break;
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='loc-body'>
			<table className='loc-tab'>
				<thead>
					<tr>
						<th onClick={() => sortCites(-2)} >Potential {(sort===2)?'\u25B2':(sort===-2)?'\u25BC':''}</th>
						<th onClick={() => sortCites(1)} >City {(sort===1)?'\u25B2':(sort===-1)?'\u25BC':''}</th>
						<th onClick={() => sortCites(-3)} >Locations {(sort===3)?'\u25B2':(sort===-3)?'\u25BC':''}</th>
						<th onClick={() => sortCites(-4)} >Spaces {(sort===4)?'\u25B2':(sort===-4)?'\u25BC':''}</th>
						<th onClick={() => sortCites(-5)} >Owners {(sort===5)?'\u25B2':(sort===-5)?'\u25BC':''}</th>
						<th onClick={() => sortCites(-5)} >Utilization {(sort===5)?'\u25B2':(sort===-5)?'\u25BC':''}</th>
					</tr>
				</thead>
				<tbody>
					{
						cities.map(city => <LocCity key={city.CITY+city.POTENTIAL} city={city}/>)
					}
				</tbody>
			</table>
		</div>
	);
}

