
export const Statistics = ({statist, showcitiesmap}) => {

	return (
		<>
		<table className="stat-tab">
			<thead>
				<tr><th colSpan={4}>Statistics</th></tr>
			</thead>
			<tbody>
				<tr><td>Locations</td><td>{statist.LOCATIONS ?? '---'}</td><td>Potential</td><td>{statist.NUM_OF_SPACES ?? '---'}</td></tr>
				<tr><td>Spaces</td><td>{statist.SPACES ?? '---'}</td><td>Owners</td><td>{statist.OWNERS ?? '---'}</td></tr>
				<tr><td>Offers</td><td>{statist.OFFERS ?? '---'}</td><td>Active</td><td>{statist.ACTIVE ?? '---'}</td></tr>
				<tr><td>Cities</td><td>5</td><td colSpan={2} className="stat-tab-city" onClick={() => showcitiesmap(true)}>Show Map</td></tr>
			</tbody>
		</table>
		</>
	);
};