import { useEffect, useState } from "react";

export const LocationsStats = ({locations, setParentView}) => {
	const [view, setView] = useState(1);
	const [stats, setStats] = useState({
		TOTAL: 0,
		POTENTIAL: 0,
		REGISTERED: 0,
		UTILIZATION: 0
	});

	useEffect(() => {
		let stat = {TOTAL: 0, POTENTIAL: 0, REGISTERED: 0, UTILIZATION: 0};
		locations.forEach(element => {
			stat.POTENTIAL += element.NUM_OF_SPACES;
			stat.REGISTERED += element.SPACES;
			stat.TOTAL++;
		});
		stat.UTILIZATION = stat.REGISTERED / stat.POTENTIAL * 100;
		setStats(stat);
	}, [locations]);

	useEffect(() => {
//		console.log(JSON.stringify(cities))
	}, [view]);

	const setViewX = (v) => {
		setView(v);
		setParentView(v);
	}

	return (
		<div className='loc-stat-div'>
			<table className="loc-stat-tab">
				<thead>
					<tr><th colSpan={2}>Statistics</th></tr>
				</thead>
				<tbody className="loc-stat-stat">
					<tr><td>Locations</td><td>{stats.TOTAL}</td></tr>
					<tr><td>Potential</td><td>{stats.POTENTIAL}</td></tr>
					<tr><td>Registered</td><td>{stats.REGISTERED}</td></tr>
					<tr><td>Utilization</td><td>{stats.UTILIZATION.toFixed(2)+'%'}</td></tr>
				</tbody>
			</table>
			<table className="loc-stat-tab" id="loc-stat-tab-view">
				<thead>
					<tr><th colSpan={2}>View</th></tr>
				</thead>
				<tbody className="loc-stat-view">
					<tr><td onClick={() => setViewX(1)} className={view===1?'loc-stat-view-selected':''}>Locations</td></tr>
					<tr><td onClick={() => setViewX(2)} className={view===2?'loc-stat-view-selected':''}>By Cities</td></tr>
				</tbody>
			</table>
		</div>
	);
};
