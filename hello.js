/*int to letter convertor*/

function unidad(nb){
	/*supposed to have only one didit number*/
	var tabUnidad = ['cero','uno','dos','tres','cuatro','cinco',
	'seis','siete','ocho','nueve'];
	if(nb<10){
			return tabUnidad[nb];
		}
}

function decena(nb){
	/*supposed to have only a two didit number*/
	var uni = nb%10;
	var decena = (nb%100 - uni)/10;

	var tabDecena = ['','dieci','veint','trei','cuar','cincu',
	'ses','set','och','nov'];

	var str = tabDecena[decena];


	if(decena===0)
		if(uni!==0)
			return(unidad(nb));
		else
			return '';
	else if(decena===1){
		switch (uni){
		case 0: return 'diez';
		case 1: return 'onze';
		case 2: return 'doce';
		case 3: return 'trece';
		case 4: return 'catorce';
		case 5: return 'quince';
		default:
			str = str+unidad(uni);
			return str;
		}
	}else if (decena===2){
		var str = (uni === 0)?
			str+'e':
			str+'i'+unidad(uni);
		return str;
	}else{
		str = str+'enta';
		str = uni!==0? 
			str +' y '+unidad(uni)
			:str;
		return str;
	}
}

function ciento(nb){
	/*supposed to have only a three didit number*/
	var uni = nb%10;
	var decen = (nb%100 - uni)/10;
	var ciento = (nb%1000 - decen*10- uni)/100;

	if(nb===100)
		return 'cien';

	/*pour déterminer la début d'une centaine*/
	var initCien;
	var str;	/*pour déterminer la terminason d'une centaine*/
	switch(ciento){
		case 0:
			str='';
		case 1:
			initCien = '';
			str = 'ciento';
			break;
		case 5:
			initCien = 'quin';
			str='entos';
			break;
		case 7: 
			initCien = 'sete';			initCien = unidad(ciento);
			break;
		case 9:
			initCien = 'nove';			initCien = unidad(ciento);
			break;
		default:
			initCien = unidad(ciento);
			str= 'cientos';
	}

	nb =nb-ciento*100;
	decenaStr = decena(nb);
	str = initCien + str;
	str = (decena===0&&uni===0)?
		str:
		str +' '+ decenaStr;


	return str;
}

function miles(nb){
	var uni = nb%10;
	var decen = (nb%100 - uni)/10;
	var cient = (nb%1000 - decen*10- uni)/100;
	var mil = (nb%10000 - cient*100  - decen*10- uni)/1000;

	var pre = (mil!==1&&mil!==0)?
		ciento((nb- cient*100  - decen*10- uni)/1000):'';

	return pre+' mil '+ciento(cient*100  + decen*10+ uni);
}

function millons(nb){
	var uni = nb%10;
	var decen = (nb%100 - uni)/10;
	var cient = math.floor(nb/100)%1000;
	var mil = (nb%10000 - cient*100  - decen*10- uni)/1000;
	var million = math.floor(nb/(10**6));

	var pre = (million!==0)?
		mil((nb-nb%(10**6))/10**6):'';

	var post = mil(nb-nb%(10**6));

	if(pre === 'uno')
		return 'un million ' + post;

	return pre+ ' milliones ' +post;
}


function hacerLaCadenaDeRespuesta(nb){
	/*nb is an integer*/
	if(nb >=1000){
		return miles(nb);
	}else if(nb>=100){
		return ciento(nb);
	}
	else if(nb >= 10){
 		return decena(nb);
	}
	else{
		return unidad(nb);
	}
}


var nb = prompt('ingrese un entero:');
nb = parseInt(nb);
alert(hacerLaCadenaDeRespuesta(nb));