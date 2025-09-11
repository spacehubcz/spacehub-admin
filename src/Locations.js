import './Locations.css'
import { useState, useEffect } from 'react';
import { Location } from './Location.js';
import { LocationDetail } from './LocationDetail';

export const Locations = ({setdetail, setstatistics}) => {
	const [selLoc, setSelLoc] = useState(0);
	const [data, setData] = useState([]);
	const [sort, setSort] = useState(0);
	const [loadData, setLoadData] = useState(0);

	const fetchData = async () => {
		if (window.location.href.startsWith('http://localhost')) {
			let dbtxt = '{"php":"get_locations","LOCATIONS":[{"ID":7,"CITY":"Brno","DISTRICT":"Horní Heršpice","NAME":"Panorama Jih","NUM_OF_SPACES":300,"URL":"9mMgTxTj9NGdJlPDgT8gX98nNnIifgQFvLdAG&x=16.6101684&y=49.1666723&z=18&ovl=1","SPACES":4,"OWNERS":1,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":3},{"ID":39,"CITY":"Brno","DISTRICT":"Horní Heršpice","NAME":"Bohunická","NUM_OF_SPACES":45,"URL":"9mJ.exTjPaEo66LZB6UJLM6lYP&x=16.5949050&y=49.1643023&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":38,"CITY":"Brno","DISTRICT":"Lesná","NAME":"Lesná - Dusíkova","NUM_OF_SPACES":130,"URL":"9mO9tx8E874DN4HEEGfd0K9NGJC81LmNbIQOSFkUVM96Q8EWjNzOBW9UgNoNDRnInOK&x=16.6259904&y=49.2356309&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":3,"CITY":"Brno","DISTRICT":"Líšeň","NAME":"Líšeň - Horníkova","NUM_OF_SPACES":91,"URL":"9mX5oxTzEMNR6jLdRhCXRvHiFBMwLIOxNBOPQqW9Jl6TIa&x=16.6826038&y=49.2120828&z=17","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":27,"CITY":"Brno","DISTRICT":"Líšeň","NAME":"Líšeň - Sedláčkova","NUM_OF_SPACES":151,"URL":"9mWFExTvf3JeLbIo2nfjVEqRvfi8gOBTq6e8RRQTUJgg6B&x=16.6714741&y=49.2030273&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":2,"CITY":"Brno","DISTRICT":"Slatina","NAME":"Nová Slatina","NUM_OF_SPACES":400,"URL":"9mVeUxTocsIDGTNZJqIbHrNV2HgYJf1tULZILJYbfdQgZs&x=16.6755764&y=49.1851127&z=16","SPACES":2,"OWNERS":2,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":1},{"ID":9,"CITY":"Brno","DISTRICT":"Slatina","NAME":"Slatina - Křehlíkova","NUM_OF_SPACES":250,"URL":"9mZFExTmIAG9D-gW1fclSNUQfeJgYw&x=16.6892546&y=49.1721697&z=17","SPACES":1,"OWNERS":1,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":10,"CITY":"Brno","DISTRICT":"Slatina","NAME":"Slatina - Bůčkova","NUM_OF_SPACES":50,"URL":"9mZ65xTmXIJn4ogX8faSSqVcfdGg-9Jd4j&x=16.6905850&y=49.1726169&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":11,"CITY":"Brno","DISTRICT":"Starý Lískovec","NAME":"U Leskavy","NUM_OF_SPACES":100,"URL":"9mGf8xTjHaIjU2fjXNmM9fh7D9KLCGKHNQCvQnMETDNNN9RqU0N06DOjV0Mn6NVZYNNVN8Uu&x=16.5689217&y=49.1637130&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":28,"CITY":"České Budějovice","DISTRICT":2,"NAME":"Plukovníka Malého","NUM_OF_SPACES":50,"URL":"9hEQdxSjVYYXNORefmBPON.OgH6IVKPEGUHLsYGEsMAMzOr&x=14.4497762&y=48.9888097&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":29,"CITY":"České Budějovice","DISTRICT":2,"NAME":"Hvízdal","NUM_OF_SPACES":120,"URL":"9h2yexSmM9M04yNq4s-SKqObfmfPo67KSgRTfkvRY&x=14.4484915&y=48.9964311&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":31,"CITY":"České Budějovice","DISTRICT":3,"NAME":"Jírovcoa - Nádražní","NUM_OF_SPACES":120,"URL":"9hItJxSiU0JjIJ6XHVKBAJUeIb6lZDPxNy6QOnD9XH&x=14.4792484&y=48.9860542&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":30,"CITY":"České Budějovice","DISTRICT":"České Vrbné","NAME":"Husova - Krčínova","NUM_OF_SPACES":160,"URL":"9hEUSxSnctKDM9MeGNEd4ALQH7SSBIX16sIng-I&x=14.4489662&y=48.9998239&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":33,"CITY":"Hostivice","DISTRICT":"Litovice","NAME":"Toskánská","NUM_OF_SPACES":99,"URL":"9g-A9xXvs3LDHWW84UZ8F.gQqKv6qJpQ1NML886fcqQufkDWM&x=14.2357816&y=50.0830219&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":20,"CITY":"Hradec Králové","DISTRICT":"Svobodné Dvory","NAME":"K Meteoru","NUM_OF_SPACES":150,"URL":"9jueBxYl1oG9Nh0G2O4nfmjgZ1EMNgSuKggVk&x=15.7840949&y=50.2244413&z=17&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":1},{"ID":18,"CITY":"Hradec Králové","DISTRICT":"Třebeš","NAME":"Ve Stromovce","NUM_OF_SPACES":120,"URL":"9kA-qxY131flx2XMxEp-8fgZWG6sV8gQ-DgTsGqWs&x=15.8282789&y=50.1859387&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":19,"CITY":"Hradec Králové","DISTRICT":"Třebeš","NAME":"Labská Louka","NUM_OF_SPACES":129,"URL":"9kA6XxY1BYfmNEQTjfgUPx49VNSpJGgZ.&x=15.8270987&y=50.1845304&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":1},{"ID":16,"CITY":"Jinočany","DISTRICT":"Jinočany","NAME":"U Potoka","NUM_OF_SPACES":160,"URL":"9g3gbxXfshGXfbGgQ9GgS9gV3flJV6&x=14.2710848&y=50.0304442&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":37,"CITY":"Karlovy Vary","DISTRICT":"Doubí u Karlových Var","NAME":"Svatošská","NUM_OF_SPACES":60,"URL":"9dZPoxYgO84vflwWn4TSqEOTvOvObQhAoVb6b8e2gQw&x=12.8234511&y=50.2078282&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":36,"CITY":"Karlovy Vary","DISTRICT":"Stará Role","NAME":"Truhlářská","NUM_OF_SPACES":39,"URL":"9d1bxxYqkuN5Hhg6ZMyNGRRflqN9&x=12.8364813&y=50.2422873&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":1,"CITY":"Moravany","DISTRICT":"Vedle Futura","NAME":"Jabloňový Sad","NUM_OF_SPACES":376,"URL":"9mIwcxTgJ08LBDUNR6Z8KpNgUVLgg1KBl6UfkEfgCN5HN&x=16.5915455&y=49.1531047&z=17","SPACES":5,"OWNERS":2,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":1},{"ID":4,"CITY":"Olomouc","DISTRICT":"Neředín","NAME":"Holandská čtvrť","NUM_OF_SPACES":128,"URL":"9nzHRxV4jLN0CjQ8MaWQR.g6dLcU9GpRGM6N0YxAQTOflXLU0XK-&x=17.2223584&y=49.5973342&z=16&ovl=1","SPACES":11,"OWNERS":2,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":6,"CITY":"Olomouc","DISTRICT":"Nová Ulice","NAME":"Profesora Fuky","NUM_OF_SPACES":150,"URL":"9701TxVDPPHgToExVtAjgY5L0LP69Igfj8finMJIoQDKmSxfkjX0fjDgV9gRQ&x=17.2276880&y=49.5826731&z=17&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":2},{"ID":5,"CITY":"Olomouc","DISTRICT":"Nová Ulice","NAME":"Mošnerova","NUM_OF_SPACES":249,"URL":"97AM-xVDalKqP5KQLLFQXzOQO6K8Q8EJDd8xAA8QL8RdRX&x=17.2318454&y=49.5827583&z=18&ovl=1","SPACES":2,"OWNERS":1,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":8,"CITY":"Olomouc","DISTRICT":"Povel","NAME":"Jánského","NUM_OF_SPACES":120,"URL":"97CZsxVBB-LqU22DJwG9gUfffX6c40TKC0S-IQBUgYjA-MDIkUQANZN6y6nGkYNPz&x=17.2429484&y=49.5765105&z=17&ovl=1","SPACES":1,"OWNERS":1,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":17,"CITY":"Ostrava","DISTRICT":"Heřmanice","NAME":"Heřmánkova - Pampeliškova","NUM_OF_SPACES":111,"URL":"9qFGqxWhVrAQ8Pfi90YJqGWV1C6OqQ6LqOvgUGg60NXOE&x=18.3184578&y=49.8595642&z=17&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":25,"CITY":"Ostrava","DISTRICT":"Nová Bělá","NAME":"Kaminského","NUM_OF_SPACES":70,"URL":"9pwj9xWHtpIgNV41fl4-QHo6xg6sHdRI&x=18.2574697&y=49.7727943&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":40,"CITY":"Pardubice","DISTRICT":"Bílé předměstí","NAME":"Do Nového","NUM_OF_SPACES":45,"URL":"9jwaKxXjx7K5C-NnECPqMMO9VrQNNwN8PgFQTP&x=15.7958979&y=50.0445857&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":24,"CITY":"Plzeň","DISTRICT":"Bory","NAME":"U Borských kasáren","NUM_OF_SPACES":155,"URL":"9e0xExVuQ4fP86PMGBFgj9Lk6GW4&x=13.3626717&y=49.7271279&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":22,"CITY":"Plzeň","DISTRICT":"Valcha","NAME":"K Sokolu","NUM_OF_SPACES":400,"URL":"939vLxVp8fCg4.L84aH9K2FNF7R0fg9g-nW4Gng-K&x=13.3196222&y=49.7099562&z=17&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":21,"CITY":"Plzeň","DISTRICT":"Valcha","NAME":"K Zelené Louce","NUM_OF_SPACES":200,"URL":"93vBsxVpXVIxKvfkDBvZ1fex-dgQOM9WuHxTe&x=13.3261507&y=49.7106898&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":23,"CITY":"Plzeň","DISTRICT":"Východní předměstí","NAME":"Květná","NUM_OF_SPACES":200,"URL":"9e2sDxVuFz49MeF1f5.P1fjOgUQPMJ9-XDJgQj&x=13.3916208&y=49.7261569&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":12,"CITY":"Praha","DISTRICT":"Hloubětín","NAME":"Hany Maškové","NUM_OF_SPACES":64,"URL":"9hPegxYCPULqIZL9fmOZvOp6xObV9UEM5QxCEM2D9OX&x=14.5227243&y=50.1062487&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":32,"CITY":"Praha","DISTRICT":"Kyje","NAME":"Sicherova - Federova","NUM_OF_SPACES":90,"URL":"9hWcdxYE3OFLf5TUzIKWgOiLz8kFxW1KOOh&x=14.5656236&y=50.1150359&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":15,"CITY":"Praha","DISTRICT":"Letňany","NAME":"Pavla Beneše","NUM_OF_SPACES":59,"URL":"9hPL1xYMWiOnfi3fl9U8KDJcXjD9g6XLcN8S1Ij6XIdgQBJgMX&x=14.5183792&y=50.1392160&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":13,"CITY":"Praha","DISTRICT":"Prosek","NAME":"Zubrnická","NUM_OF_SPACES":85,"URL":"9hL.0xYFowC8f1mYDEcX8gYIDQV3&x=14.4968303&y=50.1180166&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":1},{"ID":14,"CITY":"Praha","DISTRICT":"Střížkov","NAME":"Zakšínská","NUM_OF_SPACES":150,"URL":"9hMCJxYItABggNAfX0LpDG4UNGHOg81fZ1PdQzR8gQigWq6G&x=14.4936572&y=50.1299698&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":1},{"ID":26,"CITY":"Vyškov","DISTRICT":"Dědice u Vyškova","NAME":"Sídliště Osvobození","NUM_OF_SPACES":250,"URL":"9nPMex8SZwfelMJEgG3JbIeP0JVga4EkTeONMzgT2ISNK&x=16.9797646&y=49.2799741&z=19&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":35,"CITY":"Zlín","DISTRICT":"Malenovice","NAME":"Pod Hradem","NUM_OF_SPACES":45,"URL":"9oCiUxTvLJfh8fkCgNGfi.gSn-K0LgSo&x=17.5985033&y=49.2017068&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0},{"ID":34,"CITY":"Zlín","DISTRICT":"Zlín","NAME":"Pod Křiby","NUM_OF_SPACES":52,"URL":"9oMiwx8FYM45MP6lHMFgfiiQNK6VDgX2Kv6p&x=17.6640351&y=49.2386945&z=18&ovl=1","SPACES":0,"OWNERS":0,"OFFER":0,"ACTIVE":0,"ADMIN_STATUS":0}],"Cities":[{"c":"Brno","n":9},{"c":"Praha","n":5},{"c":"Olomouc","n":4},{"c":"Plzeň","n":4},{"c":"České Budějovice","n":4},{"c":"Hradec Králové","n":3},{"c":"Ostrava","n":2},{"c":"Zlín","n":2},{"c":"Karlovy Vary","n":2},{"c":"Moravany","n":1},{"c":"Jinočany","n":1},{"c":"Vyškov","n":1},{"c":"Hostivice","n":1},{"c":"Pardubice","n":1}],"sts":"OK"}';
			setData(JSON.parse(dbtxt).LOCATIONS);
			let srt = Number(localStorage.getItem('location-sort'));
			if (!srt) srt = -3;
			setSort(srt);
		} else {
			fetch('../APIv01/get_locations.php')
			.then(r => r.json())
			.then(r => {
				if (r.sts === "OK")
				{
					setData(r.LOCATIONS);
					let srt = Number(localStorage.getItem('location-sort'));
					if (!srt) srt = 3;
					setSort(srt);
				}
				else console.log(JSON.stringify(r));
			})
			.catch (error => console.error('Chyba dat:', error));
		}
	};

	const calculateStatistics = () => {
		var stat = {
			LOCATIONS: 0,
			NUM_OF_SPACES: 0,
			SPACES: 0,
			OWNERS: 0,
			OFFERS: 0,
			ACTIVE: 0,
		};
		data.forEach(loc => {
			stat.LOCATIONS++;
			stat.NUM_OF_SPACES += loc.NUM_OF_SPACES;
			stat.SPACES += loc.SPACES;
			stat.OWNERS += loc.OWNERS;
			stat.OFFERS += loc.OFFER;
			stat.ACTIVE += loc.ACTIVE;
		});
		setstatistics(stat);
	}

	useEffect(() => {
		switch (sort)
		{
			case -1:	setData([...data].sort((a, b) => b.NUM_OF_SPACES - a.NUM_OF_SPACES)); break;
			case 1:		setData([...data].sort((a, b) => a.NUM_OF_SPACES - b.NUM_OF_SPACES)); break;
			case -2:	setData([...data].sort((a, b) => b.NAME.localeCompare(a.NAME))); break;
			case 2:		setData([...data].sort((a, b) => a.NAME.localeCompare(b.NAME))); break;
			case -3:	setData([...data].sort((a, b) => b.CITY.localeCompare(a.CITY))); break;
			case 3:		setData([...data].sort((a, b) => a.CITY.localeCompare(b.CITY))); break;
			case -4:	setData([...data].sort((a, b) => b.OWNERS - a.OWNERS)); break;
			case 4:		setData([...data].sort((a, b) => a.OWNERS - b.OWNERS)); break;
			case -5:	setData([...data].sort((a, b) => b.SPACES - a.SPACES)); break;
			case 5:		setData([...data].sort((a, b) => a.SPACES - b.SPACES)); break;
			case -6:	setData([...data].sort((a, b) => b.OFFER - a.OFFER)); break;
			case 6:		setData([...data].sort((a, b) => a.OFFER - b.OFFER)); break;
			case -7:	setData([...data].sort((a, b) => b.ACTIVE - a.ACTIVE)); break;
			case 7:		setData([...data].sort((a, b) => a.ACTIVE - b.ACTIVE)); break;
			case -8:	setData([...data].sort((a, b) => b.ID - a.ID)); break;
			case 8:		setData([...data].sort((a, b) => a.ID - b.ID)); break;
			default:	return;
		}
		calculateStatistics();
	}, [sort]);

	const sortLocation = (s) => {
		if (Math.abs(sort) === Math.abs(s)) s = sort * -1;
		setSort(s);
		localStorage.setItem('location-sort', s);
	}

	useEffect(() => {
		if (selLoc)
			setdetail(<LocationDetail current={selLoc} changed={setLoadData} />);
	}, [selLoc]);

	useEffect(() => {
		fetchData();
	}, [loadData]);

	return (
			<div className='loc-body'>
				<table className='loc-tab'>
					<thead>
						<tr>
							<th onClick={() => sortLocation(-1)} >Potential {(sort===1)?'\u25B2':(sort===-1)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-8)} >ID {(sort===8)?'\u25B2':(sort===-8)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(2)} >Name {(sort===2)?'\u25B2':(sort===-2)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(3)} >Location {(sort===3)?'\u25B2':(sort===-3)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-4)} >Owners {(sort===4)?'\u25B2':(sort===-4)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-5)} >Spaces {(sort===5)?'\u25B2':(sort===-5)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-6)} >Offers {(sort===6)?'\u25B2':(sort===-6)?'\u25BC':''}</th>
							<th onClick={() => sortLocation(-7)} >Active {(sort===7)?'\u25B2':(sort===-7)?'\u25BC':''}</th>
							<th>Edit</th>
							<th>Map</th>
							<th>AS</th>
							<th>GPS</th>
						</tr>
					</thead>
					<tbody>
						{
							data.map(locob => <Location key={2*locob.ID} loc={locob} setSelected={setSelLoc} setSpaceDetail={setdetail} />)
						}
					</tbody>
				</table>
			</div>
	);
}

