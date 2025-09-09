# Island + Ulcanix

By correctly sequencing your effects, you're able to get [_Legendary Fire King Ponix_] onto the field and set up [_Fire King Sanctuary_], while still generating enough material to summon [_Promethean Princess, Bestower of Flames_].

We use [_Fire King High Avatar Garunix_]'s effect to our advantage here, sending Promethean Princess to the GY so we have a way to start interrupting our opponent during their turn.

<center>
<br/><video class="player" controls preload="auto">
  <source src="20-island-ulcanix.mp4" type="video/mp4">
  Your browser does not support the MP4 format, or the &lt;video&gt; tag.
</video>
</center>

<div class="warning">

This combo plays safely into [_Nibiru, the Primal Being_].

Under [_Mulcharmy Fuwalos_], your opponent draws 2 cards.

</div>

#### Steps
1. Activate [_Fire King Island_].
2. Activate Island again: destroy [_Fire King Courtier Ulcanix_], then add [_Sacred Fire King Garunix_] from your Deck to your hand.
3. A chain forms:
    - CL1: Activate Sacred: Special Summon it from your hand.
    - CL2: Activate Ulcanix: Special Summon [_Fire King High Avatar Garunix_] from your Deck.
4. Activate Sacred again: destroy [_Fire King High Avatar Kirin_] in your Deck.
5. Activate High Kirin: Special Summon Ulcanix from the GY.
6. Activate Ulcanix: destroy High Garunix, then add [_Legendary Fire King Ponix_] from your Deck to your hand.
7. Activate Ponix: Special Summon it from your hand.
8. Activate Ponix again: add [_Fire King Sanctuary_] from your Deck to your hand.
9. Link Summon [_Promethean Princess, Bestower of Flames_].
10. Activate Promethean Princess: Special Summon Ponix from the GY.
11. Activate Sanctuary.
12. Pass turn.

##### Opponent's turn
13. In the Standby Phase, activate High Garunix: Special Summon it from the GY,
14. Activate High Garunix again: destroy all other monsters on the field.

> After step 10, you can Link Summon [_Salamangreat Sunlight Wolf_], then in the Standby Phase, Special Summon High Garunix under Sunlight Wolf's link. This triggers its effect to retrieve a card from the GY (remember you cannot Summon the retrieved card until the next turn!).
>
> This is only needed if you need something else from the GY except Ponix. Otherwise, let Ponix get destroyed, and it'll return to your hand in the next Standby Phase.
>
> However, be mindful that Nibiru can stop this by removing Princess or Sunlight Wolf before High Garunix can return.

<div class="tab">
  <button class="tablinks" onclick="openCity(event, 'London')">If Nibiru hits at step X</button>
  <button class="tablinks" onclick="openCity(event, 'Paris')">No Nibiru in sight</button>
</div>

<!-- Tab content -->
<div id="London" class="tabcontent">
  <h3>If Nibiru hits at step X</h3>
  <p>Pass turn here - High Garunix will return in Standby and blah blah blah</p>
</div>

<div id="Paris" class="tabcontent">
  <h3>No Nibiru in sight</h3>
  <p>Paris is the capital of France.</p>
</div>

<style>
 /* Style the tab */
.tab {
  overflow: hidden;
  border: 1px solid #ccc;
  width: fit-content;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 14px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: darkorange;
  color: black;
}

/* Create an active/current tablink class */
.tab button.active {
  color: darkorange;
  font-weight: bold;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
} 
</style>

<script>
  function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  document.getElementById("London").click();
</script>

{{#include ../../links.md}}
