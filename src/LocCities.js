import './LocCities.css';
import { useState, useEffect } from 'react';
import { LocCity } from './LocCity';

export const LocCities = () => {
	const [cities, setCities] = useState([{}]);
	const [sort, setSort] = useState(1);

	const fetchData = async () => {
		if (window.location.href.startsWith('http://localhost')) {
			let dbtxt = '{"Cities": [{"CITY":"Brno","POTENTIAL":1486,"CNT":9,"SPACES":2,"OWNERS":2}, {"CITY":"\u010cesk\u00e9 Bud\u011bjovice","POTENTIAL":450,"CNT":4,"SPACES":0,"OWNERS":0}, {"CITY":"Hostivice","POTENTIAL":99,"CNT":1,"SPACES":0,"OWNERS":0}, {"CITY":"Hrade Kr\u00e1lov\u00e9","POTENTIAL":399,"CNT":3,"SPACES":0,"OWNERS":0}, {"CITY":"Jino\u010dany","POTENTIAL":160,"CNT":1,"SPACES":0,"OWNERS":0}, {"CITY":"Karlovy Vary","POTENTIAL":99,"CNT":2,"SPACES":0,"OWNERS":0}, {"CITY":"Moravany","POTENTIAL":376,"CNT":1,"SPACES":3,"OWNERS":2}, {"CITY":"Olomouc","POTENTIAL":647,"CNT":4,"SPACES":13,"OWNERS":2}, {"CITY":"Ostrava","POTENTIAL":181,"CNT":2,"SPACES":0,"OWNERS":0}, {"CITY":"Plze\u0148","POTENTIAL":955,"CNT":4,"SPACES":0,"OWNERS":0}, {"CITY":"Praha","POTENTIAL":448,"CNT":5,"SPACES":0,"OWNERS":0}, {"CITY":"Vy\u0161kov","POTENTIAL":250,"CNT":1,"SPACES":0,"OWNERS":0}, {"CITY":"Zl\u00edn","POTENTIAL":97,"CNT":2,"SPACES":0,"OWNERS":0}]}';
			setCities(JSON.parse(dbtxt).Cities);
		} else {
			try {
				const response = await fetch('../APIv01/get_loccities.php');
				const facts = await response.json();
				setCities(facts.Cities);
				console.log(JSON.stringify(facts));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
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

