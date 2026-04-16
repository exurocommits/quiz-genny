import React from 'react';

const termsMarkdown = `
# Terms of Service

**Effective Date:** February 21, 2026

---

## 1. Acceptance of Terms

By accessing or using Quiz Genny ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.

---

## 2. Description of Service

Quiz Genny is an AI-powered platform that generates quiz presentations for educational, corporate, and entertainment purposes. The Service uses artificial intelligence to create questions, organize content, and export to various formats.

---

## 3. User Accounts

### 3.1 Account Creation
- You must be at least 18 years old to create an account
- You must provide accurate, complete, and current information
- You are responsible for maintaining the confidentiality of your account
- You agree to notify us immediately of any unauthorized use

### 3.2 Account Security
- You are responsible for all activities that occur under your account
- Quiz Genny is not liable for any loss or damage arising from unauthorized account access
- We reserve the right to suspend or terminate accounts that violate these Terms

---

## 4. Subscription Plans & Billing

### 4.1 Free Tier
- 1 quiz per month
- Watermark on exports
- Standard export formats (PPTX)
- Basic support

### 4.2 Pro Tier ($19/month)
- 20 quizzes per month
- No watermark
- All export formats (PPTX, PDF, Google Slides)
- Priority support
- Access to premium features

### 4.3 Team Tier ($49/month)
- Unlimited quizzes
- No watermark
- All export formats
- Team collaboration features
- Custom branding
- Dedicated support
- API access (upon request)

### 4.4 Billing Terms
- Subscriptions are billed monthly
- Charges occur on the same day each month
- You may cancel at any time; cancellation takes effect at the end of the current billing period
- No refunds for partial months
- All prices are in USD

---

## 5. Acceptable Use Policy

### 5.1 Permitted Use
- Creating quizzes for educational purposes
- Creating quizzes for corporate training
- Creating quizzes for entertainment
- Personal and commercial use within your subscription limits

### 5.2 Prohibited Use
- Generating quizzes with illegal, harmful, or offensive content
- Reselling or redistributing generated content as your own AI tool
- Using the Service for any illegal purpose
- Attempting to circumvent usage limits
- Reverse engineering the Service
- Using automated tools to access the Service

### 5.3 Content Guidelines
- You are responsible for all content generated using the Service
- Do not generate content that violates any applicable law
- Do not generate content that is defamatory, abusive, or discriminatory
- We reserve the right to remove or block content that violates these guidelines

---

## 6. Intellectual Property

### 6.1 Your Content
- You retain ownership of all quizzes you create using the Service
- You grant Quiz Genny a license to store and process your content to provide the Service
- You represent and warrant that you have all necessary rights to use any content you provide

### 6.2 Quiz Genny Content
- The Service, including its design, features, and AI models, is owned by Quiz Genny
- You may not copy, modify, or distribute any part of the Service without permission
- The "Quiz Genny" name and logo are trademarks of Quiz Genny

### 6.3 Third-Party Content
- Some features may incorporate third-party content or APIs
- Third-party content is subject to its own terms and conditions

---

## 7. Privacy

Your use of the Service is also governed by our Privacy Policy, which can be found at [your-privacy-policy-url].

---

## 8. Disclaimers & Warranties

### 8.1 Service As-Is
- The Service is provided "as is" without warranties of any kind
- We do not guarantee the Service will be uninterrupted, timely, secure, or error-free
- We do not guarantee the accuracy or quality of generated content

### 8.2 AI Limitations
- Generated content may contain inaccuracies or errors
- You should review all generated content before use
- Quiz Genny is not responsible for any errors in generated content

---

## 9. Limitation of Liability

To the fullest extent permitted by law:
- Quiz Genny shall not be liable for any indirect, incidental, special, or consequential damages
- Our total liability shall not exceed the amount you paid for the Service in the preceding 12 months
- We are not liable for any damages resulting from use or inability to use the Service

---

## 10. Indemnification

You agree to indemnify and hold Quiz Genny harmless from any claims, damages, or expenses arising from:
- Your use of the Service
- Your violation of these Terms
- Your violation of any third-party rights

---

## 11. Termination

### 11.1 By You
- You may terminate your account at any time
- Termination takes effect immediately upon request
- You may request deletion of your account and data

### 11.2 By Quiz Genny
- We may suspend or terminate your account for:
  - Violation of these Terms
  - Suspicious activity
  - Failure to pay fees
  - Any reason at our sole discretion

### 11.3 Effect of Termination
- Upon termination, your right to use the Service ceases immediately
- You will not receive any refund for unused portion of your subscription
- We may delete your account and data after a reasonable period

---

## 12. Modifications to Terms

We reserve the right to modify these Terms at any time. We will notify you of material changes by:
- Posting the updated Terms on our website
- Sending you an email if you have an account

Continued use of the Service after changes constitutes acceptance of the updated Terms.

---

## 13. Governing Law

These Terms are governed by the laws of [Your Jurisdiction]. Any disputes shall be resolved in the courts of [Your Jurisdiction].

---

## 14. Contact Information

For questions about these Terms, please contact:

**Quiz Genny**
Email: hey@tomoliver.me
Address: [Your Address]

---

*Last Updated: February 21, 2026*
`;

const TermsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div
        dangerouslySetInnerHTML={{
          __html: termsMarkdown
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

export default TermsPage;
