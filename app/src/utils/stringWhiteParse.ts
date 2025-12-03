import twoDigits from "./twoDigits";

const stringWhiteParse =  (val: number = 0): string => {
	if (val < 1000) return `${val}`;
	const parts = `${val}`.toString().split(`.`);
    return `${(+parts[0]).toLocaleString().replace(/\D/g, `\u00A0`)}${parts[1] ? `.${twoDigits(+parts[1])}` : ``}`;
};

export default stringWhiteParse;
