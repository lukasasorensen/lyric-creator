# Different Section Types
* Words with chords
* Chords Only
* Tabs
### special types less important
* Text only

## Words with Chords Section Model 
```typescript
const wordsWithChordsSection = {
  "Verse-1": {
    title: "Verse 1",
    lines: [
      {
        type: "lyrics",
        words: [
          { text: "Headin'", chord: { letter: "G", quality: "" } },
          { text: "down" },
          { text: "south" },
          { text: "land", chord: { letter: "E", quality: "m" } },
          { text: "pines" },
        ],
      },
    ],
  },
};
```
above should render like

   G                Em
Heading down south land pines

## Section with Only Chords 
- should have measure separatations
```typescript
const onlyChordsSection = {
  "Verse-1": {
    title: "Verse 1",
    type: "chords"
    lines: [
      {
        type: "chords",
        measures: [
          { chords: [{ letter: "G" }] }
          { chords: [{ letter: "D" }, { letter: "c"}] }
        ],
      },
    ],
  },
};
```
above should render like
| G | D C |
