import './styles/Users.css';
import { useState, useEffect } from 'react';
import { User } from './User';

export const Users = ({ setDetail, setStatistics }) => {
	const [users, setUsers] = useState([]);
	const [sort, setSort] = useState(0);

	const fetchData = async () => {
		try {
			const response = await fetch('https://www.spacehub.cz/APIv01/get_users.php');
			const usrs = await response.json();
			setUsers(usrs.USERS);
		}
		catch (error) {
			console.error('This is the error: , ', error);
			return {};
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const sortUsers = (s) => {
		if (Math.abs(sort) === s) s = sort * -1;
		setSort(s);
		switch (s)
		{
			default:
			case -1:	setUsers([...users].sort((a, b) => b.SPACES - a.SPACES)); break;
			case 1:		setUsers([...users].sort((a, b) => a.SPACES - b.SPACES)); break;
			case -2:	setUsers([...users].sort((a, b) => b.NAME.localeCompare(a.NAME))); break;
			case 2:		setUsers([...users].sort((a, b) => a.NAME.localeCompare(b.NAME))); break;
			case -3:	setUsers([...users].sort((a, b) => b.CITY.localeCompare(a.CITY))); break;
			case 3:		setUsers([...users].sort((a, b) => a.CITY.localeCompare(b.CITY))); break;
			case -4:	setUsers([...users].sort((a, b) => b.STREET.localeCompare(a.STREET))); break;
			case 4:		setUsers([...users].sort((a, b) => a.STREET.localeCompare(b.STREET))); break;
			case -5:	setUsers([...users].sort((a, b) => b.OFFER - a.OFFER)); break;
			case 5:		setUsers([...users].sort((a, b) => a.OFFER - b.OFFER)); break;
			case -6:	setUsers([...users].sort((a, b) => b.ACTIVE - a.ACTIVE)); break;
			case 6:		setUsers([...users].sort((a, b) => a.ACTIVE - b.ACTIVE)); break;
		}
	}

	const clearAllUserFlags = () => {
		fetch('https://www.spacehub.cz/APIv01/set_user_flags_0.php')
			.then(r => r.json())
			.then(r => {
				fetchData()
			})
			.catch(err => console.error('Error', err));
	}

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
							<th onClick={() => sortUsers(1)} >Spaces {(sort===1)?'\u25B2':(sort===-1)?'\u25BC':''}</th>
							<th onClick={() => sortUsers(2)} >Name {(sort===2)?'\u25B2':(sort===-2)?'\u25BC':''}</th>
							<th onClick={() => sortUsers(3)} >City {(sort===3)?'\u25B2':(sort===-3)?'\u25BC':''}</th>
							<th onClick={() => sortUsers(4)} >Address {(sort===4)?'\u25B2':(sort===-4)?'\u25BC':''}</th>
							<th onClick={() => sortUsers(5)} >Offered {(sort===5)?'\u25B2':(sort===-5)?'\u25BC':''}</th>
							<th onClick={() => sortUsers(6)} >Flags {(sort===6)?'\u25B2':(sort===-6)?'\u25BC':''}</th>
							<th>Detail</th>
						</tr>
					</thead>
					<tbody>
						{
							users.map(user => <User key={user.ID} user={user} setDetail={setDetail}/>)
						}
					</tbody>
				</table>
				<button onClick={clearAllUserFlags}>Clear All Users FLAGS</button>
			</div>
		</div>
    );
    
};
