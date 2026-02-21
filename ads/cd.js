var a=encodeURIComponent||escape;

try{afgSeq++;}catch(e){afgSeq=1;}

try{
	if (typeof(afg) == "undefined")
		afg = {};

	afg.url = "//www.adforgames.com/cd.php?v=1&seq=" + afgSeq + "&aid=" + Math.random();

	if (afg.u == undefined)
		afg.u = 0;
	if (afg.s == undefined)
		afg.s = 1;

	switch(afg.s){
		case 2:
			afg.w = afg.h = 80;
			break;
		case 3:
			afg.w = 468; afg.h = 60;
			break;
		case 4:
			afg.w = 728; afg.h = 90;
			break;
		case 5:
			afg.w = 160; afg.h = 600;
			break;
		case 6:
			afg.w = 120; afg.h = 600;
			break;
		case 7:
			afg.w = 300; afg.h = 250;
			break;
		case 8:
			afg.w = 125; afg.h = 125;
			break;
		case 9:
			afg.w = 336; afg.h = 280;
			break;
		case 10:
			afg.w = 300; afg.h = 600;
			break;
		case 21:
			afg.w = 336; afg.h = 768;
			if (afg.centerWidth == undefined)
				afg.centerWidth = 1000;
			if (afg.topPos == undefined)
				afg.topPos = 0;
			if (afg.zIndex == undefined)
				afg.zIndex = 99;
			if (afg.fixed == undefined)
				afg.fixed = true;
			break;
		case 31:
			afg.w = 728; afg.h = 90;
			break;
		case 1:
		default:
			afg.w = afg.h = 100;
	}

	afg.url += "&n=" + afg.u + "&size=" + afg.s;
} catch(e) {
	;
}

afgCode = "<iframe src='#url#' width='" + afg.w + "' height='" + afg.h + "' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no' allowtransparency='true'></iframe>";
if (afg.s != 21){
	if (afg.anchor != undefined && afg.anchor == 'bottom'){
		document.write('<div id="afg_anchor" style="position:fixed; z-index=99; margin:auto; bottom:0; left:0; right:0; width:' + afg.w + 'px; height:' + afg.h + 'px;">');
		document.write('<div style="position:absolute; z-index=99; top:-10px; right:-10px; width:30px; height:30px; border-radius:15px; font:22px/30px Tahoma; text-align:center; background:#333; color:#fff; cursor:pointer;" onclick="this.parentNode.style.display=\'none\';">Ã—</div>');
		document.write(afgCode.replace('#url#', afg.url));
		document.write('</div>');
	}else{
		document.write(afgCode.replace('#url#', afg.url));
	}
}else{
	document.write('<div id="afg_siteskin_left" style="visibility:hidden; overflow:hidden; position:' + (afg.fixed?'fixed':'absolute') + '; top:' + afg.topPos + 'px; left:0px; z-index:' + afg.zIndex + '; width:100%; height:768px;"><div style="visibility:visible; position:absolute; left:50%; margin-right:0px; margin-left:-' + (afg.centerWidth/2+336) + 'px;">' + afgCode.replace('#url#', afg.url + "&siteskin=l") + '</div></div>');
	document.write('<div id="afg_siteskin_right" style="visibility:hidden; overflow:hidden; position:' + (afg.fixed?'fixed':'absolute') + '; top:' + afg.topPos + 'px; right:0px; z-index:' + afg.zIndex + '; width:100%; height:768px;"><div style="visibility:visible; position:absolute; left:50%; margin-right:0px; margin-left:' + (afg.centerWidth/2) + 'px;">' + afgCode.replace('#url#', afg.url + "&siteskin=r") + '</div></div>');
}
