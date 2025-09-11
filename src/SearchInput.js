import { useEffect, useState } from "react";
import './Search.css'

export const SearchInput = ({locList, id, setSelLocId}) => {

	const [selLocation, setSelLocation] = useState('');
	const [list, setList] = useState([]);
	const [items, setItems] = useState('');

	const selectItem = (txt, id) => {
		setSelLocation(txt);
		setItems('');
		setSelLocId(id);
	}

	useEffect(() => {
		let itms = '';
		if (list.length)
		{
			itms = (
			<ul>
				{list.map(ml => {
					let txt = ml.TXT;
					return <li key={ml.ID} onClick={() => selectItem(txt, ml.ID)}>{txt}</li>
				})}
			</ul>
			);
		}
		setItems(itms);
	}, [list]);

	const setSelectedLocation = () => {
		locList.forEach(element => {
			if (element.ID === id)
			{
				selectItem(element.TXT, id);
				return;
			}
		});
	}

	useEffect(() => {
		setSelectedLocation();
	}, [locList, id]);

	const inputChange = (kw) => {
		setSelLocation(kw);
		setList(locList.filter(item => {
			let itl = item.TXT.toLowerCase();
			// tady je nahrade ceskych znaku za znaky bez diakritiky, aby se dalo vyhledavat bez diakritiky
			// nevim jak to funguje, ale funguje to. Vsechno je prevedeno na male pismena, takze velke neni treba zadavat.
			const itc = [["č", "c"], ["š", "s"], ["é", "e"], ["ě", "e"], ["á", "a"], ["í", "i"], ["ř", "r"], ["ž", "z"], ["ý", "y"], ["ó", "o"]];
			const eng = itc.reduce(
				(str, [target, itc]) =>
					str.split(target).join(itc),
				itl
			);
			kw = kw.toLowerCase();
			return (itl.includes(kw)) || (eng.includes(kw));
		}));
	}

	const clearInputText = () => {
		setSelLocation('');
		document.getElementById("search-input").focus();
		inputChange('');
	}

	const keyupInputText = (event) => {
		switch(event.key)
		{
			case 'Escape':
				setSelectedLocation();
				break;
			case 'ArrowDown':
				setList(locList);
				break;
			default:;
		}
		console.log(event.key)
	}

	return (
		<>
		<div className='search-box'>
			<div className="search-row">
				<input type='text' id='search-input' placeholder='Search Location' autoComplete='off' 
					onInput={(e) => inputChange(e.target.value)} value={selLocation} onKeyUp={keyupInputText} />
				<button className="search-btn" onClick={clearInputText}>&#215;</button>
			</div>
			<div className="search-result">{items}</div>
		</div>
		</>
	);
};