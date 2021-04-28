import { Option } from 'fp-ts/Option'

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

export { esrb_rating, consoles }