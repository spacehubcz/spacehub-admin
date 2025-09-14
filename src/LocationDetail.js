import './styles/InfoPane.css';
import {useState, useEffect} from 'react';
import { InfoPane } from './InfoPane';

export const LocationDetail = ({ current, changed }) => {

	let [infoTxt, setInfoTxt] = useState('');
	let [locDet, setLocDet] = useState({
		ID: 999,
		NAME: 'A',
		CITY: 'B',
		DISTRICT: 'C',
		AREA: 'D',
		CATASTRAL: 'E',
		CATASTRAL_NR: 'F',
		NUM_OF_SPACES: 'G',
		URL: 'H',
		COMMENT: 'J',
		ADMIN_STATUS: '0',
		LAST_CHANGE: 'I',
		CREATED: 'K'
	});
	const [imgSrc, setImgSrc] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch(`https://www.spacehub.cz/APIv01/get_location.php?id=${current}`);
			const facts = await response.json();
			if (facts.sts === "OK")
			{
				setLocDet(facts.Detail);
				if (facts.img)
					setImgSrc('https://www.spacehub.cz/Img/Loc/L'+String(current).padStart(6, '0')+'.webp');
				else
					setImgSrc('https://www.spacehub.cz/Img/Loc/L000000.webp');
			}
			else
				console.log(JSON.stringify(facts));
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	};

	useEffect(() => {
		fetchData();
	}, [current]);

	const updateLocation = (dr) => {
		let wr = locDet;
		if (!dr) wr.ID = 0;
		fetch('https://www.spacehub.cz/APIv01/set_location.php', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(wr)
		})
			.then(response => response.json())
			.then(json => {
				console.log(JSON.stringify(json))
				setInfoTxt("ok " + JSON.stringify(json))})
			.catch(err => console.error("Error occured: " + err));

		setTimeout(() => {
			changed(Date.now());
		}, 400);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLocDet({
			...locDet,  
			[name]: value
		});
	}

	return (
		<>
			<div className='loc-det-cap'>Location Detail id={current}</div>
			<InfoPane txt={infoTxt} />
			<table className='loc-det-tab'>
				<tbody>
					<tr key={0}><td colspan={2}><img className='loc-det-img' src={imgSrc}/></td></tr>
					<tr key={1}><td>Location Name</td><td><input type='text' onChange={handleChange} value={locDet.NAME} name='NAME' size='64'/></td></tr>
					<tr key={2}><td>City</td><td><input type='text' onChange={handleChange} value={locDet.CITY} name='CITY' size='64'/></td></tr>
					<tr key={3}><td>District</td><td><input type='text' onChange={handleChange} value={locDet.DISTRICT} name='DISTRICT' size='64'/></td></tr>
					<tr key={4}><td>Area [m<sup>2</sup>]</td><td><input type='text' onChange={handleChange} value={locDet.AREA} name='AREA'/></td></tr>
					<tr key={5}><td>Cadastral Territory </td><td><input type='text' onChange={handleChange} value={locDet.CATASTRAL} name='CATASTRAL' size='64'/></td></tr>
					<tr key={6}><td>Cadastral Number </td><td><input type='text' onChange={handleChange} value={locDet.CATASTRAL_NR} name='CATASTRAL_NR'/></td></tr>
					<tr key={7}><td>Num Of Spaces</td><td><input type='text' onChange={handleChange} value={locDet.NUM_OF_SPACES} name='NUM_OF_SPACES'/></td></tr>
					<tr key={8}><td>Mapy.cz URL</td><td><textarea onChange={handleChange} value={locDet.URL} name='URL' size='128' rows='2'></textarea></td></tr>
					<tr key={9}><td>Comment</td><td><textarea onChange={handleChange} name='COMMENT' rows='3' cols='42' value={locDet.COMMENT}></textarea></td></tr>
					<tr key={10}><td>Admin Sts</td><td><input type='text' onChange={handleChange} value={locDet.ADMIN_STATUS} name='ADMIN_STATUS'/></td></tr>
					<tr key={11}><td>Created/Changed</td><td><span className='loc-det-crecha'>{locDet.CREATED}</span> / <span className='loc-det-crecha'>{locDet.LAST_CHANGE}</span></td></tr>
					<tr key={12}><td colSpan={2}><button id='saveBut' onClick={() => updateLocation(true)} >Save</button><button onClick={() => updateLocation(false)} id='saveAsBut'>Save as New Location</button></td></tr>
				</tbody>
			</table>
		</>
	);
};