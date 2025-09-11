import { useEffect } from "react";
export const InfoPane = ({txt}) => {
	setTimeout(function(){document.getElementById('infoPaneDiv').style.display = "none";}, 5000);
	let stl = txt.slice(0, 2);
	let text = txt.slice(3);
	let clsName;
	switch (stl){
		case 'ok': clsName = "clsInfoPane clsInfoPaneOk"; break;
		case 'er': clsName = "clsInfoPane clsInfoPaneEr"; break;
		case 'in': clsName = "clsInfoPane clsInfoPaneIn"; break;
		default: 
			clsName = "clsInfoPane clsInfoPaneXx";
			text = txt;
	}

	useEffect(() => {
		document.getElementById('infoPaneDiv').style.display = "";
	}, [txt])

	return (
		<div className={clsName} id="infoPaneDiv">
			{text}
		</div>
	);
}
