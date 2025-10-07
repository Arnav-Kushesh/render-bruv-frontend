import { useEffect, useState } from "react";
import getUrlQuery from "../../../../controllers/getUrlQuery";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import styled from "styled-components";
import { MdDone } from "react-icons/md";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-weight: bold;
  font-size: 20px;

  padding: 20px 30px;
  border-radius: 20px;
  padding-bottom: 50px;
  width: 100%;
`;

const CardTitle = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const PlanName = styled.span`
  color: var(--accent);
  font-size: 19px;
  font-weight: 900;
  font-family: var(--headingFont);
  color: var(--element);
  text-align: center;
  text-transform: uppercase;
`;

const PriceTag = styled.div`
  color: var(--accentColor);
  font-size: 13px;
  font-weight: 700;
  /* font-family: var(--headingFont); */
  color: var(--accent);
  text-align: center;
  text-transform: capitalize;
  /* margin-bottom: 10px; */
  /* border-bottom: 2px solid; */
`;

const Icon = styled.div`
  background-color: var(--accent);
  color: var(--elementAlt);
  height: 100px;
  width: 100px;

  border-radius: 100px;
  font-size: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 10px; */
  /* margin-top: -3px; */
`;

export default function PaymentDone() {
  const [amountInCents, setAmountInCents] = useState(0);

  useEffect(() => {
    setAmountInCents(parseInt(getUrlQuery("amountInCents")));
  }, []);

  return (
    <LoggedInBoilerplate>
      <Center>
        <Card>
          <Icon>
            <MdDone />
          </Icon>

          <CardTitle>
            <PlanName>Payment Successful </PlanName>
            <PriceTag> Amount : ${amountInCents / 100}</PriceTag>
          </CardTitle>
        </Card>
      </Center>
    </LoggedInBoilerplate>
  );
}
