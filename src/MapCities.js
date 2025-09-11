import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import './MapCities.css'
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

export const MapCities = () => {
	const [markers, setMarkers] = useState([]);
	const [cities, setCities] = useState([]);

	useEffect(() => {
		if (window.location.href.startsWith('http://localhost'))
		{
			let dbtxt = '{"Cities":[{"c":"Brno","n":7},{"c":"Praha","n":5},{"c":"Olomouc","n":4},{"c":"Plzeň","n":4},{"c":"České Budějovice","n":4},{"c":"Hrade Králové","n":3},{"c":"Ostrava","n":2},{"c":"Zlín","n":2},{"c":"Moravany","n":1},{"c":"Jinočany","n":1},{"c":"Vyškov","n":1},{"c":"Hostivice","n":1}]}';
			setCities(JSON.parse(dbtxt).Cities);
		}
		else
		{
			fetch('../APIv01/get_cities.php')
			.then(resp => resp.json())
			.then(json => setCities(json.Cities))
			.catch(error => console.error("Chyba: " + error));
		}
	}, []);

	useEffect(() => {
		let mks = [];
		let i = 0;
		console.log(cities);
		if (!cities || !cities.length) return;
		cities.forEach(city => {
			console.log(city);
			mks.push(<Marker key={city.c} position={[50.1359, 11.98+i]} >sd</Marker>);
			i += 0.2;
		});
		setMarkers(mks);
	}, [cities]);

	return (
		<div className='map-cities-container'>
			<div className='map-cities' id='map'>
				<MapContainer className='map-cities-cont' bounds={[[51.1359, 11.98], [48.3723, 17.96]]} maxZoom={18}>
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

