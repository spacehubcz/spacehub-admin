import React, { useEffect, useState } from 'react'

export const Attendance = () => {
    const [scans, setScans] = useState([])

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
                if (r.sts === 'OK') {
                    setScans(r.statistics)
                }
            })
            .catch(err => console.error('Error fetching statistics: ', err))
    }, [])

    const Scan = ({ sc }) => (
        <tr className='usr-row'>
            <td className='rowNum'>{sc.IP}</td>
            <td className='rowNum'>{sc.NAME}</td>
            <td className='rowNum'>{sc.GPS}</td>
            <td className='rowNum'>{sc.TIME}</td>
        </tr>   
    )

    return (
        <div className='usr-main'>
			<div className='usr-filter'>&nbsp;
				{
                    // filter
				}
			</div>
			<div className='usr-body'>
				<table className='usr-tab'>
					<thead>
						<tr key={0}>
							<th>IP</th>
							<th>NAME</th>
                            <th>GPS</th>
							<th>TIME</th>
						</tr>
					</thead>
					<tbody>
						{
							scans.map((sc, idx) => <Scan key={idx} sc={sc} />)
						}
					</tbody>
				</table>
			</div>
		</div>
    )
}
