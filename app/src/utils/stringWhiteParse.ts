import twoDigits from "./twoDigits";

const stringWhiteParse =  (val: number = 0): string => {
	const isNegative = val < 0;
	const absValue = Math.abs(val);
	if (absValue < 1000) return `${absValue}`;
	const parts = `${absValue}`.toString().split(`.`);
    return `${isNegative ? `-` : ``}${(+parts[0]).toLocaleString().replace(/\D/g, `\u00A0`)}${parts[1] ? `.${twoDigits(+parts[1])}` : ``}`;
};

export default stringWhiteParse;