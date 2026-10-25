
# Night-Owl Hub

Night-Owl Hub is a night-time city decision-support MVP for workers,
commuters, and people travelling during reduced-service hours.

## Core features

- Incident reporting and community feedback
- Explicit trust states: KNOWN, PROBABLE, OUTDATED, UNKNOWN
- A route-planning API with clearly marked demo estimates
- Rule-based classification of text reports
- WhatsApp Cloud API webhook starter
- Supabase persistence for reports and feedback
- Next.js dashboard and incident reporting UI

## Architecture

- apps/web: Next.js frontend
- apps/api: Express REST API
- apps/whatsapp-bot: WhatsApp webhook
- services/decision-engine: route ranking and trust logic
- services/ai-engine: report classification
- services/data-ingestion: community report retrieval
- packages/database: Supabase server client
- packages/shared-types: shared TypeScript contracts

## Setup overview

1. Install a compatible Node.js release and project dependencies.
2. Create a Supabase project.
3. Apply supabase/migrations/001_initial_schema.sql.
4. Copy .env.example to a private .env file and fill in Supabase credentials.
5. Configure the web app's NEXT_PUBLIC_API_BASE_URL.
6. Start the API and frontend using your development environment.
7. Test incident submission, feedback submission, and incident listing.
8. Configure WhatsApp Cloud API separately if needed.

## Important limitations

- Demo route estimates are not navigable street directions.
- The rule-based classifier is not a verified AI model.
- Community reports are not automatically confirmed.
- Live weather, transit, road, and official incident feeds are not yet connected.
- WhatsApp media, location parsing, outbound replies, and signature verification
  require additional implementation before production use.
- No emergency response or safety guarantee is provided.

## Security

Never expose the Supabase service-role key to the browser.
Before public deployment, add authentication, request validation, monitoring,
webhook signature verification, abuse prevention, and a privacy policy.
