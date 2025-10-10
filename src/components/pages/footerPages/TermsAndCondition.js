import styled from "styled-components";
import FooterPageBoilerplate from "./FooterPageBoilerplate";
import parseDate from "../../../controllers/parseDate";

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

const List = styled.ul`
  padding-left: 1.25rem;
  margin: 8px 0 0 0;
`;

const Footer = styled.footer`
  margin-top: 26px;
  color: #6b7280;
  font-size: 13px;
`;

export default function TermsAndCondition() {
  return (
    <FooterPageBoilerplate title={null}>
      <Page>
        <Card>
          <Header>
            <Title>Terms and Conditions</Title>
            <Lead>
              Effective date: <strong>{parseDate(new Date())}</strong>
            </Lead>
            <Muted>
              These Terms and Conditions ("Terms") govern your use of the
              <strong> RenderBruv</strong> service ("Service"). By using our
              Service, you agree to these Terms.
            </Muted>
          </Header>

          <Section>
            <SectionTitle>1. Acceptance of Terms</SectionTitle>
            <p>
              By accessing or using RenderBruv, you agree to comply with and be
              bound by these Terms. If you do not agree, you may not use our
              Service.
            </p>
          </Section>

          <Section>
            <SectionTitle>2. Description of Service</SectionTitle>
            <p>
              RenderBruv provides cloud-based rendering services for Blender
              users. The Service allows users to upload projects for rendering
              and download the final output.
            </p>
          </Section>

          <Section>
            <SectionTitle>3. User Accounts</SectionTitle>
            <List>
              <li>
                You must provide a valid email address to create an account.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                You agree not to share your account with others or use it for
                unlawful purposes.
              </li>
            </List>
          </Section>

          <Section>
            <SectionTitle>4. Acceptable Use</SectionTitle>
            <p>You agree not to use RenderBruv to:</p>
            <List>
              <li>
                Upload or distribute malicious, harmful, or illegal content.
              </li>
              <li>
                Attempt to disrupt or damage RenderBruv systems or networks.
              </li>
              <li>
                Violate intellectual property or privacy rights of others.
              </li>
            </List>
          </Section>

          <Section>
            <SectionTitle>5. Ownership and Intellectual Property</SectionTitle>
            <p>
              You retain full ownership of your Blender projects and renders.
              RenderBruv does not claim any rights over your creative content.
              The Service, including its software and branding, remains the
              property of RenderBruv.
            </p>
          </Section>

          <Section>
            <SectionTitle>6. Limitation of Liability</SectionTitle>
            <p>
              RenderBruv provides the Service on an "as is" and "as available"
              basis. We make no warranties, expressed or implied. We are not
              liable for any damages resulting from use, inability to use, or
              performance of the Service.
            </p>
          </Section>

          <Section>
            <SectionTitle>7. Service Modifications</SectionTitle>
            <p>
              We reserve the right to modify, suspend, or discontinue the
              Service at any time without prior notice. We are not liable for
              any resulting loss or inconvenience.
            </p>
          </Section>

          <Section>
            <SectionTitle>8. Termination</SectionTitle>
            <p>
              We may suspend or terminate your account if you violate these
              Terms or misuse the Service. Upon termination, your access will be
              revoked and associated data may be deleted.
            </p>
          </Section>

          <Section>
            <SectionTitle>9. Governing Law</SectionTitle>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of your country or region of residence, unless otherwise
              required by law.
            </p>
          </Section>

          <Section>
            <SectionTitle>10. Contact Us</SectionTitle>
            <p>
              If you have any questions about these Terms, contact us at:{" "}
              <a href="mailto:hello@renderbruv.com">hello@renderbruv.com</a> or
              visit <a href="https://renderbruv.com">renderbruv.com</a>.
            </p>
          </Section>
        </Card>
      </Page>
    </FooterPageBoilerplate>
  );
}
