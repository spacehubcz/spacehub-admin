import { useEffect, useRef } from "react";

export const InfoPane = ({txt}) => {
	const infoRef = useRef(null);
	setTimeout(function(){infoRef.current.style.display = "none";}, 5000);
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
		if (infoRef.current) infoRef.current.style.display = "";
	}, [txt])

	return (
		<div className={clsName} ref={infoRef}>
			{text}
		</div>
	);
}
