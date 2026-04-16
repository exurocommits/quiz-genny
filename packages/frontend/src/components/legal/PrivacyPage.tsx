import React from 'react';

const privacyMarkdown = `
# Privacy Policy

**Effective Date:** February 21, 2026

---

## 1. Introduction

Quiz Genny ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Service.

---

## 2. Information We Collect

### 2.1 Account Information
When you create an account, we collect:
- Name and email address
- Password (encrypted)
- Profile information (optional)

### 2.2 Usage Data
We automatically collect:
- Quiz generation history
- Export preferences
- Account activity logs
- Device information (browser type, operating system)
- IP address and location data (approximate)

### 2.3 Payment Information
For paid subscriptions:
- Payment method (processed securely via Stripe)
- Billing address
- Transaction history
- We do not store full credit card numbers

### 2.4 Cookies and Tracking
We use:
- Essential cookies for authentication
- Analytics cookies to understand usage patterns
- Session cookies for maintaining login state

---

## 3. How We Use Your Information

### 3.1 Primary Uses
- Provide and maintain the Service
- Generate and store your quizzes
- Process payments and subscriptions
- Send important account notifications
- Provide customer support
- Improve and develop the Service

### 3.2 Analytics
- Analyze usage patterns
- Improve user experience
- Identify trends and insights
- Debug technical issues

### 3.3 Communication
- Send you updates about the Service
- Notify you of subscription changes
- Respond to your inquiries and support requests
- Send marketing communications (with your consent)

---

## 4. Data Storage & Security

### 4.1 Storage Locations
- User data: Supabase (hosted in EU/US regions)
- Payment data: Stripe (PCI DSS compliant)
- Generated content: Supabase storage

### 4.2 Security Measures
- Encryption at rest and in transit (HTTPS/TLS)
- Secure password hashing (bcrypt)
- Regular security audits
- Access controls and authentication
- Third-party security certifications

### 4.3 Data Retention
- Account data: Retained until account deletion
- Generated quizzes: Retained until account deletion or manual deletion
- Payment records: Retained for 7 years (legal requirement)
- Analytics data: Retained for 24 months

---

## 5. Data Sharing

### 5.1 Third-Party Services
We share data with:
- **Supabase**: Database and authentication
- **Stripe**: Payment processing
- **OpenAI**: AI content generation (questions, sections)
- **Google**: Google Slides API integration (when used)

### 5.2 No Sale of Data
- We never sell your personal data
- We never rent your personal data
- We do not share data for advertising purposes

### 5.3 Legal Requirements
We may disclose data when required by law:
- To comply with legal obligations
- To protect our rights and property
- To prevent fraud or abuse
- To ensure user safety

---

## 6. Your Rights

### 6.1 Access Rights
You have the right to:
- Access your personal data
- Request a copy of your data
- Update or correct your data
- Delete your account and data

### 6.2 Data Portability
- You can export all your quizzes
- You can download your data in machine-readable format
- You can transfer your data to another service

### 6.3 Opt-Out Rights
- Opt-out of marketing emails
- Disable analytics cookies
- Delete your account at any time

---

## 7. Children's Privacy

- Our Service is not intended for children under 13
- We do not knowingly collect personal data from children
- If we become aware of data collection from children, we will delete it

---

## 8. International Data Transfers

Your data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy and applicable laws.

---

## 9. Updates to Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of material changes by:
- Posting the updated policy on our website
- Sending you an email if you have an account

Continued use of the Service after changes constitutes acceptance of the updated policy.

---

## 10. GDPR Compliance

If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):

### 10.1 Lawful Basis for Processing
- **Contract**: Providing the Service
- **Legitimate Interest**: Improving our Service and security
- **Consent**: Marketing communications and analytics

### 10.2 Your GDPR Rights
- Right to be informed
- Right of access
- Right to rectification
- Right to erasure ("right to be forgotten")
- Right to restrict processing
- Right to data portability
- Right to object

### 10.3 Data Protection Officer
For GDPR inquiries, contact: hey@tomoliver.me

---

## 11. California Privacy Rights

If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):

- Right to know what personal data we collect
- Right to know if we sell or disclose personal data
- Right to delete personal data
- Right to opt-out of the sale of personal data
- Right to non-discrimination for exercising rights

We do not sell your personal data.

---

## 12. Security Breach Notification

In the event of a data breach involving your personal information:
- We will notify you within 72 hours of discovery
- We will describe what information was involved
- We will explain what steps we are taking
- We will provide guidance on protecting yourself

---

## 13. Contact Information

For privacy-related questions or to exercise your rights:

**Quiz Genny Privacy**
Email: hey@tomoliver.me
Website: [your-website-url]
Mailing Address: [Your Address]

---

*Last Updated: February 21, 2026*
`;

const PrivacyPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div
        dangerouslySetInnerHTML={{
          __html: privacyMarkdown
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />')
        }}
      />
    </div>
  );
};

export default PrivacyPage;
