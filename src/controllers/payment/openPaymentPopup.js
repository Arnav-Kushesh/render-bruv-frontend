import PopupBuyTokens from "../../components/payments/PopupBuyTokens";

export default function openPaymentPopup(type) {
  return () => {
    window.setForm({
      title: `Buy ${type.toLowerCase()} tokens`,
      component: <PopupBuyTokens type={type} />,
    });
  };
}
