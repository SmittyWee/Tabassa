import { UmmalQura_metadata } from "./constant";

function div(a: number, b: number) {
	return ~~(a / b)
}

function mod(a: number, b: number) {
	return a - ~~(a / b) * b
}

function newMoonIndex(hy: number, hm: number) {
	var cYears = hy - 1,
		totalMonths = (cYears * 12) + 1 + (hm - 1),
		i = totalMonths - 16260
	return i
}

function newMoonFromJulian(mjdn: number) {
	for (var i = 0; i < UmmalQura_metadata.length; i=i+1) {
		if (UmmalQura_metadata[i] > mjdn) return i;
	}

	return 0;
}

/**
 * 
 * @param gy Gregorian year
 * @param gm Gregorian month [0 - 11]
 * @param gd Gregorian date
 * @returns 
 */
export function toHijriyah(gy: number, gm: number, gd: number) {
	let nmj, mjdn, pjdn, jdn, totalMonths, cYears, hy, hm, hd;
	gm = gm + 1;
	jdn = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod(gm + 9, 12) + 2, 5) + gd - 34840408;
	pjdn = jdn - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752; // parsed julian date
	mjdn = pjdn - 2400000;
	nmj = newMoonFromJulian(mjdn);
	totalMonths = nmj + 16260;
	cYears = Math.floor((totalMonths - 1) / 12);
	hy = cYears + 1;
	hm = totalMonths - 12 * cYears ;
	hd = mjdn - UmmalQura_metadata[nmj - 1] + 1;
	hm = hm - 1;

	return {
		hy: hy,
		hm: hm,
		hd: hd
	}
}

/**
 * 
 * @param hy Hijriyah year [1356 - 1500]
 * @param hm Hijriyah month [ 0 - 11 ]
 * @param hd Hijriyah date
 * @returns 
 */
export function toGregorian(hy: number, hm: number, hd: number) {
	let nmj, mjdn, jdn, j, i, gd, gm, gy;
	hm = hm + 1;
	nmj = newMoonIndex(hy, hm);
	mjdn = hd + UmmalQura_metadata[nmj - 1] - 1;
	jdn = mjdn + 2400000;
	j = 4 * jdn + 139361631;
	j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
	i = div(mod(j, 1461), 4) * 5 + 308;
	gd = div(mod(i, 153), 5) + 1;
	gm = mod(div(i, 153), 12) + 1;
	gy = div(j, 1461) - 100100 + div(8 - gm, 6);
	gm = gm - 1;

	return {
		gy: gy,
		gm: gm,
		gd: gd
	}
}