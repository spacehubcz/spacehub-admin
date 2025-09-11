import './InfoPane.css';
import {useState, useEffect} from 'react';
import { InfoPane } from './InfoPane';

export const LocationDetail = ({current, changed}) => {

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
		if (window.location.href.startsWith('http://localhost')) {
			let dbtxt = '[{"LOCATION_ID": 1, "Detail":{"ID":1,"CITY":"Nevser","DISTRICT":"Futos","NAME":"Odra","GPS":0,"ADMIN_STATUS":1,"AREA":8908,"CATASTRAL":"KDo vico","CATASTRAL_NR":698504,"NUM_OF_SPACES":3765,"URL":"9mIwcxTgJ08LBDUNR6Z8KpNgUVLgg1KBl6UfkEfgCN5HN&x=16.5915455&y=49.1531047&z=17","CREATED":"2024-09-24 10:22:07","LAST_CHANGE":"2024-10-25 17:55:59","COMMENT":"123"},"Points": [[49.154417,16.589939], [49.153786,16.588912], [49.153561,16.588904], [49.153319,16.588992], [49.152803,16.589625], [49.152758,16.589778], [49.152919,16.590379], [49.152996,16.590450], [49.152994,16.590620], [49.152902,16.591717], [49.153051,16.591712], [49.154339,16.591631], [49.154664,16.591554], [49.154682,16.591163], [49.154725,16.590473]]}, {"LOCATION_ID": 2, "Detail":{"ID":2,"CITY":"lets m","DISTRICT":"","NAME":"Nov\u00e1 Slatina","GPS":0,"ADMIN_STATUS":1,"AREA":41221,"CATASTRAL":"Slatina (okres Brno-m\u011bsto)","CATASTRAL_NR":612286,"NUM_OF_SPACES":46,"URL":"9mVeUxTocsIDGTNZJqIbHrNV2HgYJf1tULZILJYbfdQgZs&x=16.6755764&y=49.1851127&z=16","CREATED":"2024-09-24 11:07:30","LAST_CHANGE":"2024-10-27 11:05:33","COMMENT":"Komentar"},"Points": [[49.181870,16.669486], [49.181515,16.669063], [49.181315,16.669114], [49.181056,16.668784], [49.180579,16.668821], [49.179178,16.671608], [49.180121,16.672783], [49.181871,16.669543]]}, {"LOCATION_ID": 3, "Detail":{"ID":3,"CITY":"Lem","DISTRICT":"Bombagh","NAME":"U Hoaka","GPS":0,"ADMIN_STATUS":0,"AREA":80,"CATASTRAL":"L\u00ed\u0161e\u0148 (okres Brno-m\u011bsto)","CATASTRAL_NR":null,"NUM_OF_SPACES":91,"URL":"9mX5oxTzEMNR6jLdRhCXRvHiFBMwLIOxNBOPQqW9Jl6TIa&x=16.6826038&y=49.2120828&z=17","CREATED":"2024-09-24 11:16:07","LAST_CHANGE":"2024-10-27 11:08:01","COMMENT":"Posledni"},"Points": [[49.214090,16.679712], [49.213710,16.679193], [49.213626,16.679193], [49.213628,16.679783], [49.213192,16.679970], [49.213154,16.680830], [49.213593,16.680944], [49.213833,16.680840], [49.214082,16.679757]]}]';
			let locdetail = JSON.parse(dbtxt)[current%3].Detail;
			setLocDet(locdetail);
		} else {
			try {
				const response = await fetch('../APIv01/get_location.php?id='+current);
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
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, [current]);

	const updateLocation = (dr) => {
		let wr = locDet;
		if (!dr) wr.ID = 0;
		fetch('../APIv01/set_location.php', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(wr)
		})
		.then(response => response.json())
		.then(json => {
			console.log(JSON.stringify(json))
			setInfoTxt("ok " + JSON.stringify(json))})
		.catch(error => console.error("Error occured: " + error));

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