# Compliance gate

Work through this before any outreach is drafted. Record the answers in the run
folder as `compliance-gate.md`. The point is not to produce a document nobody
reads - it is that each question below, answered wrongly, has a named regulator
attached to it.

Legal references are given so they can be checked. Anything marked **[verify]**
should be confirmed with Cyprus counsel before it is relied on in a live
campaign - the pipeline flags it rather than asserting it.

## Gate 1 - Is this marketing of AIF units?

The question that matters most, and the one the subscription tools have no
concept of.

If the outreach references, promotes, describes or invites interest in Impactus
RAIF VCIC Plc or any sub-fund - the PE Fund, CPEF I Curity, Impactus Pyrolysis -
including a teaser, a one-pager, a track record slide or a "we run a fund in
this space" sentence, then it is marketing or pre-marketing of AIF units.

Consequences, under Directive 2011/61/EU as amended by Directive (EU) 2019/1160
(the cross-border distribution package) and the Cyprus AIF Law 124(I)/2018:

- Marketing of AIF units may only be directed at professional investors, or at
  well-informed investors where the sub-fund's constitutional documents allow
  it. A cold list built from a commercial database is not a pre-qualified
  professional-investor list, and cannot be made into one after the fact.
- Pre-marketing must be notified to CySEC within two weeks of commencing it
  (AIFMD Art.30a(2)), and the AIFM must be able to evidence what was sent, to
  whom, and when.
- **AIFMD Art.30a(4): any subscription by an investor within 18 months of
  pre-marketing having begun is deemed to result from marketing.** This is the
  provision that destroys the reverse-solicitation argument. An automated
  sequence creates a documented pre-marketing footprint against every recipient,
  so a subscription from any of them later is deemed solicited - with the
  passport and notification obligations that follow.

**If Gate 1 is triggered: outbound is blocked.** Not narrowed, not caveated -
blocked. Route to warm introduction mapping, placement agent channels, or a
CySEC-notified marketing process run with counsel. Stages 1-5 of the pipeline
still apply and still have value: knowing who the right LPs are is useful
regardless of how you reach them.

Vertu service-line outreach and deal-sourcing outreach do not trigger Gate 1,
provided the message does not mention the funds. Keep the books separated in
the message, not just in the intention.

## Gate 2 - Lawful basis for the personal data

Business contact data about a named individual is personal data. GDPR applies.

- Basis: Art.6(1)(f) legitimate interests is the workable basis for B2B
  prospecting. Consent is not required for the *processing* - but see Gate 3 for
  the separate question of the electronic communication itself.
- A legitimate interests assessment must exist and be recorded before
  processing: the interest pursued, why the processing is necessary for it, and
  the balancing against the individual's rights. Record it in the run folder.
  One paragraph per campaign is sufficient; nothing is not.
- Art.14 applies because the data was not obtained from the individual. They
  must be told, at the latest at the first communication, who is processing
  their data, the purposes, the legitimate interests relied on, **the source the
  data came from**, and their rights to object and erase. This is why Stage 2
  demands provenance - without it, the Art.14 notice cannot be given truthfully.
- Retention: define how long a non-responding prospect's data is kept. Indefinite
  retention of a scraped list is the most common finding in enforcement.

Note on database provenance: commercial B2B databases are built by scraping and
inference, and their lawful basis for the original collection is the vendor's
problem only until you become the controller of the copy you hold. For a
CySEC-regulated platform the reputational asymmetry is the real point - a
supervisor asking how you sourced an investor list is a conversation worth
avoiding.

## Gate 3 - ePrivacy: may the email be sent at all?

Separate question from Gate 2, and the one most often missed. GDPR governs the
data; ePrivacy governs the act of sending.

- Directive 2002/58/EC Art.13 requires prior consent for unsolicited commercial
  electronic communications, with a soft opt-in for existing customers marketing
  similar products, and an exemption member states may apply to corporate
  subscribers.
- Cyprus implements this in the Regulation of Electronic Communications and
  Postal Services Law 112(I)/2004 **[verify the section number and the current
  treatment of corporate subscribers with counsel - this is the specific point
  on which Cyprus practice differs from the UK's, and it determines whether
  cold B2B email is lawful here at all]**.
- Greece applies opt-in through Law 3471/2006 and the HDPA takes an active
  enforcement line **[verify current position]**.
- Practical position pending that advice: keep cold volumes low, target role and
  company addresses over named personal mailboxes where the message is
  genuinely corporate, include a working opt-out in every message, and honour
  objections immediately and permanently.

## Gate 4 - Suppression and conflicts

Check the target list against, and record the check:

- The permanent suppression list - anyone who has objected, ever, across any
  book. One list, not one per campaign.
- Existing Vertu clients and Impactus portfolio companies and their advisers -
  a cold approach to an existing relationship is an own goal.
- Sanctions and adverse media screening on any entity that could become a
  counterparty. This is required anyway before onboarding; doing it at list
  stage saves wasted effort on targets that will fail KYC.
- Competitors and their staff, where an approach would disclose deal intent.

## Gate 5 - Mailbox and deliverability hygiene

Sending cold volume from the primary domain risks the domain reputation that
carries genuine LP and client correspondence. That is a real operational cost,
not a technicality.

- Use a separate sending domain or subdomain for any volume outreach; never the
  primary fund or Vertu correspondence domain.
- SPF, DKIM and DMARC aligned on the sending domain before the first send.
- Volume discipline beats warm-up tricks. The cap in Stage 7 exists for this
  reason as much as for the legal ones.

## Recording the gate

For each run, write the five answers, the date, and who decided. If a gate
blocked the campaign, record that too - a documented decision not to send is an
asset in a supervisory conversation, and it stops the same question being
relitigated next quarter.
