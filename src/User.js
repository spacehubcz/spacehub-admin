import { useState } from "react";
import { UserDetail } from "./UserDetail";

export const User = ({user, setdetail}) => {
	let [expandRow, setExpandRow] = useState(false);

	let rqe = require("./img/detailw.png");
	return (
		<>		
		<tr className='usr-row'>
			<td><div className='loc-row-big-nr' onClick={() => setExpandRow(!expandRow)} >{user.SPACES}</div></td>
			<td className='loc-row-bold'>{(user.NAME>' ')?user.NAME:user.USERNAME}</td>
			<td>{user.CITY}</td>
			<td>{user.STREET}</td>
			<td className='rowNum'>{user.OFFER}</td>
			<td className='rowNum'>{user.FLAGS}</td>
			<td><img className="loc-row-img" src={rqe} onClick={() => setExpandRow(!expandRow)} alt="edit" /></td>
		</tr>
		{expandRow && <UserDetail user_id={user.ID} setdetail={setdetail} />}
		</>
	);
};
