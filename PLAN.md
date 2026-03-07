# Site Update Plan — NIST Filing + New Artifacts

**Target Date:** March 9, 2026
**Priority:** High

---

## Phase 1: File Organization ✓

### Keep & Track
- `website/artifacts/*.md` — Source files for new publications
- `public/assets/ai-sys-fail.webp` — Image for SYS-FAIL content
- `public/assets/lighthouse.webp` — Image for NIST response
- `site_update_handoff.md` — Reference document

### Archive (gitignored)
- `.agents/` — Temporary agent files
- `.env` — Environment variables
- `artifacts/superpowers/` — Old working folder
- `nul` — Windows artifact (delete)
- `paper_v1.md` — Old draft
- `screenshots/` — Temporary screenshots
- `site_copy_rewrite.md` — Old working doc
- `test-results/` — Test output
- `tmp/` — Temporary files
- `tsc_output.txt` — Build output

---

## Phase 2: ZTG Invariant Update

**Change:** ZTG-5 (Graduated Containment) eliminated — now folded into ZTG-2 (Stasis)

### Files to Update

1. **`src/components/ArchitecturalSystem.tsx`** — `ZTG_INVARIANTS` object
   - Update to new 9-invariant structure:
     - ZTG-0a: Observability
     - ZTG-0b: Replayability
     - ZTG-0c: Temporal Integrity
     - ZTG-0d: Identity Integrity
     - ZTG-0e: Governance Consistency
     - ZTG-1: Mechanistic Boundary
     - ZTG-2: Stasis (includes graduated containment)
     - ZTG-3: Governed Effect Surface
     - ZTG-4: Evidence-Coupled Execution

2. **`src/components/ZTGSchematic.tsx`** — `LAYER_INVARIANTS` mapping
   - Update layer assignments for new invariant structure

3. **`src/components/Services.tsx`** — 6 governance cards
   - Cards (∂ λ § ⧉ ⊡ ⛶) are presentation layer — no 1:1 ZTG mapping required
   - ⛶ Graduated Containment card can remain (describes capability, now part of ZTG-2)

---

## Phase 3: Add New Publications

### 8 New Artifacts to Add

| ID | Type | Title | Date | Source |
|---|---|---|---|---|
| SDS.CS.001 | CASE STUDY | Temporal Governance Failure in Autonomous AI Systems | 2026-01-30 | site_update_handoff.md |
| SDS.RX.001 | PRESCRIPTION | Toward a Common Language | 2026-03-03 | website/artifacts/ |
| SDS.RX.002 | PRESCRIPTION | Salience-Proportional Observability | 2026-03-04 | website/artifacts/ |
| SDS.RX.003 | PRESCRIPTION | Response to NIST RFI: Security of AI Agent Systems | 2026-03-09 | site_update_handoff.md |
| SDS.DX.006 | DIAGNOSIS | Automation Sedation | 2026-03-04 | website/artifacts/ |
| SDS.FN.005 | FIELD NOTE | Governance Independence from Inference Provider | 2026-03-02 | website/artifacts/ |
| SDS.FN.006 | FIELD NOTE | Model Improvement Does Not Improve Governance | 2026-03-02 | website/artifacts/ |
| SDS.FN.007 | FIELD NOTE | A Silent Scream: The Hidden Cost of Quiet Systems | 2026-03-04 | TBD |

### Implementation
- Add all artifacts to `src/data/artifacts.ts`
- Follow existing `Artifact` interface structure
- Include proper references array (ZTG tags, cross-refs)

---

## Phase 4: Visual Updates

### Artifact Type Colors
- **PRESCRIPTION (RX):** Needs distinct color — gold/yellow suggested
- **CASE STUDY (CS):** Needs distinct color — first entry

### Update `src/components/Publications.tsx` or CSS
- Add type-specific color classes if not present
- Verify filter chip counts update correctly

---

## Phase 5: Research Tab Updates

### SYS-FAIL Tab (Tab 03)
- Currently no featured document
- Consider creating standalone SYS-FAIL document from NIST Section 1(a) failure modes:
  - Unauthorized Execution Cascade → SDS.DX.001
  - Post-Commit Observability Illusion → SDS.DX.003
  - Stochastic Policy Delegation → SDS.DX.002
  - Unattributable Authority → SDS.DX.004
  - Assumed Reversibility → SDS.FN.004

### INSURABILITY Tab (Tab 02)
- Verify 5 evaluation primitives match between existing doc and NIST response Section 3(b)

---

## Phase 6: Final Verification

### Build & Test
- [ ] `npm run build` passes
- [ ] All new artifacts render correctly
- [ ] ZTG schematic displays updated invariants
- [ ] Publication filters work with new types
- [ ] Artifact pages route correctly (`/dx/sds-rx-003`, etc.)

### Content Verification
- [ ] NIST response ASCII diagram (Figure 1) preserves formatting
- [ ] Both submissions marked with proper attribution:
  - SDS.CS.001: "Comment submitted to NIST Cyber AI Profile, January 30, 2026"
  - SDS.RX.003: "Comment submitted to NIST on NIST-2025-0035, March 9, 2026"

---

## Commit Strategy

1. **Commit 1:** File organization (gitignore updates, archive temp files)
2. **Commit 2:** ZTG invariant restructure (ZTG-5 → ZTG-2)
3. **Commit 3:** Add new publications (8 artifacts)
4. **Commit 4:** Visual updates and final polish

---

## Post-Deploy

| Date | Action |
|---|---|
| March 9 | Submit to regulations.gov, publish SDS.RX.003 + SDS.CS.001 |
| March 9-10 | LinkedIn Post 1 — Five failure modes |
| March 11-12 | LinkedIn Post 2 — Five evaluation primitives |
| March 13-14 | LinkedIn Post 3 — Prior art in governing unbounded agents |
