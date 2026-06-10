---
title: Sharing
---

Every encyclopedia entry comes with a set of actions that make it easier to use the content outside the browser — whether you want to paste an article into a writing tool, share a link on social media, or flag something for the editorial team to improve.



## Open In

The **Open In** button reveals a popover listing AI destinations where you can open the current article with a single click.

<CardGroup cols={2}>
  <Card title="ChatGPT" icon="comment">
    Opens ChatGPT with a pre-filled prompt that includes the article's URL.
  </Card>

  <Card title="Claude" icon="comment-dots">
    Opens Anthropic's Claude with the same contextual prompt.
  </Card>

  <Card title="Scira" icon="magnifying-glass">
    Launches the Scira AI search engine with the article URL as context.
  </Card>

  <Card title="Cursor" icon="code">
    Opens Cursor's prompt interface pre-loaded with the article content.
  </Card>
</CardGroup>

<Note>
  All **Open In** links open in a new tab and pass the current page URL as context. Each destination generates its own prompt from that URL — your browsing data is not otherwise shared with third-party services.
</Note>

You can also select **View Markdown** from the same popover to open the raw `.mdx` source in a new browser tab, or **Open on GitHub** to view the source file in the repository.



## Text Feedback

In addition to page-level ratings, you can give feedback on a specific passage within any article.

<Steps>
  <Step title="Select a Passage">
    Highlight any sentence or phrase in an article body with your cursor. A small **Feedback** popover appears near the selected text.
  </Step>
  <Step title="Click Feedback">
    Click the **Feedback** button in the popover. The tooltip expands into a comment form anchored to the highlighted text.
  </Step>
  <Step title="Describe the Issue">
    Type your comment explaining what is wrong or unclear about the selected passage, then press **Enter** or click **Submit**.
  </Step>
  <Step title="Close the Popover">
    Click **Close** to dismiss the form without submitting, or press **Esc** at any time.
  </Step>
</Steps>

<Tip>
  Text feedback is especially useful for flagging factual errors, outdated citations, or passages where the wording could be more precise. Including the specific sentence as context helps the editorial team locate and address the issue quickly.
</Tip>

---

## Social Sharing via OpenGraph Images

Every encyclopedia entry has an automatically generated OpenGraph image that appears when you share its URL on social media, in messaging apps, or in link-preview contexts.

<AccordionGroup>
  <Accordion title="What the image shows">
    Each preview image is 1200 × 630 pixels (WebP format) and displays the entry title, its short description, and the encyclopedia's name. Images are generated at build time, so they load instantly when a link is unfurled.
  </Accordion>

  <Accordion title="How to share an entry">
    Copy the URL of any article from your browser's address bar and paste it into your platform of choice — Twitter/X, LinkedIn, Slack, Discord, or any other service that renders link previews. The correct title, description, and image are picked up automatically from the page metadata.
  </Accordion>

  <Accordion title="Customisation per entry">
    The image text is derived from each article's `title` and `description` frontmatter fields, so every entry has a unique preview that accurately represents its content rather than a generic encyclopedia-wide thumbnail.
  </Accordion>
</AccordionGroup>
