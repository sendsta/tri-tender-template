# Tri-Tender Next.js Template

This repository combines a minimal Next.js starter with a set of files and rules
tailored for building AI-generated tender responses.  It is designed to serve as
a template within the Dyad/Tri-Tender Hub so that new projects have everything
they need to scaffold a tender response rather than a generic web application.

## Overview

The template includes:

- **Next.js application** (`src/`)
  - A minimal App Router setup that can be expanded into a dashboard for
    uploading documents, previewing generated tender content and exporting final
    deliverables.
- **Tender-specific configuration** (`tender-config/`)
  - Structured files for company details (`tender_profile.json`), brand voice
    and colours (`brand_profile.json`), sector metadata (`sectors.json`) and
    a dynamic style guide (`style_guide.md`).  These will be populated by the
    AI from company documents.
- **Input and output folders**
  - `tender-input/` contains raw tender and company documents that the AI will
    read and analyse.
  - `tender-output/` contains HTML files that together form the final tender
    response.  Each file corresponds to a section (cover letter, company
    profile, methodology, pricing, compliance checklist, appendices).
- **AI prompts and rules**
  - `prompts/tender_planner_prompt.ts` contains the system prompt used by the
    planner.  It instructs the AI to extract requirements from the tender
    documents, build the response structure, personalise the tone and style to
    the company and generate unique content.
  - `AI_RULES.md` instructs the AI within Dyad on how to behave when working in
    this template, including technical guidelines for Next.js and the tender
    workflow.
- **Sample files**
  - Sample company profile and tender documents in `tender-input/` provide a
    placeholder for testing.
  - Blank HTML skeletons in `tender-output/` provide a starting point for the
    AI to write the tender response.

## Structure

```
tri-tender-nextjs-template/
├─ README.md
├─ LICENSE
├─ .gitignore
├─ AI_RULES.md               # Instructions for the AI planner in Dyad
├─ prompts/
│  └─ tender_planner_prompt.ts
├─ tender-config/
│  ├─ tender_profile.json
│  ├─ brand_profile.json
│  ├─ sectors.json
│  ├─ style_guide.md
│  └─ brand.css
├─ tender-input/
│  ├─ README.md
│  ├─ sample_company_profile.txt
│  └─ sample_tender_document.txt
├─ tender-output/
│  ├─ 01_cover_letter.html
│  ├─ 02_company_profile.html
│  ├─ 03_methodology_and_scope.html
│  ├─ 04_pricing_schedule.html
│  ├─ 05_compliance_checklist.html
│  └─ 99_appendices.html
└─ src/
   └─ app/
      ├─ layout.tsx
      └─ page.tsx
```

See the comments inside each file for guidance on how they are expected to be
used.  When imported into Dyad, the AI will populate the placeholders and fill
in the content based on the tender documents and company documents supplied by
the user.