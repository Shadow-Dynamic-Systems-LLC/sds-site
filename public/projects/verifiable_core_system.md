---
title: "Verifiable, Platform-Agnostic Core System"
description: "A zero-trust execution layer for verified agent behavior across platforms."
image: "assets/phoenix-logo.jpg"
---

We are building a zero-trust execution layer designed for intelligence at scale. It ensures that agent actions can be independently verified, logged, and audited—no matter where they run. This foundation supports secure collaboration, deterministic output validation, and consistent behavior across heterogeneous environments. It’s the reliability layer for systems that can’t afford to guess.

## The Problem
Because LLMs gather data from unknown and unprotected sources, they are vulnerable to context poisoning, and other forms of manipulation. This can lead to information disclosure, or even the execution of arbitrary code. 

## The Almost Entirely Not a Joke RPC Draft
### RFC-ΨΦ-001: Signed AI Inference Payloads (SAIP)

### Status

**Draft** — July 28, 2025

### Abstract

This document proposes a minimal, cryptographically verifiable standard for signing and hashing AI inference responses. This is not for show. This is for accountability, reproducibility, and the faint hope of trust in a world where a hallucinated comma can cost \$8 million in legal liability. The Signed AI Inference Payloads (SAIP) spec defines the structure, required fields, and verification process necessary to assert provenance, consistency, and auditable traceability of AI-generated outputs.

If your inference endpoint cannot sign its output, it is a toy.

### Motivation

The world has too many unsigned thoughts and not enough receipts.

Currently, inference providers return payloads that are:

* mutable
* unverifiable
* opaque
* prone to silent regression
* and ultimately indistinguishable from magic (read: fraud).

This document proposes a formal contract that any AI output intended for enterprise, regulatory, legal, financial, or historical use *must* adhere to. This is not just a technical necessity—it is a moral one.

### Requirements

A compliant SAIP implementation MUST:

* Produce a digital signature for every inference payload
* Include a hash of the **output**, and optionally the **input signature**, if provided
* Include a hash of the **model identifier** and **configuration**
* Time-stamp the request with a verifiable UTC-aligned source
* Expose public keys for signature verification via well-known endpoints

### Specification
 
### 1. SAIP Envelope Format

Every AI inference response MUST include the following JSON payload, either as a top-level object or under a well-known metadata field (e.g., `_saip`):

```json
"_saip": {
  "provider": "anthropic",
  "model": "claude-3-opus-2025-07",
  "output_hash": "sha256:efgh5678...",
  "input_sig_hash": "sha256:mnop3456...",  // Optional: only present if signed input provided
  "model_config_hash": "sha256:ijkl9012...",
  "timestamp_utc": "2025-07-28T17:33:44.210Z",
  "signature": "base64(sig) [provider-private-key]",
  "pubkey_url": "https://anthropic.com/.well-known/ai-pubkey.pem"
}
```

### 2. Hashing Requirements

* **SHA-256** MUST be used for all hashes unless otherwise negotiated via header.
* The hash MUST be computed over the canonical JSON stringified version of the respective payloads.
* Implementations SHOULD normalize whitespace and Unicode.
* If an input includes its own digital signature (e.g., user-signed JSON input), that signature MUST be hashed and included as `input_sig_hash`.

### 3. Signing Process

* The signature MUST be computed over the concatenated values:

  * `output_hash`
  * `input_sig_hash` (if present)
  * `model_config_hash`
  * `timestamp_utc`
* The signature MUST be generated using the provider’s private key and verifiable via public key lookup at `pubkey_url`.
* Signatures MUST be base64-encoded and portable.

### 4. Verification

Any client MAY verify the payload via the following steps:

1. Canonicalize output/config and compute respective hashes.
2. If signed input was provided, compute hash of its signature.
3. Compare to provided hashes.
4. Fetch public key from `pubkey_url`.
5. Validate `signature` against concatenated fields using the key.
6. If all match: Trust but document. If mismatch: Log and alert.

### 5. Optional Extensions

* `chain_of_custody`: list of intermediate handlers with hash+sig
* `source_model_commit`: if open-weight, hash of exact model weights
* `trusted_execution_proof`: enclave attestation or zero-knowledge proof

## Security Considerations

* Any inference provider that rotates keys silently SHALL be considered hostile.
* All signatures SHOULD be time-bound. If more than `24h` stale, clients MAY request re-verification.
* Payloads lacking SAIP headers MUST NOT be accepted in high-integrity environments.

## Implementations

* `excalibur-saip-shim` (in development)
* `saip-verify-cli`: CLI tool for decoding and validating inference payloads

## IANA Considerations

This document requests the registration of the `application/saip+json` media type.

## Contact

Complaints, threats, and praise may be directed to:

```
Jason Crittenden
Shadow Dynamic Systems
jason@shadowdynamicsystems.com
```

## License

This RFC is released under the Creative Commons Zero (CC0) license. Steal this. Prove it.

## Epilogue

The next generation of AI won't just think—it will remember, verify, and swear on its own hash.

We are building toward a world where inference can be evidence.

---

**RFC-ΨΦ-001: Signed AI Inference Payloads** **Veritas Ordo Memoria.**

## Appendix: SAIP Verification Flow (Mermaid Diagram)

```mermaid
graph TD
    A[User Input (Optional Signature)] --> B[Inference Provider]
    B --> C[Generate Output]
    B --> D[Hash Output]
    B --> E[Hash Model Config]
    B --> F[Hash Input Signature (if present)]
    D --> G[Concatenate Hashes + Timestamp]
    E --> G
    F --> G
    G --> H[Sign Payload with Provider Key]
    H --> I[Return Response + _saip Envelope]
    I --> J[Client Verifies Signature]
    J --> K[Trust if Valid \n Alert if Not]
```
