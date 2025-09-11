import './InfoPane.css';
import './Space.css';
import { useState, useEffect} from 'react';
import { InfoPane } from './InfoPane';
import { SearchInput } from './SearchInput';

export const SpaceDetail = ({spaceIn}) => {

	const [infoTxt, setInfoTxt] = useState('');
	const [locList, setLocList] = useState([{}]);
	const [space, setSpace] = useState(spaceIn);
	const [selLocId, setSelLocId] = useState(spaceIn.ID_LOCATION);

	const fetchData = async () => {
		if (window.location.href.startsWith('http://localhost')) {
			let dbtxt = '{"Locations":[{"ID":39,"TXT":"[ Brno - Horní Heršpice ] Bohunická"},{"ID":7,"TXT":"[ Brno - Horní Heršpice ] Panorama Jih"},{"ID":38,"TXT":"[ Brno - Lesná ] Lesná - Dusíkova"},{"ID":3,"TXT":"[ Brno - Líšeň ] Líšeň - Horníkova"},{"ID":27,"TXT":"[ Brno - Líšeň ] Líšeň - Sedláčkova"},{"ID":2,"TXT":"[ Brno - Slatina ] Nová Slatina"},{"ID":10,"TXT":"[ Brno - Slatina ] Slatina - Bůčkova"},{"ID":9,"TXT":"[ Brno - Slatina ] Slatina - Křehlíkova"},{"ID":11,"TXT":"[ Brno - Starý Lískovec ] U Leskavy"},{"ID":29,"TXT":"[ České Budějovice - 2 ] Hvízdal"},{"ID":28,"TXT":"[ České Budějovice - 2 ] Plukovníka Malého"},{"ID":31,"TXT":"[ České Budějovice - 3 ] Jírovcoa - Nádražní"},{"ID":30,"TXT":"[ České Budějovice - České Vrbné ] Husova - Krčínova"},{"ID":33,"TXT":"[ Hostivice - Litovice ] Toskánská"},{"ID":20,"TXT":"[ Hradec Králové - Svobodné Dvory ] K Meteoru"},{"ID":19,"TXT":"[ Hradec Králové - Třebeš ] Labská Louka"},{"ID":18,"TXT":"[ Hradec Králové - Třebeš ] Ve Stromovce"},{"ID":16,"TXT":"[ Jinočany - Jinočany ] U Potoka"},{"ID":37,"TXT":"[ Karlovy Vary - Doubí u Karlových Var ] Svatošská"},{"ID":36,"TXT":"[ Karlovy Vary - Stará Role ] Truhlářská"},{"ID":1,"TXT":"[ Moravany - Vedle Futura ] Jabloňový Sad"},{"ID":4,"TXT":"[ Olomouc - Neředín ] Holandská čtvrť"},{"ID":5,"TXT":"[ Olomouc - Nová Ulice ] Mošnerova"},{"ID":6,"TXT":"[ Olomouc - Nová Ulice ] Profesora Fuky"},{"ID":8,"TXT":"[ Olomouc - Povel ] Jánského"},{"ID":17,"TXT":"[ Ostrava - Heřmanice ] Heřmánkova - Pampeliškova"},{"ID":25,"TXT":"[ Ostrava - Nová Bělá ] Kaminského"},{"ID":40,"TXT":"[ Pardubice - Bílé předměstí ] Do Nového"},{"ID":24,"TXT":"[ Plzeň - Bory ] U Borských kasáren"},{"ID":22,"TXT":"[ Plzeň - Valcha ] K Sokolu"},{"ID":21,"TXT":"[ Plzeň - Valcha ] K Zelené Louce"},{"ID":23,"TXT":"[ Plzeň - Východní předměstí ] Květná"},{"ID":12,"TXT":"[ Praha - Hloubětín ] Hany Maškové"},{"ID":32,"TXT":"[ Praha - Kyje ] Sicherova - Federova"},{"ID":15,"TXT":"[ Praha - Letňany ] Pavla Beneše"},{"ID":13,"TXT":"[ Praha - Prosek ] Zubrnická"},{"ID":14,"TXT":"[ Praha - Střížkov ] Zakšínská"},{"ID":26,"TXT":"[ Vyškov - Dědice u Vyškova ] Sídliště Osvobození"},{"ID":35,"TXT":"[ Zlín - Malenovice ] Pod Hradem"},{"ID":34,"TXT":"[ Zlín - Zlín ] Pod Křiby"}],"sts":"OK"}';
			let locs = JSON.parse(dbtxt).Locations;
			setLocList(locs);
		} else {
			fetch('../APIv01/get_locnames.php')
			.then(r => r.json())
			.then(r => {
				if (r.sts === "OK")
					setLocList(r.Locations);
				else
					console.log(JSON.stringify(r));
			})
			.catch (error => console.error('Error fetching data:', error));
		}
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
		fetch('../APIv01/set_spaceloc.php', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(wr)
		})
		.then(response => response.json())
		.then(json => setInfoTxt("ok " + JSON.stringify(json)))
		.catch(error => console.error("Error occured: " + error));

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
		s = "999999";
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