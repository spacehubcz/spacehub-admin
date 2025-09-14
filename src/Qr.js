import React, { useEffect, useState } from 'react'

export const Qr = () => {
    const [scans, setScans] = useState([])

    useEffect(() => {
        fetch('https://www.spacehub.cz/APIv01/get_qr.php')
            .then(r => r.json())
            .then(r => {
                if (r.sts === 'OK') {
                    setScans(r.qrc)
                }
            })
            .catch(err => console.error('Error fetching scans:', err))
    }, [])

    const Scan = ({sc}) => (
        <tr className='usr-row'>
            <td className='rowNum'>{sc.IP}</td>
            <td className='rowNum'>{sc.SRC}</td>
            <td className='rowNum'>{sc.CNT}</td>
            <td className='rowNum'>{sc.LAST_TIME}</td>
        </tr>   
    )

    return (
        <div className='usr-main'>
			<div className='usr-filter'>&nbsp;
				{// prostor pro filter nebo tak neco 
				}
			</div>
			<div className='usr-body'>
				<table className='usr-tab'>
					<thead>
						<tr key={0}>
							<th>IP</th>
							<th>SRC</th>
							<th>CNT</th>
							<th>LAST TIME</th>
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
