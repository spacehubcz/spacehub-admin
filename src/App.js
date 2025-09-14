import './styles/App.css';
import './styles/index.css';
import { useState } from 'react';
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

  document.title = 'S P A C E H U B - admin';

  const basic = {
	setDetail,
	setStatistics,
  }

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
