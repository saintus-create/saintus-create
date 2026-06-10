---
title: Search Api
---

The Encyclopedia of Rhetoric exposes its full-text search index as a JSON HTTP endpoint, giving you programmatic access to the same search engine that powers the site's built-in search bar. The index is built with [Orama](https://orama.com/) and covers all 274 articles, indexing each article's title, description, and full body content. You can call this endpoint from server-side code, browser fetch, command-line tools, or any HTTP client — no authentication required.

<Note>
  The search index is **statically generated** at build time. Results reflect the published version of the encyclopedia. The endpoint does not support filtering by date, category, or author at this time.
</Note>



## Query Parameters

<ParamField query="q" type="string" required>
  The search query string. Orama performs full-text search across each article's title, description, and body content. Partial words and multi-word phrases are both supported. The search language is set to `english`, so common stop words are filtered and stems are matched automatically.
</ParamField>



## Examples

### Basic search with curl

```bash
curl "https://encyclopedia-of-rhetoric.com/api/search?q=anaphora"
```

### Multi-word query

```bash
curl "https://encyclopedia-of-rhetoric.com/api/search?q=figures+of+repetition"
```

### JavaScript (browser or Node.js)

```js
const res = await fetch("https://encyclopedia-of-rhetoric.com/api/search?q=chiasmus");
const { hits } = await res.json();

for (const hit of hits) {
  console.log(`${hit.document.title} — ${hit.score.toFixed(2)}`);
  console.log(`  ${hit.document.url}`);
}
```

### Python

```python
import urllib.request, urllib.parse, json

query = urllib.parse.urlencode({"q": "ethos pathos logos"})
url = f"https://encyclopedia-of-rhetoric.com/api/search?{query}"

with urllib.request.urlopen(url) as response:
    data = json.loads(response.read())

for hit in data["hits"]:
    print(f"{hit['document']['title']} (score: {hit['score']:.2f})")
    print(f"  URL: https://encyclopedia-of-rhetoric.com{hit['document']['url']}")
```

### Full response example

```bash
curl "https://encyclopedia-of-rhetoric.com/api/search?q=metaphor"
```

```json
{
  "hits": [
    {
      "id": "/docs/metaphor",
      "score": 21.54,
      "document": {
        "id": "/docs/metaphor",
        "title": "Metaphor",
        "url": "/docs/metaphor",
        "content": "A metaphor is a figure of speech that describes an object or action in a way that is not literally true, but helps explain an idea or make a comparison...",
        "section": "Tropes",
        "page_id": "metaphor"
      }
    },
    {
      "id": "/docs/extended-metaphor",
      "score": 16.11,
      "document": {
        "id": "/docs/extended-metaphor",
        "title": "Extended Metaphor",
        "url": "/docs/extended-metaphor",
        "content": "An extended metaphor sustains a comparison across multiple sentences, paragraphs, or an entire work...",
        "section": "Tropes",
        "page_id": "extended-metaphor"
      }
    },
    {
      "id": "/docs/dead-metaphor",
      "score": 9.03,
      "document": {
        "id": "/docs/dead-metaphor",
        "title": "Dead Metaphor",
        "url": "/docs/dead-metaphor",
        "content": "A dead metaphor is a figure of speech that has lost its original imaginative force through overuse...",
        "section": "Tropes",
        "page_id": "dead-metaphor"
      }
    }
  ]
}
```

---

## Notes on Search Behaviour

**Language stemming.** The index is configured with `language: 'english'`. Orama applies English stemming rules, so a query for `"repeat"` will also match documents containing `"repetition"` or `"repeated"`.

**No pagination.** The endpoint returns all matching results in a single response ranked by score. If you need to cap the result set, filter the `hits` array client-side after receiving the response.

**Empty query.** Sending an empty `q` parameter (`?q=`) returns an empty `hits` array rather than all articles. To retrieve all articles, use the [`/llms.txt`](/reference/llm-endpoints) index endpoint.

**Static generation.** The route handler exports `revalidate = false`, meaning the search index is computed once at build time and served from the CDN edge. There is no live reindexing between deployments.

<Tip>
  Combine this endpoint with the per-article Markdown endpoint for a lightweight RAG loop: search for relevant articles, then fetch their full Markdown via `GET /llms.mdx/docs/{slug}/content.md` before passing context to your LLM. See the [LLM Endpoints](/reference/llm-endpoints) page for details.
</Tip>
