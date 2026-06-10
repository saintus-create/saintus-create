---
title: Knowledge Graph
---

The knowledge graph gives you a bird's-eye view of the Encyclopedia of Rhetoric as a network. Every entry is a node, and every cross-reference or _See Also_ link between entries becomes an edge. Because rhetoric is a deeply interconnected discipline — figures relate to tropes, canons feed into genres, theorists build on one another — the graph often reveals structural relationships that are hard to notice when reading articles one at a time.

## Navigating to the Graph

The knowledge graph is accessible from the main navigation. It renders directly in your browser using a D3-powered force simulation, so no additional software or plugins are required.

## Understanding What You See

<CardGroup cols={2}>
  <Card title="Nodes" icon="circle-dot">
    Each circle represents one encyclopedia entry. The label beneath the circle shows the entry's title. Nodes with many connections appear near the centre of dense clusters, reflecting their conceptual centrality.
  </Card>

  <Card title="Edges" icon="arrow-right-arrow-left">
    Lines between nodes represent explicit cross-references — _See Also_ links authored into the entries by the editorial team. An edge means one article deliberately points the reader toward another.
  </Card>

  <Card title="Highlighted Neighbours" icon="star">
    When you hover a node, it and all its direct neighbours light up in the primary colour. The connecting edges also brighten, making it easy to see exactly which concepts an entry links to.
  </Card>

  <Card title="Tooltips" icon="comment">
    Hovering a node shows a small popover with the entry's description, so you can preview its content without navigating away from the graph.
  </Card>
</CardGroup>

## Interacting with the Graph

<Steps>
  <Step title="Hover to Preview">
    Move your cursor over any node to highlight its direct connections and read its description in a tooltip. The graph dims all unrelated nodes and edges so the neighbourhood stands out.
  </Step>
  <Step title="Click to Open an Entry">
    Click any node to navigate directly to that encyclopedia article. Use your browser's back button to return to the graph.
  </Step>
  <Step title="Drag to Rearrange">
    Click and drag any node to pin it to a new position. This is useful when a dense cluster makes individual nodes hard to distinguish — pull a node out to see its connections more clearly.
  </Step>
  <Step title="Zoom and Pan">
    Scroll to zoom in or out, and click-drag on empty space to pan across the graph. Zooming in on a cluster reveals the individual entry labels that overlap at smaller scales.
  </Step>
</Steps>

## Why the Graph Is Useful

<AccordionGroup>
  <Accordion title="Discover unexpected connections">
    Entries that seem unrelated in alphabetical browsing often share multiple cross-references. The graph makes those latent relationships immediately visible — for example, you might notice that _amplification_, _copia_, and _hyperbole_ form a tight triangle.
  </Accordion>

  <Accordion title="Identify central concepts">
    Highly connected nodes are conceptually foundational. If a node has many edges in the graph, that entry is referenced by many others — a strong signal that it covers a concept worth reading early.
  </Accordion>

  <Accordion title="Trace intellectual lineage">
    Theorist entries link to the concepts they developed or named. Following the edges from a person's node outward maps their contribution to the field.
  </Accordion>

  <Accordion title="Plan a reading sequence">
    Before diving into a new area of rhetoric, use the graph to see which entries are connected to your starting point. Reading them in order of proximity gives you a scaffolded introduction.
  </Accordion>
</AccordionGroup>

<Note>
  The graph is rendered with D3 force simulation via the `react-force-graph-2d` library. The layout is computed in real time in your browser using charge, link-distance, and collision forces — so the positions of nodes shift slightly each time the graph loads as the simulation reaches equilibrium.
</Note>

<Tip>
  On a large monitor, open an encyclopedia entry in one tab and the knowledge graph in another. As you read, switch to the graph tab and hover the corresponding node to instantly see which other entries the editorial team considered most closely related.
</Tip>
