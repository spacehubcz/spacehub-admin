import './styles/App.css';
import './styles/index.css';
import { useEffect, useState } from 'react';
import { Locations } from './Locations';
import { LocCities } from './LocCities';
import { Users } from './Users.js';
import { LocationTracker } from './Global.js';
import { Statistics } from './Statistics.js';
import { MapCities } from "./MapCities";
import { Spaces } from './Spaces.js';
import { Offers } from './Offers.js';
import { Purchases } from './Purchases.js';
import { MapyCzUrl } from './MapyCzUrl.js';
import { Qr } from './Qr.js';

function App() {
	const [area, setArea] = useState(<div></div>);
	const [detail, setDetail] = useState(<div>detail</div>);
	const [statistics, setStatistics] = useState({});
	const [showMap, setShowMap] = useState(false);
	const [pass, setPass] = useState(false);

	document.title = 'S P A C E H U B - admin';

	const validateJson = (str) => {
		try {
			const obj = JSON.parse(str)
			return typeof obj === 'object' && obj !== null
		} catch (err) {}
	}

	const decodeLocal = (Key) => {
		if (!Key) return
		const key = btoa(Key)
		return localStorage.getItem(key) ? atob(localStorage.getItem(key)) : null
	}

	useEffect(() => {
		let stored_user =  validateJson(decodeLocal('spacehub-user')) ? JSON.parse(decodeLocal('spacehub-user')) : undefined

		if (!stored_user || !stored_user.tok || !stored_user.pay) return

		stored_user.adm = 4;
		// ???

		console.log(JSON.stringify(stored_user))
		
		// If the token exists, verify it with the auth server to see if it is valid
		const url = 'https://www.spacehub.cz/APIv01/log_verify.php';

		fetch(url, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify(stored_user)
		})
			.then(r => r.json())
			.then(r => {
				if (r.sts === 'OK') {
					setPass(true)
				} else {
					setPass(false)
					console.log('no no no')
				}
			})
			.catch(err => {})
	}, [])

	const basic = {
		setDetail,
		setStatistics,
	}

	if (!pass) return <div>You think that you can crack the code, huh?</div>

	return (
		<div className='admin-all'>
			<div className="admin-header">
				<span>S P A C E H U B - Administrator Interface</span>
			</div>
			<div className='admin-content'>
				<div className='admin-menu'>
					<div onClick={() => setArea(<Locations {...basic}/>)}>LOCATIONS</div>
					<div onClick={() => setArea(<LocCities {...basic}/>)}>CITIES</div>
					<div onClick={() => setArea(<Users {...basic}/>)}>USERS</div>
					<div onClick={() => setArea(<Spaces {...basic}/>)}>SPACES</div>
					<div onClick={() => setArea(<Offers {...basic}/>)}>OFFERS</div>
					<div onClick={() => setArea(<Purchases {...basic}/>)}>PURCHASES</div>
					<div onClick={() => setArea(<MapyCzUrl {...basic}/>)}>Mapy.cz url</div>
					<div onClick={() => setArea(<LocationTracker {...basic}/>)}>GPS</div>          
					<div onClick={() => setArea(<Qr {...basic}/>)}>QR</div>          
				</div>
				<div className='admin-area'>
					{area}
				</div>
				<div className='admin-detail'>
					<div className='admin-right-pan'>
						<Statistics statist={statistics} showcitiesmap={setShowMap} />
					</div>
					<div className='admin-right-pan'>
						{detail}
					</div>
				</div>
					{
						(showMap) && <MapCities />
						// mapa funguje, ale nejdou mi dat do markru cisla
					}
			</div>
			<div id='admin-footer'>
				Footer
			</div>		
		</div>
	);
};
 
export default App;
