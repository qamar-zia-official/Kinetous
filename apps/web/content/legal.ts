import { legalDocumentSchema } from "./schemas";

/**
 * Legal documents for /privacy and /terms.
 *
 * These describe how Kinetous handles data in practice. They are not a
 * substitute for advice from a qualified lawyer for your jurisdiction.
 */

export const privacyPolicy = legalDocumentSchema.parse({
  slug: "privacy",
  name: "Privacy Policy",
  lastUpdated: "October 21, 2026",
  intro:
    "This policy explains what information Kinetous collects through this website, why it is collected, and what is done with it. Kinetous is a small engineering practice, and the approach is deliberately minimal: collect what is needed to respond to an enquiry, and nothing more.",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      body: "Kinetous is a software engineering studio run by Qamar Zia, based in Lahore, Pakistan. For questions about this policy, contact `qamar@kinetous.com`.",
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      body: "**Information you send us.** When you use the contact form, WhatsApp link, or email, we receive the details you chose to provide — typically your name, email address, company, and a description of your project or workflow.\n\n**Technical data.** Like most websites, this site records standard server logs such as IP address, request path, user agent, and timestamp. These are used to keep the site running and to detect abuse.\n\n**Cookies.** This website does not use advertising, analytics, or tracking cookies. Any cookie present is functional — for example, remembering a session — and is required for the page to function.",
    },
    {
      id: "how-we-use-it",
      title: "How we use it",
      body: "Enquiry details are used to respond to you, to understand the scope of work, and to keep a record of the conversation. Server logs are used for security, diagnosing errors, and understanding aggregate traffic. Information is not sold, rented, or shared for marketing purposes.",
    },
    {
      id: "service-projects",
      title: "Client project data",
      body: "When Kinetous builds software for a client, that work is governed by a separate written agreement covering the systems, data, and access provided. Project data is handled only as needed to deliver the agreed scope, with access limited to the people working on the engagement.\n\nClient systems are not used as a source of data for other projects, and no client data is shared with third parties except where the project requires it — for example, a shipping carrier, payment processor, or hosting provider that the client's own systems already depend on.",
    },
    {
      id: "retention",
      title: "Retention",
      body: "Enquiry records are kept only as long as they remain useful for responding to you or for an ongoing engagement, after which they are deleted. Server logs are retained for a limited period and then rotated automatically, according to the hosting configuration.",
    },
    {
      id: "processors",
      title: "Service providers",
      body: "This site relies on a small number of infrastructure providers to stay online — a hosting platform, a database host, and an email delivery service. Each receives only the information required to perform its function, under its own privacy terms.",
    },
    {
      id: "your-rights",
      title: "Your rights",
      body: "Depending on where you live, you may have the right to access the personal data held about you, correct it, have it deleted, or object to its processing. Because Kinetous holds a limited amount of data, requests are usually handled directly and quickly.\n\nTo exercise any of these rights, email `qamar@kinetous.com` with a description of the request. If you are in the EEA or UK, the right to lodge a complaint with a supervisory authority also applies.",
    },
    {
      id: "security",
      title: "Security",
      body: "Reasonable technical and organisational measures are in place to protect the information held by Kinetous — encrypted transport, restricted access to enquiry records, and credentials stored outside source control. No system can be guaranteed breach-proof, and no sensitive information should be sent by a channel that is not end-to-end encrypted unless that is the agreed channel for the project.",
    },
    {
      id: "transfers",
      title: "International transfers",
      body: "Kinetous operates from Pakistan, and the infrastructure providers used may process data in other countries. By using this site you accept that your enquiry information may be processed outside your own country of residence.",
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: "This policy may be updated as the site or the practice changes. The date at the top of this page reflects the most recent revision, and the previous version is available on request.",
    },
    {
      id: "contact",
      title: "Contact",
      body: "Questions about this policy, or about the handling of any information you have sent, can be sent to `hello@kinetous.com`.",
    },
  ],
  seo: {
    title: "Privacy Policy — Data & Project Handling",
    description:
      "How Kinetous collects, uses, and protects the information you share through this website and during client engagements.",
    keywords: [
      "Kinetous privacy policy",
      "data handling",
      "web privacy policy",
    ],
  },
});

export const termsOfService = legalDocumentSchema.parse({
  slug: "terms",
  name: "Terms of Service",
  lastUpdated: "October 21, 2026",
  intro:
    "These terms govern the use of this website and the general basis on which Kinetous works with clients. Specific engagements are always covered by a separate written agreement, which takes precedence over anything written here.",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of these terms",
      body: "By using this website you agree to these terms. If you do not agree with them, please stop using the site. Kinetous may update these terms as the site changes; the date at the top of this page reflects the most recent revision.",
    },
    {
      id: "website-use",
      title: "Permitted use of the website",
      body: "The website and its contents are provided for information. You may read, quote, and share the material for your own business purposes, provided attribution is given.\n\nYou may not attempt to disrupt or overload the site, probe it for vulnerabilities without written permission, scrape its content at a rate that degrades service for others, misrepresent Kinetous as an authorised partner, or use the site in a way that breaks applicable law.",
    },
    {
      id: "no-warranty",
      title: "No warranty",
      body: 'The site and its content are provided "as is", without warranties of any kind, express or implied, including fitness for a particular purpose. Content is written to describe how Kinetous works in general terms. It is not a quotation, a warranty of results, or professional advice for your specific circumstances, and it should not be relied on as such.\n\nDescriptions of outcomes on this site describe what the engineering is designed to achieve — they are not guarantees of performance, revenue, or savings for any particular business.',
    },
    {
      id: "engagements",
      title: "Client engagements",
      body: "Project work is governed by a written agreement covering scope, deliverables, timeline, fees, payment terms, and how either party may end the engagement. Where that agreement conflicts with these terms, the agreement prevails.\n\nEstimates and indicative ranges shown on this site — including pricing ranges — are planning figures based on the information available at the time. A binding price is only established once a scope has been agreed in writing.",
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      body: "The website, its design, and the written content on it are owned by Kinetous and protected by copyright. You may quote and share portions with attribution.\n\nOn client projects, ownership of custom code, configuration, and documentation is set out in the project agreement. Kinetous retains the right to reuse general, non-confidential engineering patterns and techniques that are not specific to the client's business, unless the agreement states otherwise.",
    },
    {
      id: "third-party",
      title: "Third-party services and links",
      body: "This site may link to third-party websites. Kinetous does not control them and is not responsible for their content, availability, or privacy practices. Links are provided for convenience and do not imply endorsement.",
    },
    {
      id: "liability",
      title: "Limitation of liability",
      body: "To the fullest extent permitted by law, Kinetous is not liable for indirect or consequential loss, or for loss of profit, revenue, data, or goodwill, arising from the use of this website or its content. Liability for any direct loss connected to a paid engagement is limited to the fees paid for that engagement, unless the project agreement states otherwise.\n\nNothing in these terms excludes liability that cannot lawfully be excluded, including for fraud or fraudulent misrepresentation.",
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      body: "Information shared with Kinetous in the course of an enquiry is treated as confidential and used only to respond and to assess the work. Confidentiality obligations for client engagements are set out in the project agreement.",
    },
    {
      id: "law",
      title: "Governing law",
      body: "These terms are governed by the laws of Pakistan. Where you deal with Kinetous as a consumer, mandatory consumer protections in your own country still apply.",
    },
    {
      id: "contact",
      title: "Contact",
      body: "Questions about these terms can be sent to `qamar@kinetous.com`.",
    },
  ],
  seo: {
    title: "Terms of Service",
    description:
      "The terms governing use of the Kinetous website and the general basis on which client engagements are provided.",
    keywords: [
      "Kinetous terms",
      "website terms of service",
      "client engagement terms",
    ],
  },
});
