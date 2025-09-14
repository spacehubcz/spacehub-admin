import './styles/Locations.css'
import { useState, useEffect } from 'react';
import { Location } from './Location.js';
import { LocationDetail } from './LocationDetail';

export const Locations = ({ setDetail, setStatistics }) => {
	const [selLoc, setSelLoc] = useState(0);
	const [data, setData] = useState([]);
	const [sort, setSort] = useState(0);
	const [loadData, setLoadData] = useState(0);

	const fetchData = async () => {
		fetch('https://www.spacehub.cz/APIv01/get_locations.php')
			.then(r => r.json())
			.then(r => {
				if (r.sts === "OK")
				{
					setData(r.LOCATIONS);
					let srt = Number(localStorage.getItem('location-sort'));
					if (!srt) srt = 3;
					setSort(srt);
				}
				else console.log(JSON.stringify(r));
			})
			.catch (err => console.error('Chyba dat:', err));
	};

	const calculateStatistics = () => {
		var stat = {
			LOCATIONS: 0,
			NUM_OF_SPACES: 0,
			SPACES: 0,
			OWNERS: 0,
			OFFERS: 0,
			ACTIVE: 0,
		};
		data.forEach(loc => {
			stat.LOCATIONS++;
			stat.NUM_OF_SPACES += loc.NUM_OF_SPACES;
			stat.SPACES += loc.SPACES;
			stat.OWNERS += loc.OWNERS;
			stat.OFFERS += loc.OFFER;
			stat.ACTIVE += loc.ACTIVE;
		});
		setStatistics(stat);
	}

	useEffect(() => {
		switch (sort)
		{
			case -1:	setData([...data].sort((a, b) => b.NUM_OF_SPACES - a.NUM_OF_SPACES)); break;
			case 1:		setData([...data].sort((a, b) => a.NUM_OF_SPACES - b.NUM_OF_SPACES)); break;
			case -2:	setData([...data].sort((a, b) => b.NAME.localeCompare(a.NAME))); break;
			case 2:		setData([...data].sort((a, b) => a.NAME.localeCompare(b.NAME))); break;
			case -3:	setData([...data].sort((a, b) => b.CITY.localeCompare(a.CITY))); break;
			case 3:		setData([...data].sort((a, b) => a.CITY.localeCompare(b.CITY))); break;
			case -4:	setData([...data].sort((a, b) => b.OWNERS - a.OWNERS)); break;
			case 4:		setData([...data].sort((a, b) => a.OWNERS - b.OWNERS)); break;
			case -5:	setData([...data].sort((a, b) => b.SPACES - a.SPACES)); break;
			case 5:		setData([...data].sort((a, b) => a.SPACES - b.SPACES)); break;
			case -6:	setData([...data].sort((a, b) => b.OFFER - a.OFFER)); break;
			case 6:		setData([...data].sort((a, b) => a.OFFER - b.OFFER)); break;
			case -7:	setData([...data].sort((a, b) => b.ACTIVE - a.ACTIVE)); break;
			case 7:		setData([...data].sort((a, b) => a.ACTIVE - b.ACTIVE)); break;
			case -8:	setData([...data].sort((a, b) => b.ID - a.ID)); break;
			case 8:		setData([...data].sort((a, b) => a.ID - b.ID)); break;
			default:	return;
		}
		calculateStatistics();
	}, [sort]);

	const sortLocation = (s) => {
		if (Math.abs(sort) === Math.abs(s)) s = sort * -1;
		setSort(s);
		localStorage.setItem('location-sort', s);
	}

	useEffect(() => {
		if (selLoc)
			setDetail(<LocationDetail current={selLoc} changed={setLoadData} />);
	}, [selLoc]);

	useEffect(() => {
		fetchData();
	}, [loadData]);

	return (
			<div className='loc-body'>
				<table className='loc-tab'>
					<thead>
						<tr>
							<th onClick={() => sortLocation(-1)} >Potential {(sort===1)?'\u25B2':(sort===-1)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-8)} >ID {(sort===8)?'\u25B2':(sort===-8)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(2)} >Name {(sort===2)?'\u25B2':(sort===-2)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(3)} >Location {(sort===3)?'\u25B2':(sort===-3)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-4)} >Owners {(sort===4)?'\u25B2':(sort===-4)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-5)} >Spaces {(sort===5)?'\u25B2':(sort===-5)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-6)} >Offers {(sort===6)?'\u25B2':(sort===-6)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-7)} >Active {(sort===7)?'\u25B2':(sort===-7)?'\u25BC':''}</th>
							<th>Edit</th>
							<th>Map</th>
							<th>AS</th>
							<th>GPS</th>
						</tr>
					</thead>
					<tbody>
						{
							data.map(locob => <Location key={2*locob.ID} loc={locob} setSelected={setSelLoc} setSpaceDetail={setDetail} />)
						}
					</tbody>
				</table>
			</div>
	);
}

