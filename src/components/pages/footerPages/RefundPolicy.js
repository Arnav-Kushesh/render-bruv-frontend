import styled from "styled-components";
import FooterPageBoilerplate from "./FooterPageBoilerplate";

const Page = styled.div`
  min-height: 100vh;
  /* background: #f7fafc; */
  color: #0f172a;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial;
  padding: 48px 24px;
  display: flex;
  justify-content: center;
`;

const Card = styled.article`
  width: 100%;
  max-width: 880px;
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);
`;

const Header = styled.header`
  margin-bottom: 12px;
`;

const Title = styled.h1`
  margin: 0 0 6px 0;
  font-size: 28px;
`;

const Lead = styled.p`
  margin: 0;
  color: #6b7280;
`;

const Section = styled.section`
  margin-top: 22px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

const Muted = styled.p`
  color: #6b7280;
  font-size: 14px;
`;

const Footer = styled.footer`
  margin-top: 26px;
  color: #6b7280;
  font-size: 13px;
`;

export default function RefundPolicy() {
  return (
    <FooterPageBoilerplate title={null}>
      <Page>
        <Card>
          <Header>
            <Title>Refund Policy</Title>
            <Lead>
              Effective date: <strong>REPLACE_WITH_EFFECTIVE_DATE</strong>
            </Lead>
            <Muted>
              This Refund Policy explains the rules regarding refunds for
              RenderBruv services.
            </Muted>
          </Header>

          <Section>
            <SectionTitle>1. No Refunds</SectionTitle>
            <p>
              RenderBruv does <strong>not provide refunds</strong> for any
              payments made for our services. By purchasing or using our
              Service, you agree that all transactions are final.
            </p>
          </Section>

          <Section>
            <SectionTitle>2. Responsibility</SectionTitle>
            <p>
              It is your responsibility to review your account, rendering jobs,
              and purchase decisions carefully before making any payment. We are
              not responsible for accidental, mistaken, or unauthorized charges.
            </p>
          </Section>

          <Section>
            <SectionTitle>3. Contact Us</SectionTitle>
            <p>
              If you have questions regarding this policy, you can contact us
              at: <a href="mailto:hello@renderbruv.com">hello@renderbruv.com</a>{" "}
              or visit <a href="https://renderbruv.com">renderbruv.com</a>.
            </p>
          </Section>
        </Card>
      </Page>
    </FooterPageBoilerplate>
  );
}
