### SECTION: formatters

ERROR: TypeError: d3.nest is not a function at formatNestedData (formatters.js? [sm]:40)
ISSUE: d3.nest is no longer included as part of the base library in v6...the previous version of this was using 5.7
RESOLUTION: import {nest} from 'd3-collection';

### SECTION: BarChart
**ERROR:**  When using .on('mouseover', d => d) d now changes to be the event <br>
**RESOLUTION:**  In order to actually pass the value we need to do:  .on('mouseover', (e,d) => circleToolTip(e,d)) where e is the event and d is the object

**ISSUE:** Neither e.pageY, e.clientY, e.screenY work to position the tooltip.  Mousing over the last park in Brooklyn Heights would possition the tooltip all the way to the left.

<img src="https://i.imgur.com/3BU4ADF.png">

Console log of the following coords:

```js
console.log(
    'e.value',
    e.target,
    e.nativeEvent.clientX,
    e.nativeEvent.pageX,
    e.nativeEvent.offsetX,
    e.nativeEvent.layerX
  );
```

Showed the following

<img src="https://i.imgur.com/IYchrx1.png">

**RESOLUTION #1:** use e.nativeEvent.offsetX...although that works for the circles perfectly the tooltip are off if the page when the width is minimized...so this only works if the page width is fixed

**RESOLUTION #2:** using e.nativeEvent.layerX along with replacing left/top with transform: translate(x,y) then 
targets the current position of the cursor.  <br>

<img src="https://i.imgur.com/uk9eMSK.png"/>

vs

<img src="https://i.imgur.com/IYchrx1.png">




### SECTION: APP
**WARNING: **
<img src="https://i.imgur.com/1cdkmZS.png" />

**RESOLUTION:** refactor setParkData function to use a callback to create a local scope. 

**From This:**
```js
setParkData({
  ...parkData,
  allParks: formattedData,
  activeParks: formattedData,
});
```

**To This**

```js
setParkData( prevState => ({
  ...prevState,
  allParks: formattedData,
  activeParks: formattedData,
}));
```

### SECTION: PARK IMAGE
ISSUE: Just added an EV to the circles in bar chart. When the circle is clicked the park image updates but without transition.  

When clicking on a park via rating the ParkImage comp renders 2x but not so with the circle which is why there is no transition. 

INVESTIGATING: I thought since the bar chart hard already been filtered when the circles were clicked on that perhaps this might be the issue.  Testing this out by clicking 2 parks in the same neighborhood in the ratings section confirmed this. So the barchart not updating seems to be causing the issue

From the console logs I added inside the transition I can see that it only runs once when parks in same neighborhood are toggled:

<img src="https://i.imgur.com/xwjfIXD.png">

But runs 3x with if the following sequence:

<img src="https://i.imgur.com/Qu0D0f7.png">

RESOLUTION: After trying multiple attempts I found that the issue had to do with setting **image.code** in the callback of useTransition.  Parks in the same neighborhood have the same code.  useTransition needs a value to determine if a transition is needed and does so by comparing a property value of the images.  

```js
  const transitions = useTransition(activePark, (image) => image.name, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 1000
    }
  });
```