import CompanyTransactionAggregator from "../../../../applicationUI/aggregator/CompanyTransactionAggregator";

export default function AdminAllCompanyTransactions() {
  return (
    <CompanyTransactionAggregator columns={1} tableViewSettings={"TABLE"} />
  );
}
