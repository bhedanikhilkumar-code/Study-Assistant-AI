# Security Policy

Security is a core priority for **Study Assistant AI**. We appreciate responsible researchers and contributors who help keep this project safe.

---

## Supported Versions

We currently provide security fixes on a best-effort basis for:

- **Latest `main` branch**
- **Most recent tagged release** (when releases are published)

Older snapshots may not receive patches.

---

## Reporting a Vulnerability

Please report vulnerabilities **privately**.

### Preferred channel
- Email: `security@studyassistant.ai` (**example contact address for policy documentation**)

### Alternative channel
- Use GitHub private security advisories (repository Security tab) when available.

### Do not
- Do **not** open public issues for unpatched vulnerabilities.
- Do **not** post exploit details in public discussions before coordinated disclosure.

---

## What to Include in a Report

A high-quality report helps us respond quickly. Include:

1. A clear vulnerability summary
2. Affected component(s) and file path(s)
3. Reproduction steps (step-by-step)
4. Proof of concept (minimal, safe where possible)
5. Impact assessment (confidentiality/integrity/availability)
6. Affected versions or commit range
7. Suggested remediation (if available)

If you are unsure about severity, report anyway.

---

## Response Timeline (Best Effort)

We aim for the following targets:

- **Acknowledgement:** within 72 hours
- **Initial triage:** within 7 business days
- **Status updates:** at reasonable intervals until resolution

Complex issues may require more time, especially when they affect dependencies or broad architecture.

---

## Disclosure Policy

We follow responsible disclosure:

1. Reporter submits privately.
2. Maintainers validate and triage.
3. Fix is developed and tested.
4. Disclosure is coordinated after patch availability.

We may publicly credit reporters (with permission).

---

## Security Best Practices for Contributors

When contributing code:

- Never commit secrets (API keys, tokens, private credentials).
- Keep dependencies updated and avoid abandoned packages.
- Avoid unsafe patterns (`eval`, dynamic code execution, untrusted HTML injection).
- Validate and sanitize external/user-provided input.
- Prefer explicit typing and defensive checks for high-risk flows.

---

## Scope Notes

Typical high-priority findings include:

- Secret leakage risks
- Injection vulnerabilities
- Authentication/authorization bypass logic
- Unsafe dependency exposure
- Data import/export trust boundary issues

Low-impact UI glitches or non-security bugs should go through regular issue templates.

---

## Contact

Security contact for this policy:

- `security@studyassistant.ai` *(example contact for repository policy)*

If this address is not active in your deployment fork, configure your own private reporting mailbox and update this document accordingly.
