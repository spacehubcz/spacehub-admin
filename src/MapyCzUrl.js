import { useEffect, useState } from "react";

/* Kalkulace souzadnic z mapy.cz url. Ty jsou kodovane do 64 znaku. */

/* JAK TO FUNGUJE

Absolutni souradnice jsou kodovane pres celou zemekouli
zacatek je	[n0000] to je -180°
nulty polednik je [90000]
konec je 	[.....] to je 180°

Diference se zadavaji v promenne delce znaku:

---------- 2 znakove ------------
prvni je	[00] = -100 m
posledni je [-.] = 100 m
---------- 3 znakove ------------
prvni je	[100] = -3192 m <131072>
posledni je [m..] = 3192 m	<196607>
cely rozsah je 65536
polovina rozsahu je 32768

*/

/* Vypocet kolik stupnu je na jednu jednotku

	180 deg		 -180 deg
	[.....]		 [n0000]
	1073741823 - 805306368 = 268435455

	nula = nulty polednik, nebo rovnik je polovina rozsahu [n0000] az [.....]
	to je [90000] a prevedeno na cislo je
	939524096
*/

export const MapyCzUrl = ({city}) => {

	const [btnOpMapDis, setBtnOpMapDis] = useState(true);
	const [mapyczurl, setMapyczurl] = useState('https://mapy.cz/zakladni?mereni-vzdalenosti&rm=9mX5oxTzEMNR6jLdRhCXRvHiFBMwLIOxNBOPQqW9Jl6TIa&x=16.6800664&y=49.2137622&z=19')
	const [mapBase, setMapBase] = useState({x: 0, y: 0});
	const [mapsdif, setMapsDif] = useState([]);

	const DegPer1Num = 360 / 268435455;	// stupne na jednu jednotku
	const ZeroXY = 939524096;
	
	const calculNum = (s) => {
		const ns = "0ABCD2EFGH4IJKLMN6OPQRST8UVWXYZ-1abcd3efgh5ijklmn7opqrst9uvwxyz.";
		var n = 0;
		while (s.length)
		{
			n *= 64;
			let c = s[0];
			let i = ns.indexOf(c);
			if (i >= 0)	n += i;	
			s = s.substring(1);
		}
		return n;
	}
	function xyPos(s, d) {
		let n = calculNum(s);
		return (n - ZeroXY) * DegPer1Num / d;
	}

	function xyDif(s, d) {
		let n = calculNum(s);
		// 2 character difference
		if (s.length === 2) return (n-1024) * DegPer1Num / d;
		// 3 character difference
		return (n - (131072 + 32768)) * DegPer1Num / d;
	}

	const calculate = () => {
		let u = mapyczurl;
		let i = u.indexOf("&rm=")+4;
		let b = {x: 0, y: 0};
		b.x = xyPos(u.substring(i, i+5), 1);
		b.y = xyPos(u.substring(i+5, i+5+5), 2);
		setMapBase(b);
		let gps = document.getElementById('gpscoord');
		gps.value = b.y + 'N, ' + b.x + 'E';
		setBtnOpMapDis(false);

		// calculate differences
		let e = u.indexOf("&x=");
		u = u.substring(i+10, e);
		let a = [];
		let floatX = b.x;
		let floatY = b.y;
		while (u.length > 0)
		{
			let o = {x: 0, y: 0};
			// X
			if (calculNum(u[0]) < 32) {	// 2 chars number
				floatX += xyDif(u.substring(0, 2), 1);
				u = u.substring(2);
			}
			else {
				floatX += xyDif(u.substring(0, 3), 1);
				u = u.substring(3);
			}
			// Y
			if (calculNum(u[0]) < 32) {	// 2 chars number
				floatY += xyDif(u.substring(0, 2), 2);
				u = u.substring(2);
			}
			else {
				floatY += xyDif(u.substring(0, 3), 2);
				u = u.substring(3);
			}
			o.x = floatX;
			o.y = floatY;
			a.push(o);
		}
		setMapsDif(a);
	}
	const openPosition = (x, y) => {
		let url = 'https://mapy.cz/zakladni?source=coor&id=';
		url += x + '%2C' + y + '&x=' + x + '&y=' + y + '&z=19';
		window.open(url);
	}
	
	useEffect(() => {
	
	}, []);

	const changeMapyCzUrl = (e) => {
		setMapyczurl(e.target.value);
	}

	return (
		<table><tbody>
		<tr><td colSpan={2}><input type="text" size="128" id="mapyczurl" value={mapyczurl} onChange={changeMapyCzUrl}/></td></tr>
		<tr><td><button onClick={calculate}>Calculate Coordinates</button></td></tr>
		<tr><td><input type="text" size="48" id="gpscoord" /></td><td><button onClick={() => openPosition(mapBase.x, mapBase.y)} id="btnOpenMap" disabled={btnOpMapDis}>Open Map</button></td></tr>
		{mapsdif.map(dif =>
			<tr><td>{dif.y + 'N, ' + dif.x + 'E'}</td><td><button onClick={() => openPosition(dif.x, dif.y)}>Show Position in Mapy.cz</button></td></tr>
		)}
		</tbody></table>
	);
};