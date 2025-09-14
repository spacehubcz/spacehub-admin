import './styles/InfoPane.css';
import './styles/Space.css';
import { useState, useEffect} from 'react';
import { InfoPane } from './InfoPane';
import { SearchInput } from './SearchInput';

export const SpaceDetail = ({spaceIn}) => {
	const [infoTxt, setInfoTxt] = useState('');
	const [locList, setLocList] = useState([{}]);
	const [space, setSpace] = useState(spaceIn);
	const [selLocId, setSelLocId] = useState(spaceIn.ID_LOCATION);

	const fetchData = async () => {
		fetch('https://www.spacehub.cz/APIv01/get_locnames.php')
			.then(r => r.json())
			.then(r => {
				if (r.sts === "OK")
					setLocList(r.Locations);
				else
					console.log(JSON.stringify(r));
			})
			.catch (err => console.error('Error fetching data:', err));
	};

	useEffect(() => {
		setSpace(spaceIn);
	}, [spaceIn]);

	useEffect(() => {
		fetchData();
	}, []);

	const updateSpace = () => {
		let wr = {
			ID: space.ID,
			ID_LOCATION: selLocId
		}
		fetch('https://www.spacehub.cz/APIv01/set_spaceloc.php', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(wr)
		})
			.then(response => response.json())
			.then(json => setInfoTxt("ok " + JSON.stringify(json)))
			.catch(err => console.error("Error occured: " + err));

		// setTimeout(() => {
		// 	changed();
		// }, 400);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSpace({
			...space,
			[name]: value
		});
	}

	var s = "00000" + space.ID;
	s = s.substring(s.length-6);
	let obr = null;
	try {
		obr = require("../Img/Spc/sp" + s +".webp");
	}
	catch {
		s = "000000";
		obr = require("../Img/Spc/sp" + s +".webp");
	}

	if (space === null) return <></>

	return (
		<>			
			<InfoPane txt={infoTxt} />
			<table className='space-det-tab'>
				<thead>
					<tr><th colSpan={4} className='space-det-cap'>Space Detail id={space.ID}</th><th colSpan={2}><button className='space-det-save' onClick={() => updateSpace()} >Save Changes</button></th></tr>
				</thead>
				<tbody>
					<tr key={1}><td>Space Name</td><td colSpan={5}><input type='text' onChange={handleChange} value={space.NAME} name='NAME'/></td></tr>
					<tr key={2}>
						<td>Width</td><td><input type='text' cls='num' onChange={handleChange} value={space.WIDTH} name='WIDTH'/></td>
						<td>Length</td><td><input type='text' cls='num' onChange={handleChange} value={space.LENGTH} name='LENGTH'/></td>
						<td>Height</td><td><input type='text' cls='num' onChange={handleChange} value={space.HEIGHT} name='HEIGHT'/></td></tr>
					<tr key={5}>
						<td>GPS Lon.</td><td><input type='text' cls='num' onChange={handleChange} value={space.GPS_LON} name='GPS_LON'/></td>
						<td>GPS&nbsp;Lan.</td><td><input type='text' cls='num' onChange={handleChange} value={space.GPS_LAN} name='GPS_LAN'/></td>
						<td>Access</td><td><input type='text' cls='num' onChange={handleChange} value={space.ACCESS} name='ACCESS'/></td></tr>
					<tr key={6}><td>City</td><td colSpan={3}><input type='text' cls='txt' onChange={handleChange} value={space.CITY} name='CITY'/></td>
						<td>Parcel Nr</td><td><input type='text' cls='num' onChange={handleChange} value={space.PARCEL_NR} name='PARCEL_NR'/></td></tr>
					<tr key={7}><td>Street</td><td colSpan={3}><input type='text' cls='txt' onChange={handleChange} value={space.STREET} name='STREET'/></td>
						<td>Street&nbsp;Nr</td><td><input type='text' cls='num' onChange={handleChange} value={space.STREET_NR} name='STREET_NR'/></td></tr>
					<tr key={8}><td>Comment</td><td colSpan={5}><textarea onChange={handleChange} name='COMMENT' rows='3' cols='42' value={space.COMMENT}></textarea></td></tr>
					<tr key={9}><td>Location</td><td colSpan={5}><SearchInput locList={locList} id={space.ID_LOCATION} setSelLocId={setSelLocId} /></td></tr>
					<tr key={10}><td>Created</td><td colSpan={2}><span className='loc-det-crecha'>{space.CREATED}</span></td><td>Changed</td><td colSpan={2}><span className='loc-det-crecha'>{space.LAST_CHANGE}</span></td></tr>
				</tbody>
			</table>
			<img src={obr} className='space-det-img' alt=''/>
		</>
	);
};