export const toIndianNumberSystem = (num: any) => {

  if (num) {
    const inputStr = num.toString();
    const [numStr, decimal] = inputStr.split(".");


    const formattedDecimal = decimal ? `.${decimal.substring(0, 2)}` : "";


    const croreRegex = /^(\d+)(\d{2})(\d{2})(\d{3})$/;
    const lakhRegex = /^(\d{1,2})(\d{2})(\d{3})$/;
    const thousandRegex = /^(\d{1,2})(\d{3})$/;

    let match;


    if (croreRegex.test(numStr)) {
      match = numStr.match(croreRegex);
      match?.shift();
      return `${match?.join(",")}${formattedDecimal} `;
    }


    if (lakhRegex.test(numStr)) {
      match = numStr.match(lakhRegex);
      match?.shift();
      return `${match?.join(",")}${formattedDecimal}`;
    }


    if (thousandRegex.test(numStr)) {
      match = numStr.match(thousandRegex);
      match?.shift();
      return `${match?.join(",")}${formattedDecimal}`;
    }


    return `${numStr}${formattedDecimal}`;
  }
  else {
    return num
  }

};
