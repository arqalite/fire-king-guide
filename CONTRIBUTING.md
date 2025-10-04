# Contributor's Guide

The development of the guide is currently done in-house at the [Fire King Discord server] - we strongly encourage you to join the community and make your voice heard.

That said, we are accepting external contributions, as long as they abide by the rules outlined in this document. 

We reserve the right to reject any contributions that do not align with the project's goals.

[Fire King Discord server]: https://discord.gg/8JtxHUAdGq

## Contributing to the guide

### Setup

Make sure you have [mdBook] installed on your system - [more information can be found here]. This should be the only tool you need besides your favorite text editor.

[mdBook]: https://rust-lang.github.io/mdBook/
[more information can be found here]: https://rust-lang.github.io/mdBook/guide/installation.html

### File an issue (or reach out to a team member)

We strongly recommend you reach out to us, either by filing an issue here, or on Discord, in `#guide-link-channel`.

We don't want you to waste time working on something only to find out it doesn't fit our vision for the project, so talking to us is the best way of knowing if your contribution will be accepted or not.

### Working with the repository

If you receive the go-ahead from us, it's time to get to work!

The repository follows the standard mdBook structure, with some minor adjustments:
- `src` contains the files that compose the guide
  - `assets` contains assets that are used throughout the book but are not tied to a specific section (i.e. a specific combo)
  - `combos` contains the Markdown and media files that relate to combos; the folder is split into sub-folders for each respective starter card (Ponix, Ulcanix, Sanctuary, Island)
  - `links.md` contains most links to external resources (like [Yugipedia] for card information); any new links should be added here, especially those that are reused across pages.
  - `SUMMARY.md` contains the table of contents for the guide and is parsed by mdBook to generate the final book
  - `credits.md` should credit every contributor - if you make a change to the guide, add yourself here!
  - `index.md` is the introduction page that every user will see when first opening the guide
- `theme` contains the HTML/CSS/JS that makes the website work. It is based on the default Ayu theme with some various tweaks and deviations.

Make the necessary edits for your contribution, and test them locally with `mdbook serve --open`. This will also hot-reload the website as you make edits, helping you work faster.

[Yugipedia]: https://yugipedia.com/wiki/Yugipedia

### Commit guidelines

Commits should be atomic (one change per commit) and commit messages should follow the [Conventional Commits] specification. Check the Git history for examples.

[Conventional Commits]: https://www.conventionalcommits.org/en/v1.0.0/#summary

### Make your Pull Request
Make a PR as soon as your changes are ready. Include a small summary of your changes and any details that you think are worth sharing with the team.

[Vercel] will automatically build your version of the guide and include a test link in the comments which we will use to check your work. 

@arqalite is the owner of the Vercel account - if you encounter build issues you cannot fix, reach out to him for support.

[Vercel]: https://vercel.com

### Content and code review
A team member will review your changes and approve them or provide feedback. 
Work with them towards approval - our standards for the guide are rigorous and we are striving to make this guide as accurate and helpful as possible,
so it might take a few rounds of back-and-forth before your contribution is ready for release.

### Release schedule
The guide is following a rolling-release model - approved changes are generally launched shortly after approval. 
However for larger-scope changes that involve multiple PRs and contributors, we might hold back a PR until everything else is ready as well.

## Project Standards
> [!IMPORTANT]
> Expect this section to change and evolve with time!

At the time of writing, we have mapped out all combos that can be performed with [Dinh-Kha Bui's French Open Montpellier 2025 winning list](https://ygoprodeck.com/deck/fire-king-591564).

Looking forward, we plan to exhaust and map out combos using cards not included in his list, such as [_Fire King Avatar Barong_] or [_Fire King Avatar Rangbali_].

### Combo pages

All combos should have the following:
- an introduction explaining the endboard and its advantages over other combos
- a video showcasing the combo (if you're contributing a new combo, ask @arqalite to handle this for you, as the videos currently require a bespoke build of [EDOPro])
- notes about playing into handtraps like [_Nibiru, the Primal Being_] and [_Mulcharmy Fuwalos_]:
  - Nibiru safety is expressed on a 3-point scale:
    - "plays under Nibiru" (less than 5 summons)
    - "stops Nibiru" (5+ summons but negates Nibiru with Arvata)
    - "plays safely into Nibiru" (5+ summons, Nib resolves but we recover/ignore it and still make an endboard)
  - Include the number of draws given to the opponent under Fuwalos.
  - If the combo can be performed under [_Droll & Lock Bird_], **include this information!**
- the list of individual steps required to perform the combo
  - The steps are written in regular English but aim to stay close to PSCT.
  - Identical steps MUST use the same exact wording across combos. Check existing combos and copy their text if needed (ex. [_Sacred Fire King Garunix_]'s effect in the hand must always be written as "Activate Sacred: Special Summon it from your hand.")
  - If a card is mentioned for the first time in the combo, link to it using its full name (see the next section). Subsequent mentions should be done using a shorthand (ex. Ponix for [_Legendary Fire King Ponix_], High Kirin for [_Fire King High Avatar Kirin_]) unless the full name is needed for clarity.
- (optional) Tips, tricks and various mentions at the end of the guide, inside a blockquote.
- An include statement for `src/links.md` (e.g. `{{#include links.md}}`)

[_Fire King Avatar Barong_]: https://yugipedia.com/wiki/Fire_King_Avatar_Barong
[_Fire King Avatar Rangbali_]: https://yugipedia.com/wiki/Fire_King_Avatar_Rangbali
[EDOPro]: https://projectignis.github.io/index.html
[_Nibiru, the Primal Being_]: https://yugipedia.com/wiki/Nibiru,_the_Primal_Being
[_Mulcharmy Fuwalos_]: https://yugipedia.com/wiki/Mulcharmy_Fuwalos
[_Droll & Lock Bird_]: https://yugipedia.com/wiki/Droll_%26_Lock_Bird
[_Sacred Fire King Garunix_]: https://yugipedia.com/wiki/Sacred_Fire_King_Garunix
[_Legendary Fire King Ponix_]: https://yugipedia.com/wiki/Legendary_Fire_King_Ponix
[_Fire King High Avatar Kirin_]: https://yugipedia.com/wiki/Fire_King_High_Avatar_Kirin

### Layout for pages with multiple combos

Some starting hands, such as [Ponix + Arvata] have multiple combos available. They are all contained on a single page on the website, behind a dropdown.

However that is not the case inside the repository. For better maintainability, these pages should be broken down into multiple files - one for each combo - leveraging mdBook's `include` system.

Looking at the Ponix + Arvata page's [source file], we see that the page features:
- a short introduction describing what the starting hand can generally do / describe the combos.
- a `<form>` element containing a `<select>`, representing the dropdown the reader sees:
  
  ```html
  <form autocomplete="off">
      <select id="comboDropdown">
          <option selected>Select one of the following endboards:</option>
          <option value="princess-arvata-ulcanix">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) Promethean Princess + Arvata setup (with Ulcanix in GY)</option>
          <option value="princess-arvata-kirin-field">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2) Promethean Princess + Arvata + High Kirin setup</option>
          <option value="princess-arvata-kirin-hand">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3) Promethean Princess + Arvata setup (with High Kirin in your hand, and a 3rd monster on the field)</option>
      </select>
  </form>
  ```
  > Note that the `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` is needed for any option not in an `<optgroup>` tag.
- multiple `<div>`s containing an `{{#include}}` statement for each combo page. These elements have the `inv` class added to them, which makes them invisible until the respective option is selected in the dropdown:
  ```html
  <div id="princess-arvata-ulcanix" class="inv">

  {{#include arvata/1-princess-arvata-ulcanix.md}}
  
  </div>
  
  <div id="princess-arvata-kirin-field" class="inv">
  
  {{#include arvata/2-princess-arvata-kirin-field.md}}
  
  </div>
  
  <div id="princess-arvata-kirin-hand" class="inv">
  
  {{#include arvata/3-princess-arvata-kirin-hand.md}}
  
  </div>
  ```

> [!WARNING]
> The newlines between the elements and the include statements are needed, otherwise they will not be parsed correctly by mdBook.

The link between the `<option>`s and their respective `<div>`s is done via the `class` attribute on the `<div>`s, which should be identical to the `value` of the `<option>` element.

It's best to just copy this setup from one of the pages that has it, and edit it as needed, as opposed to writing it from scratch.

[Ponix + Arvata]: https://fire-king.arqalite.org/combos/ponix/4-arvata.html
[source file]: https://github.com/arqalite/fire-king-guide/blob/main/src/combos/ponix/4-arvata.md?plain=1

### Card links and `links.md`
Cards should always be linked to their [Yugipedia] article, the first time they are mentioned on a page. 

To add a link, follow the structure in `src/links.md` and use the full card name.

For non-card links, follow these rules:
- If the link is only needed once, leave it inside its respective page.
- If the link is used multiple times (or there is good reason to believe it will be), add it to the end of `src/links.md`.

### General writing style
- The guide should have an approachable and enthusiastic, but instructive tone, and be written in correct English.
- Use correct Yu-Gi-Oh! terminology. Community jargon ("pop", "bounce", etc.) is allowed but should be used sparingly, especially when the official terminology can suffice.
  - Brief note on rulings - if citing a ruling, include a link from a trusted source and use the text of the ruling as written in the source. Do not paraphrase or modify it.
- Jokes and humor should be kept to a minimum (except in the `src/credits.md` file - go wild there). 
- The guide should be an educational resource that anyone can enjoy. Any inappropriate and/or offensive statements will be flagged and removed immediately.

## Questions or feedback?
Don't hesitate to reach out to us - either on Discord or by opening an issue here. Always contact us if you are unsure about something.
