import './Users.css';
import {useState, useEffect} from 'react';
import { SpaceDetail } from './SpaceDetail';

export const Spaces = ({setdetail, setstatistics}) => {
	const [spaces, setSpaces] = useState([]);
	const [sort, setSort] = useState(0);
	const [locations, setLocations] = useState([])
	const [selLocation, setSelLocation] = useState(0)

	const fetchLocations = () => {
		let url = '../APIv01/get_locations.php';
		if (window.location.href.startsWith('http://localhost'))
			url = 'http://localhost:3080/get_locations';
		fetch(url, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: '{"uid":0}'
		})
		.then(r => r.json())
		.then(r => {
			if ('OK' === r.sts) {
				console.log(JSON.stringify(r))
				setLocations(r.LOCATIONS);
			} else console.log('LOCATIONS not loaded, it is: '+r.sts+' with msg: '+r.msg)
		})
		.catch(error => console.error('Neco se stalo: ', error))
	}

	const fetchData = async () => {
		let url = '../APIv01/get_spaces.php';
		if (window.location.href.startsWith('http://localhost'))
			url = 'http://localhost:3080/get_spaces';
		fetch(url, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: '{"lid":' + selLocation + '}'
		})
		.then(r => r.json())
		.then(r => {
			if ('OK' === r.sts) {
				r.spaces.forEach(spc => {
					spc.CITY = spc.CITY + ' ' + spc.STREET + ' ' + spc.STREET_NR;
				});
				setSpaces(r.spaces)  
			} else console.log('sts is not okay, it is: '+r.sts+' with msg: '+r.msg)
		})
		.catch(error => console.error('Neco se stalo: ', error))
	}

	useEffect(() => {

		fetchLocations();
	}, []);

	useEffect(() => {
		if (!selLocation) return;
		fetchData();
	}, [selLocation]);

	const sortSpaces = (s) => {
		if (Math.abs(sort) === s) s = sort * -1;
		setSort(s);
		switch (s)
		{
			default:
			case -1:	setSpaces([...spaces].sort((a, b) => b.ID - a.ID)); break;
			case 1:		setSpaces([...spaces].sort((a, b) => a.ID - b.ID)); break;
			case -2:	setSpaces([...spaces].sort((a, b) => b.NAME.localeCompare(a.NAME))); break;
			case 2:		setSpaces([...spaces].sort((a, b) => a.NAME.localeCompare(b.NAME))); break;
			case -3:	setSpaces([...spaces].sort((a, b) => b.CITY.localeCompare(a.CITY))); break;
			case 3:		setSpaces([...spaces].sort((a, b) => a.CITY.localeCompare(b.CITY))); break;
			case -4:	setSpaces([...spaces].sort((a, b) => b.WIDTH - a.WIDTH)); break;
			case 4:		setSpaces([...spaces].sort((a, b) => a.WIDTH - b.WIDTH)); break;
			case -5:	setSpaces([...spaces].sort((a, b) => b.COMMENT.localeCompare(a.COMMENT))); break;
			case 5:		setSpaces([...spaces].sort((a, b) => a.COMMENT.localeCompare(b.COMMENT))); break;
			case -6:	setSpaces([...spaces].sort((a, b) => b.ACTIVE - a.ACTIVE)); break;
			case 6:		setSpaces([...spaces].sort((a, b) => a.ACTIVE - b.ACTIVE)); break;
			case -7:	setSpaces([...spaces].sort((a, b) => b.ACCESS - a.ACCESS)); break;
			case 7:		setSpaces([...spaces].sort((a, b) => a.ACCESS - b.ACCESS)); break;
			case -8:	setSpaces([...spaces].sort((a, b) => b.OFFERS - a.OFFERS)); break;
			case 8:		setSpaces([...spaces].sort((a, b) => a.OFFERS - b.OFFERS)); break;
		}
	}

	const setSelSpace = (spc) => {
		setdetail(<SpaceDetail spaceIn={spc} />)
	}

	const getLocations = () => {

		return (
			<select onChange={locationChange}>
				{locations.map(loc => 
					<option key={loc.ID} value={loc.ID}>{loc.ID + ': ' + loc.CITY + ' : ' + loc.NAME}</option>
				)}
			</select>
		)
	}

	const locationChange = (e) => {
		let lid = e.target.value
		setSelLocation(Number(lid))
	}

    return (
		<div className='spaces-main'>
			<div>
				
				{getLocations()} S P A C E S
				{// prostor pro filter nebo tak neco 
				}
			</div>
			<div className='usr-body'>
				<table className='usr-tab'>
					<thead>
						<tr key={0}>
							<th onClick={() => sortSpaces(1)} >ID {(sort===1)?'\u25B2':(sort===-1)?'\u25BC':''}</th>
							<th onClick={() => sortSpaces(2)} >Name {(sort===2)?'\u25B2':(sort===-2)?'\u25BC':''}</th>
							<th onClick={() => sortSpaces(8)} >Offers {(sort===8)?'\u25B2':(sort===-8)?'\u25BC':''}</th>
							<th onClick={() => sortSpaces(3)} >City {(sort===3)?'\u25B2':(sort===-3)?'\u25BC':''}</th>
							<th onClick={() => sortSpaces(4)} >Size {(sort===4)?'\u25B2':(sort===-4)?'\u25BC':''}</th>
							<th onClick={() => sortSpaces(5)} >Comment {(sort===5)?'\u25B2':(sort===-5)?'\u25BC':''}</th>
							<th onClick={() => sortSpaces(6)} >Parcel Nr {(sort===6)?'\u25B2':(sort===-6)?'\u25BC':''}</th>
							<th onClick={() => sortSpaces(7)} >Access {(sort===7)?'\u25B2':(sort===-7)?'\u25BC':''}</th>
							<th>Detail</th>
						</tr>
					</thead>
					<tbody>
						{
							spaces.map(spc => <tr key={spc.ID}>
								<td>{spc.ID}</td>
								<td>{spc.NAME}</td>
								<td>{spc.OFFERS}</td>
								<td>{spc.CITY}</td>
								<td>{spc.WIDTH} x {spc.LENGTH} x {spc.HEIGHT}</td>
								<td>{spc.COMMENT}</td>
								<td>{spc.PARCEL_NR}</td>
								<td>{spc.ACCESS}</td>
								<td onClick={() => setSelSpace(spc)}>GPS</td>
							</tr>)
						}
					</tbody>
				</table>
			</div>
		</div>
    );
    
};
