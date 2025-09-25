export default function calculateActivityRechargeTotal({
  rechargeDoc,
  activityTypes,
}) {
  let val = 0;

  for (let type in rechargeDoc) {
    let specificType = rechargeDoc[type];

    for (let activityTypeID in specificType) {
      let quantity = specificType[activityTypeID];
      let price = getPrice({ type, activityTypeID });
      val += quantity * price;
    }
  }

  return val;

  function getPrice({ type, activityTypeID }) {
    let activityType = activityTypes[activityTypeID];

    if (type == "SOLO") {
      return activityType.price;
    } else if (type == "PAIR") {
      return activityType.pairPrice;
    } else if (type == "TRIO") {
      return activityType.trioPrice;
    }
  }
}
