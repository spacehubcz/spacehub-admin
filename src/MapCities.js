import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import './styles/MapCities.css'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	className: "red-icon",
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
	html: '<span class="icon-text">56</span>'
});

export const MapCities = ({ ip = '' }) => {
	const [markers, setMarkers] = useState([]);
	const [cities, setCities] = useState([]);

	useEffect(() => {
		const url = 'https://www.spacehub.cz/APIv01/get_stat.php'
        
        fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                uid: 'ALL',
                days: 30,
                test: false
            })
        })
            .then(r => r.json())
            .then(r => {
				console.log('rrr: ', JSON.stringify(r))
                if (r.sts === 'OK') {
                    // setScans(r.statistics)
					let stats = []
					r.statistics.forEach(stat => {
						const coords = stat.GPS
						const [lon, lat] = coords.match(/[-]?\d+(\.\d+)?/g).map(Number);
						if ((ip === '' || stat.IP === ip) && lon !== 0) stats.push({ lon, lat })
					})
					setCities(stats)
                }
            })
            .catch(err => console.error('Error fetching statistics: ', err))
	}, []);

	useEffect(() => {
		let mks = [];
		console.log(cities);
		if (!cities || !cities.length) return;
		cities.forEach((city, idx) => {
			console.log(city);
			mks.push(<Marker key={idx} position={[city.lat, city.lon]} >sd</Marker>);
		});
		setMarkers(mks);
	}, [cities]);

	return (
		<div className='map-cities-container'>
			<div className='map-cities' id='map'>
				<MapContainer className='map-cities-cont' bounds={[[49.3, 16.3], [49.1, 16.8]]} maxZoom={18}>
					<TileLayer
						url="https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=fkCf-F6Pxf7bjiTKHIDo5k9i2xEBjUNSgvzaDeQck50"
						attribution='<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>'
					/>
					{markers}
				</MapContainer>
			</div>
		</div>
	);
};

