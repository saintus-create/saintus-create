---
title: Ai Chat Api
---

The Encyclopedia of Rhetoric includes a conversational AI endpoint that lets you ask questions in natural language and receive grounded, cited answers drawn directly from the encyclopedia's 274 articles. The assistant automatically searches the encyclopedia before answering, so you can ask about specific rhetorical figures, compare related concepts, or explore topics across the corpus — without having to know exact article titles or slugs in advance. Responses are streamed as they are generated, so you can display partial output immediately rather than waiting for a complete reply.

<Note>
  This endpoint is designed to be consumed by the [Vercel AI SDK](https://sdk.vercel.ai/) `useChat` hook or any client that can handle the AI SDK UI message stream format. You can also call it from curl or plain `fetch` and process the stream manually.
</Note>



## Request Body

Send a JSON object containing a `messages` array. Each element in the array is a `UIMessage` as defined by the Vercel AI SDK — a superset of the standard `{ role, content }` shape that also supports multi-part content and data annotations.

For the common case of a plain text conversation, plain `{ role, content }` objects work as-is:

```json
{
  "messages": [
    { "role": "user", "content": "What is anaphora?" }
  ]
}
```

For a multi-turn conversation, include the full history:

```json
{
  "messages": [
    { "role": "user", "content": "What is anaphora?" },
    { "role": "assistant", "content": "Anaphora is the repetition of a word or phrase at the beginning of successive clauses..." },
    { "role": "user", "content": "How does it differ from epistrophe?" }
  ]
}
```

### Request Fields

<ParamField body="messages" type="UIMessage[]" required>
  An ordered array of conversation turns. The array must contain at least one message. The assistant uses the full history to maintain conversational context across turns.

  <Expandable title="Message object fields">
    <ParamField body="messages[].role" type="string" required>
      The role of the message author. Use `"user"` for human turns and `"assistant"` for previous AI replies when continuing a multi-turn conversation. The value `"system"` is reserved — the API injects its own system prompt and will ignore any system message you send.
    </ParamField>

    <ParamField body="messages[].content" type="string | ContentPart[]" required>
      The message text for simple cases. The AI SDK also accepts an array of content parts (text, images, tool results) for advanced multi-modal use cases, but plain string content is sufficient for all text-based queries.
    </ParamField>

    <ParamField body="messages[].id" type="string">
      Optional client-assigned identifier for the message. If omitted, the server does not require one. When using the AI SDK `useChat` hook this is managed automatically.
    </ParamField>
  </Expandable>
</ParamField>



## How the Assistant Works

When your message arrives, the assistant follows this process:

1. **Searches the encyclopedia.** Before composing an answer, the assistant invokes an internal `search` tool powered by [FlexSearch](https://github.com/nextapps-de/flexsearch). The tool queries an in-memory index of all 274 articles (indexed by title, description, and full body text) and returns the most relevant entries as raw JSON.
2. **Grounds its answer.** The assistant reads the search results and bases its response on the retrieved article content, citing sources as Markdown links using the article's `url` field.
3. **Caps agentic steps.** The assistant is configured with `stopWhen: stepCountIs(5)`, meaning it will perform at most **five** tool-call + generation cycles per request. This prevents runaway loops while still allowing the assistant to run multiple searches if needed.
4. **Admits ignorance.** If the search returns no relevant results, the assistant will say it does not know and suggest a more specific search query, rather than hallucinating an answer.

**System prompt (paraphrased):**

> You are an AI assistant for a documentation site. Use the `search` tool to retrieve relevant docs context before answering when needed. Cite sources as Markdown links using the document `url` field. If you cannot find the answer in search results, say you do not know and suggest a better search query.



## Model and Configuration

The assistant is powered by **Claude 3.5 Sonnet** (`anthropic/claude-3.5-sonnet`), routed through [OpenRouter](https://openrouter.ai/). As an API consumer, you do not select or configure the model — that is managed server-side by the encyclopedia operator.

<Note>
  If your integration depends on specific model capabilities (e.g. long context, structured output), contact the site operator to discuss requirements.
</Note>

The assistant's key runtime parameters:

| Parameter | Value | Notes |
|

## Error Responses

The endpoint does not currently return structured JSON error bodies — if the upstream model API returns an error, the stream may terminate early with a non-200 status or an error event line. Handle these cases in your client:

```js
if (!res.ok) {
  const text = await res.text();
  throw new Error(`Chat API error ${res.status}: ${text}`);
}
```

<Tip>
  For large research queries — such as asking the assistant to compare five or more rhetorical figures — consider breaking your question into smaller turns. The 5-step cap means a single request may not be enough for very broad queries that require many separate searches.
</Tip>
