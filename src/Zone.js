import React, { useEffect, useState } from 'react'
import { FaCampground, FaPlane } from 'react-icons/fa'

export default function Zone({ setActiveZone, lon, lat, size, lid }) {
    const zoom = (size < 251) ? 18 : (size < 501) ? 17 : 18
    const baseSize = (size < 251) ? 250 : (size < 501) ? 500 : 1000 //adjust in the near future
    const adjustSize = Math.floor(600*size/baseSize)

    const ground = `https://api.mapy.cz/v1/static/map?lon=${lon}&lat=${lat}&zoom=${zoom}&width=${adjustSize}&height=${adjustSize}&scale=1&mapset=basic&markers=color:red;size:normal;label:1;16.4,49.4&apikey=fkCf-F6Pxf7bjiTKHIDo5k9i2xEBjUNSgvzaDeQck50`
    const fly = `https://api.mapy.cz/v1/static/map?lon=${lon}&lat=${lat}&zoom=${zoom}&width=${adjustSize}&height=${adjustSize}&scale=1&mapset=aerial&markers=color:red;size:normal;label:1;16.4,49.4&apikey=fkCf-F6Pxf7bjiTKHIDo5k9i2xEBjUNSgvzaDeQck50`

    const [circles, setCircles] = useState([])
    const [spacemap, setSpacemap] = useState(true)

    useEffect(() => {
        const url = 'https://www.spacehub.cz/APIv01/get_zones.php'

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                lid,
            })
        })
            .then(r => r.json())
            .then(r => {
				console.log('response: ', JSON.stringify(r))
                if ('OK' === r.sts) {
                    let zones = []
                    r.zones.forEach((z, idx) => {
                        const x = 100*z.X/size
                        const y = -100*z.Y/size
                        const r = 100*z.R/size
                        const name = z.NAME
                        const ch = z.CH
                        zones.push({id: idx, x, y, r, name, ch})
                    })
                    setCircles(zones)
                }
            })
            .catch(err => {});
    }, [])

    return (
        <div className="login-bg superficial" style={{position: 'absolute', zIndex: 99, backgroundColor: 'blue', borderRadius: '0.5em'}} >
			<div className='login-blue blue-zone' >
                <div className='login-lem' style={{padding: '0.5rem'}}>
                    <div className='login-cls' onClick={() => setActiveZone(false)}>&#10005;</div>
                    <div className='login-inn zone-log' style={{display: 'flex', gap: '0.5rem', alignItems: 'center', width: '100%'}}>
                        <div>
                            <div style={{overflow: 'hidden', position: 'relative', aspectRatio: 1, marginTop: '6px'}}>
                                {
                                    circles.map(circ => (
                                        <div style={{
                                            position: 'absolute',
                                            left: `${50 + circ.x - circ.r}%`,
                                            top: `${50 + circ.y - circ.r}%`,
                                            width: `${2*circ.r}%`,
                                            height: `${2*circ.r}%`,
                                            borderRadius: "50%",
                                            backgroundColor: `rgba(0, 255, 0, 0.1)`,
                                            border: `${circ.show ? '3' : '2'}px solid rgba(0, 255, 0, 0.3)`,
                                            pointerEvents: 'none',
                                            fontSize: '1.5rem',
                                            color: 'black',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }} key={circ.id}>{circ.ch}</div>
                                    ))
                                }
                                <img src={spacemap ? ground : fly} alt='spacemap' className='zone-image' />
                            </div>
                        </div>
                        <div className='zone-btns'>
                            <div className="park-car-input zone-btn" disabled={!spacemap} onClick={() => setSpacemap(false)} >
                                <FaPlane size={32} />Použít leteckou mapu
                            </div>
                            <div className="park-car-input zone-btn" disabled={spacemap} onClick={() => setSpacemap(true)} >
                                <FaCampground size={32} />Použít základní mapu
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
    )
}
