---
title: Ai Assistant
---

Every page in the Encyclopedia of Rhetoric includes a built-in AI chat assistant you can use to ask questions in plain language. The assistant searches the encyclopedia, synthesizes an answer from relevant articles, and cites the specific entries it drew from — so you can always verify the source.

## Opening the AI Assistant

<Steps>
  <Step title="Use the Keyboard Shortcut">
    Press **Ctrl+/** (or **⌘+/** on macOS) from anywhere in the encyclopedia. The chat panel slides in from the right side of the page without navigating you away from the article you were reading.
  </Step>
  <Step title="Click the Chat Icon">
    Select the **AI Chat** button visible in the page toolbar. On mobile the panel opens as a modal overlay.
  </Step>
  <Step title="Type Your Question">
    Click inside the text area (it focuses automatically) and type your question. Press **Enter** to send, or **Shift+Enter** to add a new line.
  </Step>
  <Step title="Read the Response">
    The assistant streams its answer in real time. Cited entries appear as clickable Markdown links so you can jump directly to the source article.
  </Step>
  <Step title="Continue the Conversation">
    Ask follow-up questions in the same session — the assistant maintains context across turns. Use the **Retry** button to regenerate the last response, or **Clear Chat** to start fresh.
  </Step>
</Steps>

## What the AI Assistant Can Do

<CardGroup cols={2}>
  <Card title="Explain Rhetorical Concepts" icon="lightbulb">
    Ask the assistant to define a term, compare two devices, or explain why a classical figure is still relevant today.
  </Card>
  <Card title="Cite Specific Entries" icon="book-open">
    The assistant links directly to the encyclopedia articles it uses, so you can read the full scholarly treatment alongside the conversational summary.
  </Card>
  <Card title="Answer Contextual Questions" icon="location-dot">
    Because the assistant knows which article you are currently reading, it can answer questions like "How does this relate to *stasis* theory?" without you having to provide context.
  </Card>
  <Card title="Suggest Further Reading" icon="arrow-right">
    When a topic spans multiple entries the assistant will point you toward related articles — useful for following a thread across historical periods or traditions.
  </Card>
</CardGroup>

## Example Questions to Try

<AccordionGroup>
  <Accordion title="Concept definitions">
    - "What is the difference between *metonymy* and *synecdoche*?"
    - "Explain *stasis* theory and how it was used in legal rhetoric."
    - "What does *decorum* mean in the context of classical oratory?"
  </Accordion>
  <Accordion title="Comparisons and relationships">
    - "How does Aristotle's view of *ethos* differ from Cicero's?"
    - "What is the relationship between the five canons of rhetoric and modern communication?"
    - "Compare *epideictic* and *deliberative* genres."
  </Accordion>
  <Accordion title="Historical and contextual questions">
    - "How did the Sophists influence later rhetorical theory?"
    - "Which entries cover rhetoric in the digital age?"
    - "Who are the key theorists of the New Rhetoric movement?"
  </Accordion>
  <Accordion title="Practical application">
    - "Give me examples of *chiasmus* in use."
    - "How would I use *anaphora* to open a persuasive speech?"
    - "What rhetorical strategies are typically found in epideictic speeches?"
  </Accordion>
</AccordionGroup>

## How the AI Grounds Its Answers

<Note>
  Before composing a response, the assistant automatically runs a search against the encyclopedia index to retrieve the most relevant entries. This grounding step means answers are anchored in the encyclopedia's scholarly content.
</Note>

The system works like this:

1. You send a question.
2. The assistant calls an internal `search` tool that queries the encyclopedia's index across entry titles, descriptions, and article bodies.
3. The search returns up to ten results.
4. The assistant reads those results and writes a response, citing entries as Markdown links using each article's URL.
5. You see both the answer and a small badge showing how many search results were consulted.

<Note>
  If the assistant cannot find a relevant answer in the encyclopedia, it will say so explicitly and suggest a more targeted search query. AI responses can occasionally be imprecise; always follow the cited links to read the primary source.
</Note>
