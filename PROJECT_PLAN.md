
# Night-Owl Hub Project Plan

## Phase 1: MVP foundation
- [x] Shared incident and feedback types
- [x] Incident and feedback API starter
- [x] Supabase schema
- [x] Incident trust labels
- [x] Rule-based report classification
- [x] Demo route ranking
- [x] WhatsApp webhook starter

## Phase 2: Real city data
- [ ] Select a route provider and implement actual road routing
- [ ] Add weather ingestion with timestamps and source metadata
- [ ] Add public transport feeds for the target city
- [ ] Add official incident and road-closure sources
- [ ] Add expiration and corroboration jobs
- [ ] Display data freshness and source attribution

## Phase 3: Safety and trust
- [ ] User authentication and roles
- [ ] Report abuse prevention and moderation
- [ ] Independent corroboration workflow
- [ ] Audit trail for trust-status changes
- [ ] Privacy and retention rules
- [ ] Human escalation procedure for critical reports

## Phase 4: WhatsApp
- [ ] Verify webhook signatures
- [ ] Parse text, image, voice, and location messages
- [ ] Add outbound message delivery
- [ ] Store consent and minimal required user context
- [ ] Test failure and retry handling

## Phase 5: Launch readiness
- [ ] Unit and integration tests
- [ ] Accessibility and mobile testing
- [ ] Load and security testing
- [ ] Monitoring and error alerts
- [ ] Deployment and rollback plan
- [ ] Pilot with a small group of users
