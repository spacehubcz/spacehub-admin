import { useState, useEffect } from "react";

export const Offers = () => {
	const [offers, setOffers] = useState([]);
	const [sort, setSort] = useState(0);

	const fetchData = async () => {
		const url = 'https://www.spacehub.cz/APIv01/get_offers.php';
		
		fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({uid: 0})
		})
			.then(r => r.json())
			.then(r => {
				console.log('response: ', JSON.stringify(r))
				if ('OK' === r.sts)	{
					setOffers(r.offers);
				}
			})
			.catch(err => console.error('This is the error: , ', err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const sortOffers = (s) => {
		if (Math.abs(sort) === s) s = sort * -1;
		setSort(s);
		switch (s)
		{
			default:
			case -1:	setOffers([...offers].sort((a, b) => b.ID - a.ID)); break;
			case 1:		setOffers([...offers].sort((a, b) => a.ID - b.ID)); break;
			case -2:	setOffers([...offers].sort((a, b) => b.SPACE_ID - a.SPACE_ID)); break;
			case 2:		setOffers([...offers].sort((a, b) => a.SPACE_ID - b.SPACE_ID)); break;
			case -3:	setOffers([...offers].sort((a, b) => b.USER_ID - a.USER_ID)); break;
			case 3:		setOffers([...offers].sort((a, b) => a.USER_ID - b.USER_ID)); break;
			case -4:	setOffers([...offers].sort((a, b) => a.UNAME.localeCompare(b.UNAME))); break;
			case 4:		setOffers([...offers].reverse((a, b) => a.UNAME.localeCompare(b.UNAME))); break;
			case -5:	setOffers([...offers].sort((a, b) => a.SNAME.localeCompare(b.SNAME))); break;
			case 5:		setOffers([...offers].reverse((a, b) => a.SNAME.localeCompare(b.SNAME))); break;
			case -6:	setOffers([...offers].sort((a, b) => a.LOCNAME.localeCompare(b.LOCNAME))); break;
			case 6:		setOffers([...offers].reverse((a, b) => a.LOCNAME.localeCompare(b.LOCNAME))); break;
			case -7:	setOffers([...offers].sort((a, b) => Date.parse(b.FROM) - Date.parse(a.FROM))); break;
			case 7:		setOffers([...offers].sort((a, b) => Date.parse(a.FROM) - Date.parse(b.FROM))); break;
			case -8:	setOffers([...offers].sort((a, b) => Date.parse(b.TO) - Date.parse(a.TO))); break;
			case 8:		setOffers([...offers].sort((a, b) => Date.parse(a.TO) - Date.parse(b.TO))); break;
			case -9:	setOffers([...offers].sort((a, b) => b.PRICE - a.PRICE)); break;
			case 9:		setOffers([...offers].sort((a, b) => a.PRICE - b.PRICE)); break;
			case -10:	setOffers([...offers].sort((a, b) => b.FLAGS - a.FLAGS)); break;
			case 10:	setOffers([...offers].sort((a, b) => a.FLAGS - b.FLAGS)); break;
			case -11:	setOffers([...offers].sort((a, b) => b.MIN_RENT_TIME - a.MIN_RENT_TIME)); break;
			case 11:	setOffers([...offers].sort((a, b) => a.MIN_RENT_TIME - b.MIN_RENT_TIME)); break;
			case -12:	setOffers([...offers].sort((a, b) => Date.parse(b.CREATED) - Date.parse(a.CREATED))); break;
			case 12:	setOffers([...offers].sort((a, b) => Date.parse(a.CREATED) - Date.parse(b.CREATED))); break;
			case -13:	setOffers([...offers].sort((a, b) => Date.parse(b.LAST_CHANGE) - Date.parse(a.LAST_CHANGE))); break;
			case 13:	setOffers([...offers].sort((a, b) => Date.parse(a.LAST_CHANGE) - Date.parse(b.LAST_CHANGE))); break;
			case -14:	setOffers([...offers].sort((a, b) => a.EX.localeCompare(b.EX))); break;
			case 14:	setOffers([...offers].sort((a, b) => b.EX.localeCompare(a.EX))); break;
		}
	}

	return (
		<div className='loc-body'>
			<table className='loc-tab'>
				<thead>
					<tr>
						<th onClick={() => sortOffers(1)} >ID 		{(sort===1)?'\u25B2':(sort===-1)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(2)} >Space ID {(sort===2)?'\u25B2':(sort===-2)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(3)} >User ID 	{(sort===3)?'\u25B2':(sort===-3)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(4)} >UNAME 	{(sort===4)?'\u25B2':(sort===-4)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(5)} >SNAME 	{(sort===5)?'\u25B2':(sort===-5)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(6)} >LOCNAME 	{(sort===6)?'\u25B2':(sort===-6)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(7)} >From 	{(sort===7)?'\u25B2':(sort===-7)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(8)} >To 		{(sort===8)?'\u25B2':(sort===-8)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(9)} >Price 	{(sort===9)?'\u25B2':(sort===-9)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(10)} >Flags 	{(sort===10)?'\u25B2':(sort===-10)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(11)} >Min. r.t.{(sort===11)?'\u25B2':(sort===-11)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(12)} >Created {(sort===12)?'\u25B2':(sort===-12)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(13)} >Last ch. {(sort===13)?'\u25B2':(sort===-13)?'\u25BC':''}</th>
						<th onClick={() => sortOffers(14)} >EX {(sort===14)?'\u25B2':(sort===-14)?'\u25BC':''}</th>
					</tr>
				</thead>
				<tbody>
					{offers.map(offr => (
						<tr key={offr.ID}>
							<td>{offr.ID}</td>
							<td>{offr.SPACE_ID}</td>
							<td>{offr.USER_ID}</td>
							<td>{offr.UNAME}</td>
							<td>{offr.SNAME}</td>
							<td>{offr.LOCNAME}</td>
							<td>{offr.FROM}</td>
							<td>{offr.TO}</td>
							<td>{offr.PRICE}</td>
							<td>{offr.FLAGS}</td>
							<td>{offr.MIN_RENT_TIME}</td>
							<td>{offr.CREATED}</td>
							<td>{offr.LAST_CHANGE}</td>
							<td>{offr.EX}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
