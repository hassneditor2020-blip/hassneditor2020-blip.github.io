# Search and conversion measurement

Website-side setup reviewed on 7 November 2026. Existing consent-aware contact and performance events were retained. The existing Google Analytics property is accessible with ahmad.mohammed2108@gmail.com: property 546109215, www.hassneditor.com, measurement ID G-E1M8JWHFMT. The hassneditor2020@gmail.com account instead displays the initial measurement setup screen. Use the existing property; do not create a second property or replace its measurement ID to work around account selection. Search Console performance was read; its latest data ended on 4 November, before the latest content updates.

The Google tag command queue was corrected to use the official Arguments-object format. Arrays are interpreted as data-layer method calls rather than gtag commands, so the previous wrapper prevented configuration and events from reaching Analytics. Consent requirements and the existing measurement ID remain unchanged. This fixes future collection; it does not reconstruct historical visits. Windsor.ai already has the matching GA4 property selected.

## GA4

The existing GA4 property stays in place. Analytics and performance events are sent only after analytics consent. Revocation suppresses future events, including late performance callbacks. No project-brief text is sent in event parameters.

Register these **event-scoped custom dimensions** if they are not already present:

| Display label | Parameter |
| --- | --- |
| Service | `service` |
| Project | `project_slug` |
| Page type | `page_type` |
| Contact method | `method` |
| Contact placement | `placement` |
| Website language | `language` |
| Performance rating | `metric_rating` |
| Navigation type | `navigation_type` |

In the existing GA4 property, mark `contact_intent` as a key event after confirming the property uses measurement ID `G-E1M8JWHFMT`. Keep `project_brief_submit` as a diagnostic event to avoid double-counting the same request. Use `contact_intent` to compare contact actions by landing page, service and language. It records an intention, not a sent WhatsApp message or confirmed customer. `project_brief_submit` indicates the prepared WhatsApp handoff. Do not count both as two separate leads from one brief.

`LCP`, `INP` and `CLS` are real-user performance events from the official web-vitals library. Their numeric parameters are `metric_value`, `metric_delta` and built-in `value` (delta). Register custom metrics for the first two if needed. `metric_id` enables aggregation in an export; avoid registering it as a regular high-cardinality dimension. Prefer 75th percentile distributions, with enough observations, rather than averages. Some metrics are only reported after interaction or when a page is hidden. Cross-origin video frames are outside the library's full measurement coverage. These measurements are not a Lighthouse audit or a ranking score.

## Search Console

Compare the latest 28 days to the preceding 28 days. Export query and page performance, filtered to the UAE, with desktop/mobile comparisons. Inspect index coverage and video indexing. Prioritize pages already earning impressions before adding or merging similar service pages.

Current page roles:

| Page | Primary intent |
| --- | --- |
| `/video-editor-ajman` | Find a local editor based in Ajman |
| `/video-editing-uae` | Remote editing for clients across the UAE |
| `/services/video-editing` | Understand scope, process and deliverables |
| `/works/...` and `/projects/...` | Watch a specific project and understand the work |
| `/contact` | Arrange and discuss a project |

The bilingual sitemap includes contact, packages and privacy. Content modification dates change when relevant content changes; they are not refreshed daily. The video sitemap and existing verification tokens are preserved. Review the reports before requesting recrawls or claiming that a video is indexed.

## Assets and external profiles

Published video covers and the existing portrait are available on the site. Authentic before/after footage, editable production screenshots and documented outcomes still need owner-supplied material. New restaurant photography development remains deferred. Existing restaurant portfolio work remains available. WARD has not been modified.
