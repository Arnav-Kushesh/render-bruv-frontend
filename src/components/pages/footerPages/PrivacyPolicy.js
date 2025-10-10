import FooterPageBoilerplate from "./FooterPageBoilerplate";
import React from "react";
import styled from "styled-components";
import parseDate from "../../../controllers/parseDate";

// RenderBruv Privacy Policy - React component using styled-components
// Replace placeholders: EFFECTIVE_DATE, CONTACT_EMAIL, WEBSITE_URL

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

export default function PrivacyPolicy() {
  return (
    <FooterPageBoilerplate title={null}>
      <Page>
        <Card>
          <Header>
            <Title>Privacy Policy</Title>
            <Lead>
              Effective date: <strong>{parseDate(new Date())}</strong>
            </Lead>
            <br />
            <Muted>
              This Privacy Policy describes how <strong>RenderBruv</strong>{" "}
              ("we", "us", "our") collects and uses information when you use our
              Blender render farm service.
            </Muted>
            <br />
          </Header>

          <Section>
            <SectionTitle>1. Information We Collect</SectionTitle>
            <p>
              We only collect <strong>your email address</strong> for
              authentication and account management. We do not collect names,
              addresses, payment information, or project files as part of our
              default data collection.
            </p>
          </Section>

          <Section>
            <SectionTitle>2. How We Use Your Email</SectionTitle>
            <List>
              <li>Create and manage your RenderBruv account</li>
              <li>Authenticate sign-ins and password resets</li>
              <li>Send essential account and security-related notices</li>
            </List>
            <Muted>
              We do not use your email for marketing or promotional messages
              unless you explicitly opt in.
            </Muted>
          </Section>

          <Section>
            <SectionTitle>3. Data Sharing & Third Parties</SectionTitle>
            <p>
              We may use third-party providers (for hosting, email delivery,
              authentication, etc.) to operate the service. These providers are
              contractually required to protect your data and only process it as
              necessary to provide their services.
            </p>
          </Section>

          <Section>
            <SectionTitle>4. Data Security</SectionTitle>
            <p>
              We implement reasonable administrative, technical, and physical
              safeguards to protect the information we collect. Data in transit
              is encrypted using industry-standard protocols.
            </p>
          </Section>

          <Section>
            <SectionTitle>5. Data Retention</SectionTitle>
            <p>
              We retain your email address for as long as your account exists.
              If you delete your account, we will remove your email and
              associated account data within a reasonable time period, except
              where retention is required by law.
            </p>
          </Section>

          <Section>
            <SectionTitle>6. Your Rights</SectionTitle>
            <p>
              You may request access to, correction of, or deletion of your
              email address. To exercise these rights, contact us at the email
              address below.
            </p>
          </Section>

          <Section>
            <SectionTitle>7. Children</SectionTitle>
            <p>
              Our service is not directed to children under 13. We do not
              knowingly collect personal information from children under 13.
            </p>
          </Section>

          <Section>
            <SectionTitle>8. Changes to This Policy</SectionTitle>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will post the updated policy and change the effective date
              above.
            </p>
          </Section>

          <Section>
            <SectionTitle>9. Contact Us</SectionTitle>
            <p>
              If you have questions or requests about this policy, contact us
              at: <a href="mailto:hello@renderbruv.com">hello@renderbruv.com</a>{" "}
              or visit <a href="https://renderbruv.com">renderbruv.com</a>.
            </p>
          </Section>
        </Card>
      </Page>
    </FooterPageBoilerplate>
  );
}
