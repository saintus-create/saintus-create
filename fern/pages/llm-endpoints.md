---
title: Llm Endpoints
---

The Encyclopedia of Rhetoric publishes several LLM-friendly endpoints designed to give AI assistants, coding tools, and custom pipelines direct, structured access to its 274 scholarly articles. Unlike the web UI, these endpoints return raw text or Markdown with no JavaScript, no HTML, and no navigation chrome — exactly the format that language models consume most efficiently. Whether you are building a custom RAG pipeline, grounding a chat assistant, or pointing Cursor or Claude Projects at the full corpus, these endpoints are your starting point.

## Endpoints at a Glance

| Method | Path | What it returns |
|--||

## `GET /llms.txt`

Returns a compact plain-text index of every article in the encyclopedia. Each line contains the article title followed by its canonical URL, separated by a colon. This file follows the [llms.txt convention](https://llmstxt.org/) and is suitable for discovery: feed it to a model to let it know what topics exist before asking it to fetch individual articles.

**Response format:** `text/plain`

```
# Encyclopedia of Rhetoric

> A digital reference encyclopedia covering 274 topics in classical and contemporary rhetoric.

## Docs

- [Anaphora](https://encyclopedia-of-rhetoric.com/docs/anaphora): Repetition of a word or phrase at the start of successive clauses.
- [Antithesis](https://encyclopedia-of-rhetoric.com/docs/antithesis): Juxtaposition of contrasting ideas in parallel structure.
- [Chiasmus](https://encyclopedia-of-rhetoric.com/docs/chiasmus): Reversal of grammatical structures in successive phrases.
...
```

<Note>
  The index lists all 274 entries. It is intentionally lightweight — article body text is **not** included. Use `/llms-full.txt` or the per-article endpoint when you need content.
</Note>

**Example request**

```bash
curl https://encyclopedia-of-rhetoric.com/llms.txt
```



# Antithesis

Antithesis places two opposite ideas in grammatically parallel structure to create a sharp contrast...



## `GET /llms.mdx/docs/{slug}/content.md`

Returns the raw Markdown source of a single encyclopedia article identified by its slug. Use this endpoint when you want to retrieve one specific entry without loading the entire corpus — for example, to enrich a search result or to give a model focused context about a single rhetorical term.

**URL parameters**

<ParamField path="slug" type="string" required>
  The URL slug of the article, matching the path segment used in the web UI. For example, the article at `/docs/anaphora` has the slug `anaphora`.
</ParamField>

**Response format:** `text/markdown`

**Example request**

```bash
curl https://encyclopedia-of-rhetoric.com/llms.mdx/docs/anaphora/content.md
```

**Example response**

```markdown
# Anaphora

Anaphora (from Greek *anaphora*, "a carrying back") is a rhetorical figure in which
the same word or phrase is repeated at the beginning of successive clauses, sentences,
or lines. It is one of the most widely used figures of repetition in both classical
oratory and literary prose.

## Classical Background

Aristotle discusses anaphora in the *Rhetoric* as a device that gives a speech
rhythmic drive and emotional force...

## Examples

- "We shall fight on the beaches, we shall fight on the landing grounds,
   we shall fight in the fields..." — Winston Churchill
- "I have a dream... I have a dream... I have a dream..." — Martin Luther King Jr.

## See Also

- [Epistrophe](/docs/epistrophe)
- [Symploce](/docs/symploce)
```

<Tip>
  Slugs are case-sensitive and use hyphens as word separators. If you are unsure of a slug, retrieve `/llms.txt` first and extract the URL path from the relevant line.
</Tip>



## Use Cases

### Cursor and IDE AI Assistants

Add the full-text endpoint as a documentation URL in your Cursor project rules or in any IDE extension that supports custom context sources:

```
@docs https://encyclopedia-of-rhetoric.com/llms.txt
```

Cursor will index the linked pages and make them available to its AI assistant when you ask about rhetorical terms.

### Building a RAG Pipeline

1. Download the corpus with `GET /llms-full.txt`.
2. Chunk it by article (split on `

## Open In Feature

The encyclopedia's web UI includes an **Open In** button on each article page. When you click it, the UI constructs the per-article `content.md` URL and offers a one-click link to open that article in Claude, ChatGPT, or your default Markdown viewer. Under the hood it uses the `/llms.mdx/docs/{slug}/content.md` pattern described above — the same endpoint you can call directly from any script or tool.
