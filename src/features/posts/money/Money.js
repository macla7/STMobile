import React from "react";
import { Text } from "native-base";

function Money(props) {
  function dollarsFromMicro(microDollars) {
    if (microDollars < 0) {
      return Math.ceil(microDollars / 1000000);
    } else {
      return Math.floor(microDollars / 1000000);
    }
  }

  function centsFromMicro(microDollars) {
    let dollarsAndCents = microDollars / 10000 + "";
    let cents = dollarsAndCents.slice(-2);
    return parseInt(cents);
  }

  function handleMoneyText(type, money) {
    if (type == "cents") {
      return createCentsText(money);
    }
    return createDollarsText(money);
  }

  function createDollarsText(dollars) {
    if (dollars < 0) {
      return "$" + dollars * -1;
    }
    return "$" + dollars;
  }

  function createCentsText(cents) {
    if (cents == 0) {
      return "00";
    } else if (cents == 5) {
      return "05";
    }
    return cents;
  }

  return (
    <Text color={props.color ? props.color : ""}>
      {handleMoneyText("dollars", dollarsFromMicro(props.microDollars))}
      {/* {handleMoneyText("cents", centsFromMicro(props.microDollars))} */}
    </Text>
  );
}

export default Money;
