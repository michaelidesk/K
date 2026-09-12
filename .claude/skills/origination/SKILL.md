---
name: origination
description: >
  Runs a staged origination and targeting pipeline - ICP definition, target
  universe build, qualification, contact identification, dossier research,
  compliance gate, then outreach drafting - for Impactus PE Group deal sourcing,
  Vertu Projects service-line business development, and investor/LP mapping.
  Use this whenever K asks to find targets, build a target list, map a market,
  source deals, identify acquirers or sellers, find LPs or introducers, build an
  outreach list or campaign, or research a named counterparty before contact -
  including when the ask is phrased casually ("who should we be talking to in
  X", "give me a list of tyre collectors in Greece", "map the family offices in
  Athens", "find targets like company Y"). Also use it before any outbound
  email, sequence or campaign is drafted or sent, because the compliance gate in
  this pipeline is what keeps fund-related outreach inside AIFMD marketing rules
  and contact data inside GDPR/ePrivacy. Replaces subscription AI-SDR tools
  (Explee AutoGTM, Clay, Instantly) with an in-house, auditable equivalent.
---

# Origination pipeline

This is the in-house replacement for subscription AI-SDR funnels. Those tools
sell a seven-stage pipeline: read the website, infer the ICP, build a target
universe, enrich contacts, write a personalised email, schedule the send,
report. Stages 1-5 are genuinely valuable and cost nothing but rigour. Stage 6
is where a regulated Cyprus fund platform acquires liability that dwarfs the
subscription fee.

So this pipeline keeps the stages and inserts a hard gate between research and
send. The gate is not bureaucracy - it is the reason this can be run at all.

## Stage 0 - Establish which book you are working

Ask, or infer from context, which of the three books the request belongs to.
This determines everything downstream, especially whether outreach is permitted.

| Book | What is being sold or sought | Outbound email |
|---|---|---|
| **Vertu Projects** - fiduciary, tax, licensing, corporate services | Professional services to companies | Permitted, B2B legitimate interest |
| **Impactus deal sourcing** - PE Fund, CPEF I Curity, Impactus Pyrolysis | Buying into or acquiring businesses | Permitted, inbound-interest framing |
| **Fund capital raising** - RAIF units, LP commitments | Units in a regulated AIF | **Blocked. See compliance gate.** |

If the request is capital raising, say so at Stage 0 and route to research and
warm-introduction mapping only. Do not build a send list. `references/compliance-gate.md`
explains why - AIFMD Art.30a(4) deems any subscription within 18 months of
pre-marketing to result from marketing, which collapses the reverse-solicitation
defence the moment an automated sequence goes out.

## Stage 1 - Define the ICP in writing before touching any data

Write the ICP as an explicit filter set, then show it to K for correction before
building anything. This is the step the subscription tools do invisibly and
badly - they infer an ICP from website copy, which produces plausible-looking
lists of the wrong companies.

State each dimension explicitly: jurisdiction, sector (with the actual NACE or
NAICS code, not a label), size band by revenue and headcount, ownership
characteristics, the trigger event that makes them relevant now, and the
disqualifiers. An ICP without disqualifiers is not an ICP.

`references/icp-library.md` holds the standing ICPs for each book. Start from
one of those and vary it rather than inventing from scratch - they already carry
the disqualifiers learned from prior work.

## Stage 2 - Build the target universe from a named source

Every target must carry provenance: which source, which date, which identifier.
A list without provenance cannot survive a diligence question later, and under
GDPR Art.14 you are obliged to be able to say where personal data came from.

`references/data-sources.md` gives the two paths. Prefer the registry path for
Cyprus and Greece work - it is free, authoritative, carries clean provenance,
and produces the HE or GEMI number that any later KYC file needs anyway. Use
Apollo for reach outside the registries' coverage, for headcount and technology
filters, and for contact identification.

Record every target in the run's `targets.csv` with the columns set in
`assets/targets-template.csv`. One row per entity, source and retrieval date on
the row.

## Stage 3 - Qualify before you enrich

Enrichment costs money and credits; qualification costs judgement. Score each
target against the ICP and drop the tail before spending anything on contact
data. A universe of 400 that qualifies down to 25 is a normal and good outcome.

Score on fit (does it match the ICP), timing (is there a live trigger event),
and access (is there a warm route in). Anything scoring low on access but high
on fit goes to the introduction-mapping list, not the outreach list - a warm
introduction converts at a multiple of cold contact and carries none of the
ePrivacy exposure.

## Stage 4 - Identify the decision-maker, not the department

Name the individual, their role, and why they are the right person for this
specific approach. For owner-managed Cypriot and Greek businesses this is
usually the beneficial owner or a family principal, not a titled executive -
title-based filtering misses them entirely, so search by seniority and company
size band instead.

Spend enrichment credits only on qualified targets, and confirm the total cost
with K before spending. Apollo's free tier blocks the search API, so check what
is actually available before promising a list - see `references/data-sources.md`.

## Stage 5 - Research the dossier

For each qualified target, produce the dossier in `assets/dossier-template.md`.
This is the output that makes the pipeline better than the subscription tools:
they generate a personalisation sentence, this generates something usable in an
IC discussion or a first call.

Verify every figure against a named source and mark anything unverified as
unverified. A dossier with a confident wrong revenue figure is worse than one
with a gap, because the first one gets repeated in a meeting.

## Stage 6 - The compliance gate

Before any outreach is drafted, work through `references/compliance-gate.md` and
record the answers in the run folder. The gate covers the AIFMD marketing
question, the GDPR lawful-basis and balancing test, the ePrivacy consent
position, and the suppression check.

If the gate fails, the pipeline still delivered Stages 1-5, which is the
valuable part. Say plainly that outreach is blocked and why, and offer the
introduction-mapping route instead.

## Stage 7 - Draft outreach that a principal would actually send

Short, specific, and written as if from K personally - because it is. Reference
the actual trigger event from the dossier. No template personalisation tokens,
no "I noticed you're doing great things at {{company}}".

Every message carries the Art.14 disclosure (who we are, where the data came
from, how to object) and a working opt-out. For fund-referencing material, the
AIFMD Art.23 disclaimer applies - but if the gate blocked fund outreach, there
is no such material to send.

Cap volume deliberately. Twenty researched approaches from a named partner
outperform two thousand automated ones, and they do not put the platform's
regulatory standing at risk.

## Output structure

Write each run to `runs/YYYY-MM-DD-<book>-<slug>/` containing `icp.md`,
`targets.csv`, `dossiers/`, `compliance-gate.md`, and `outreach/`. The run
folder is the audit trail - it is what you show a CySEC reviewer or a DPO who
asks how a contact list was built.
