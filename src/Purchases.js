import { useState, useEffect } from "react";

export const Purchases = ({ setDetail, setStatistics }) => {
	const [purchases, setPurchases] = useState([]);
	const [sort, setSort] = useState(0);

	const fetchData = async () => {
		let url = 'https://www.spacehub.cz/APIv01/get_purchases.php';
		let need = {nic: 0};
		//what it is & how to fetch all purchases
		fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(need)
		})
			.then(r => r.json())
			.then(r => {
				console.log(JSON.stringify(r))
				if ('OK' === r.sts)
				{
					setPurchases(r.purchases);
				}
				console.log(r);
			})
			.catch(err => console.error('This is the error: , ', err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const sortPurchases = (s) => {
		if (Math.abs(sort) === s) s = sort * -1;
		setSort(s);
		switch (s)
		{
			default:
			case -1:	setPurchases([...purchases].sort((a, b) => b.ID - a.ID)); break;
			case 1:		setPurchases([...purchases].sort((a, b) => a.ID - b.ID)); break;
			case -2:	setPurchases([...purchases].sort((a, b) => b.OFFER_ID - a.OFFER_ID)); break;
			case 2:		setPurchases([...purchases].sort((a, b) => a.OFFER_ID - b.OFFER_ID)); break;
			case -3:	setPurchases([...purchases].sort((a, b) => b.USER_ID - a.USER_ID)); break;
			case 3:		setPurchases([...purchases].sort((a, b) => a.USER_ID - b.USER_ID)); break;
			case -4:	setPurchases([...purchases].sort((a, b) => b.SID - a.SID)); break;
			case 4:		setPurchases([...purchases].sort((a, b) => a.SID - b.SID)); break;
			case -5:	setPurchases([...purchases].sort((a, b) => b.LID - a.LID)); break;
			case 5:		setPurchases([...purchases].sort((a, b) => a.LID - b.LID)); break;
			case -6:	setPurchases([...purchases].sort((a, b) => Date.parse(b.FROM) - Date.parse(a.FROM))); break;
			case 6:		setPurchases([...purchases].sort((a, b) => Date.parse(a.FROM) - Date.parse(b.FROM))); break;
			case -7:	setPurchases([...purchases].sort((a, b) => Date.parse(b.TO) - Date.parse(a.TO))); break;
			case 7:		setPurchases([...purchases].sort((a, b) => Date.parse(a.TO) - Date.parse(b.TO))); break;
			case -8:	setPurchases([...purchases].sort((a, b) => b.PAID - a.PAID)); break;
			case 8:		setPurchases([...purchases].sort((a, b) => a.PAID - b.PAID)); break;
			case -9:	setPurchases([...purchases].sort((a, b) => b.PAY_REF - a.PAY_REF)); break;
			case 9:		setPurchases([...purchases].sort((a, b) => a.PAY_REF - b.PAY_REF)); break;
		}
	}

	return (
		<div className='loc-body'>
			<table className='loc-tab'>
				<thead>
					<tr>
						<th onClick={() => sortPurchases(1)} >ID 			{(sort===1)?'\u25B2':(sort===-1)?'\u25BC':''}</th>
						<th onClick={() => sortPurchases(2)} >Offer ID 		{(sort===2)?'\u25B2':(sort===-2)?'\u25BC':''}</th>
						<th onClick={() => sortPurchases(3)} >User ID 		{(sort===3)?'\u25B2':(sort===-3)?'\u25BC':''}</th>
						<th onClick={() => sortPurchases(4)} >Space ID 		{(sort===4)?'\u25B2':(sort===-4)?'\u25BC':''}</th>
						<th onClick={() => sortPurchases(5)} >Location ID 	{(sort===5)?'\u25B2':(sort===-5)?'\u25BC':''}</th>
						<th onClick={() => sortPurchases(6)} >From 			{(sort===6)?'\u25B2':(sort===-6)?'\u25BC':''}</th>
						<th onClick={() => sortPurchases(7)} >To 			{(sort===7)?'\u25B2':(sort===-7)?'\u25BC':''}</th>
						<th onClick={() => sortPurchases(8)} >Paid 			{(sort===8)?'\u25B2':(sort===-8)?'\u25BC':''}</th>
						<th onClick={() => sortPurchases(9)} >Pay Ref. 		{(sort===9)?'\u25B2':(sort===-9)?'\u25BC':''}</th>
					</tr>
				</thead>
				<tbody>
					{purchases.map(offr => (
						<tr key={offr.ID}>
							<td>{offr.ID}</td>
							<td>{offr.OFFER_ID}</td>
							<td>{offr.USER_ID}</td>
							<td>{offr.SID}</td>
							<td>{offr.LID}</td>
							<td>{offr.FROM}</td>
							<td>{offr.TO}</td>
							<td>{offr.PAID}</td>
							<td>{offr.PAY_REF}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
