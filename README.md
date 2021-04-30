This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## From Elm To TypeScript + Redux + fp-ts

Elm is a functional programming language that generates JavaScript code through a Haskell compiler. This project translates an Elm exercise I made as a TA for McMaster's COMPSCI 1XD3 into ES2020 TypeScript + Redux. We use the fp-ts functional programming library for TypeScript to introduce key ideas from Elm such as pipes and the Option type (analogous to Elm's Maybe type).

From 

* [Elm](https://elm-lang.org/)
* [GraphicSVG](https://package.elm-lang.org/packages/MacCASOutreach/graphicsvg/latest/GraphicSVG)

To

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Redux](https://redux.js.org/)
* [fp-ts](https://gcanti.github.io/fp-ts/)

## Why Translate

I wanted to show people that many of the core ideas in Elm and functional programming can be tightly coupled with what they do in more popular languages and tools, especially Redux and TypeScript. Given Elm's small ecosystem and community, it may not overtake the popular JS frameworks and libraries anytime soon, but that doesn't mean we can't learn a lot from it. In fact, Redux even acknowledges many of the [fantastic ways of Elm](https://redux.js.org/understanding/history-and-design/prior-art#elm) and says Elm should be a source of future inspiration!

## The Elm Challenge 

The coding challenge was designed to show the students how to work with recursive types in Elm. This is slightly more challenging in Elm than in TypeScript, so I provided them some additional resources in the Hints section. Note that for their submission, we only required them to instantiate the game seen on-screen with one particular game and they were given a [template](https://gist.github.com/Turboscient/3e086c596e1a6631a0b02cc95571e20d) to fill in, simplifying the challenge. Nevertheless, recursive types and record destructuring posed quite a challenge for many even with the Hints, evidenced by the number of Piazza questions we received.

> -- Hints <br /> 
> -- https://stackoverflow.com/questions/31358764/how-to-access-fields-of-a-union-in-elm <br /> 
> -- https://github.com/elm/compiler/blob/master/hints/recursive-alias.md <br /> 
>
>
> Preface: Imagine you live in a world with exactly 3 videogames (Among Us, Super Mario Bros. and Super Mario Bros. 2).
> Super Mario Bros. 2 is the still the sequel to Super Mario Bros. in this alternate universe, but Super Mario Bros. 2 has
> no sequel. All the other details of the games are the same. Represent these videogames with a VideoGame type, then
> fill in the details for each field. The VideoGame type should have the following (partially-completed) fields:
>
>  name : <br /> 
>  hasSinglePlayer : <br /> 
>  hasMultiPlayer : <br />
>  ratedByESRB : ESRB_Rating <br /> 
>  runsOn : List Console <br /> 
>  yearReleased : <br />
>  sequel : Maybe VideoGame <br /> 
>
> Use the provided type aliases whenever possible (e.g. Year instead of Int) when completing the type. As well,
>
> 1) Make a function gameName that returns the name of the VideoGame it takes as an input
> 2) Make a function gameHasSequel that tells us if the VideoGame has a sequel or not
> 3) Print your answers to the on-screen prompts using the "text" function.
>
> Ex. 
> (gameName superMarioBros) returns "Super Mario Bros." <br />
> (gameHasSequel superMarioBros) returns True. <br />
> (gameHasSequel superMarioBros2) returns False. <br />
>
> Replace the TODOs with your code. Do not alter type annotations unless instructed otherwise.

## The Elm Solution

```
type ESRB_Rating = NotRated | Rating_Pending | Everyone | Teen | Mature
type Console = PC | Mobile | Xbox | PlayStation | Nintendo

type alias Name = String
type alias Year = Int

fromBool : Bool -> String
fromBool = 
   \bool -> if bool then "True" else "False"

type VideoGame =   
  VideoGame
   {
   name : Name,
   hasSinglePlayer : Bool,
   hasMultiPlayer : Bool,   
   ratedByESRB : ESRB_Rating,
   runsOn : List Console,
   yearReleased : Year,   
   sequel : Maybe VideoGame
   }    

gameName : VideoGame -> Name
gameName (VideoGame game) = 
    game.name

gameHasSequel : VideoGame -> Bool
gameHasSequel (VideoGame game) =
   case game.sequel of
       Just (VideoGame _) -> True
       _ -> False
       
-- Example games to test
       
amongUs : VideoGame
amongUs =    
  VideoGame
   {
   name = "Among Us",
   hasSinglePlayer = False,
   hasMultiPlayer = True,   
   ratedByESRB = Everyone,
   runsOn = [PC, Mobile, Xbox, Nintendo],
   yearReleased = 2018,   
   sequel = Nothing
   }  
   
superMarioBros : VideoGame
superMarioBros =    
  VideoGame
   {
   name = "Super Mario Bros.",
   hasSinglePlayer = True,
   hasMultiPlayer = False,   
   ratedByESRB = NotRated,
   runsOn = [Nintendo],
   yearReleased = 1985,   
   sequel = Just (superMarioBros2)
   }  
   
superMarioBros2 : VideoGame
superMarioBros2 =    
  VideoGame
   {
   name = "Super Mario Bros. 2",
   hasSinglePlayer = True,
   hasMultiPlayer = False,   
   ratedByESRB = NotRated,
   runsOn = [Nintendo],
   yearReleased = 1988,   
   sequel = Nothing
   }  

                     
init = { time = 0 }

type Msg = Tick Float GetKeyState                  

myShapes model = [ text "The name of the game is:" 
                      |> centered 
                      |> filled black 
                      |> move (0, 15),
                   superMarioBros 
                      |> gameName 
                      |> text 
                      |> centered 
                      |> filled red, 
                   text "This game has a sequel:" 
                      |> centered 
                      |> filled black 
                      |> move (0, -15),
                   superMarioBros 
                      |> gameHasSequel 
                      |> fromBool 
                      |> text 
                      |> centered 
                      |> filled red 
                      |> move (0, -30)                   
                 ]

update msg model = case msg of 
                     Tick t _ -> { model | time = t }
```

This runs on Elm 0.19 and uses the GraphicSVG package in Elm for displaying to the screen. It was hosted in macoutreach.rocks, a web IDE that abstracts away some of the boilerplate Elm code.

## Highlights of Conversion

I made some minor modifications to the end product in my conversion, namely that I wanted to display the entire videogame on the screen, and have a button which shifts the on-screen videogame to its sequel. Additionally, ```gameName``` and ```gameHasSequel``` are not implemented, as they are trivial in this implementation. Some of the key translations are seen below:

* Elm's ```type``` variant is translated into ```enum```
* Elm's ```type alias``` is translated into ```type``` from TypeScript
* Elm's ```type``` record is translated into ```interface``` from TypeScript
* Elm's ```List``` is translated into ```Array```
* Elm's ```Maybe``` is translated into ```Option``` from fp-ts
* Elm's ```Int``` type is represented by ```number``` (you could alternatively use ```BigInt```, albeit it has limitations and its own challenges)

```
enum esrb_rating { NotRated, RatingPending, Everyone, Teen, Mature }
enum consoles { PC, Mobile, Xbox, Playstation, Nintendo }

export type name = string;
export type year = number;

export type videogame_fields = name | year | boolean | esrb_rating | Array<consoles> | Option<videogame>

export interface videogame {
  name: name,
  yearReleased: year
  hasSinglePlayer: boolean,
  hasMultiPlayer: boolean,
  ratedByESRB: esrb_rating,
  runsOn: Array<consoles>,
  sequel: Option<videogame>
}
```

Now we represent the individual videogames

```
const superMarioBros2: videogame = {
    name: "Super Mario Bros. 2",
    yearReleased: 1988,
    hasSinglePlayer: true,
    hasMultiPlayer: false,
    ratedByESRB: esrb_rating.NotRated, 
    runsOn: [consoles.Nintendo],  
    sequel: none
  };
  
  const amongUs: videogame = {
    name: "Among Us",
    yearReleased: 2018,
    hasSinglePlayer: false,
    hasMultiPlayer: true,
    ratedByESRB: esrb_rating.Everyone, 
    runsOn: [consoles.Nintendo, consoles.PC, consoles.Mobile, consoles.Xbox],  
    sequel: none
  };
  
  const superMarioBros: videogame = {
    name: "Super Mario Bros.",
    yearReleased: 1985,
    hasSinglePlayer: true,
    hasMultiPlayer: false,
    ratedByESRB: esrb_rating.NotRated, 
    runsOn: [consoles.Nintendo],  
    sequel: some(superMarioBros2)
  };
```

This takes a Redux ```state``` and returns ```state.sequel``` if it exists or ```state``` otherwise

```
export const getSequel = (state: videogame): videogame => {
  return pipe(
          // Argument
          state.sequel,
          // Pattern match over Maybe type
          match(
            // Nothing
            () => state,
            // Some(...)
            (sequel) => sequel
          )
        )
}
```

Elm's ```Msg``` and ```update``` system are translated into Redux reducers; this updates the ```state```, such that ```state => state.sequel``` or ```state => state```

```
const initialState: videogame = superMarioBros;

export const recursiveTypeSlice = createSlice({
    name: 'videogame',
    initialState,    
    reducers: {      
      goToSequel: (state) => {              
        return getSequel(state);       
      }
    },    
  });

export const { goToSequel } = recursiveTypeSlice.actions;
export const selectGame = (state: any): videogame => state.videogame;
```

This returns a ```string``` representation to display a videogame on the screen

```
const displayGame = (game: videogame, field: videogame_fields): string => {  
  switch (field) {
    case "name": 
      return game.name;
    case "yearReleased": 
      return game.yearReleased.toString();
    case "hasSinglePlayer":     
      return game.hasSinglePlayer ? "True" : "False"
    case "hasMultiPlayer":     
      return game.hasMultiPlayer ? "True" : "False"
    case "ratedByESRB":
      return esrb_rating[game.ratedByESRB];
    case "runsOn":
      return "[" + game.runsOn.map((k) => ` ${consoles[k]}` ) + " ]";
    case "sequel":
      return isSome(game.sequel) ? getSequel(game).name : "None";
    default:
      return "";
  }
}
```

And finally, we can showcase the view in JSX by rendering the state object's keys and values

```
export function RecursiveType() {
    const game = useSelector(selectGame);
    const dispatch = useDispatch();    
  
    return (
      <div>
        <div>          
          {Object.keys(game).map((k) => <div key={k}>{k}: {displayGame(game, k)}</div>)}        
          <button            
            aria-label="Decrement value"
            onClick={() => dispatch(goToSequel())}
          >
            <span>Go to sequel (if the game has one)</span>
          </button>   
        </div>        
      </div>
    );
  }
  ```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
