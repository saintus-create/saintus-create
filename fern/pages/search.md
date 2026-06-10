---
title: Search
---

The Encyclopedia of Rhetoric includes a full-text search engine that lets you locate entries, concepts, and passages across articles. Search runs entirely in your browser using a pre-built index, so results appear as you type without waiting for a network request.

## Opening Search

You can open the search dialog in two ways:

<Steps>
  <Step title="Click the Search Bar">
    Click the search input at the top of any page. The dialog opens immediately, ready for your query.
  </Step>
  <Step title="Use the Keyboard Shortcut">
    Press **⌘K** on macOS or **Ctrl\+K** on Windows and Linux to open search from anywhere in the encyclopedia without reaching for your mouse.
  </Step>
  <Step title="Start Typing">
    Begin typing your query as soon as the dialog opens. Results update in real time with every keystroke.
  </Step>
  <Step title="Navigate and Select">
    Use the **↑** and **↓** arrow keys to move through results, then press **Enter** (or click) to open the matching entry. Press **Esc** to dismiss the dialog.
  </Step>
</Steps>

## What Gets Searched

The search index covers every field that matters for finding the right entry:

<CardGroup cols={3}>
  <Card title="Entry Titles" icon="heading">
    The canonical name of each rhetorical concept, figure, or theorist — for example, _Chiasmus_, _Epideictic_, or _Aristotle_.
  </Card>

  <Card title="Descriptions" icon="align-left">
    The short summary shown beneath each entry title, giving you a quick sense of what an article covers before you open it.
  </Card>

  <Card title="Full Article Text" icon="file-lines">
    The complete body of every article, so you can surface entries that discuss a term even if it does not appear in the title.
  </Card>
</CardGroup>

## Tips for Effective Searching

<Tip>
  Search for the core concept rather than a full sentence. "antithesis contrast" will usually surface better results than "what is the rhetorical device that uses contrast?".
</Tip>

<AccordionGroup>
  <Accordion title="Search by theorist name">
    Typing a scholar's name — _Cicero_, _Burke_, _Perelman_ — will surface all entries that discuss or cite them, not just their dedicated biography entry.
  </Accordion>

  <Accordion title="Search for Latin or Greek terms">
    Many entries are indexed under both the classical term and its English equivalent. Searching _enargia_ and _vivid description_ will both reach the same article.
  </Accordion>

  <Accordion title="Narrow by category keyword">
    Prepending a category word such as _figure_, _trope_, _canon_, or _genre_ helps filter results when your concept appears in multiple contexts.
  </Accordion>

  <Accordion title="Use partial words">
    The Orama index supports prefix matching, so typing _metaph_ is enough to surface _Metaphor_, _Metaphorical Extension_, and related entries.
  </Accordion>
</AccordionGroup>

## How Search Works

<Note>
  Search is powered by [Orama](https://orama.com), a fully client-side, TypeScript-native search engine. The index is compiled at build time and shipped as a static asset — there is no search server, no API key required, and no query data is sent anywhere. This means search works at full speed even on a slow or offline connection.
</Note>

The index is built in English mode, which means Orama applies stemming and stop-word filtering so that searching _arguing_ also matches _argument_ and _argumentation_. Results are ranked by relevance across all three indexed fields (title, description, and body text), with title matches weighted most heavily.
