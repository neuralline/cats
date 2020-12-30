import { ICats, IVote } from '../global-cats-env'
/***
 *
 * most important part of this app
 * sorting and populating store data
 */
export const addFavorite = (
  cats: [ICats],
  favorites: [ICats],
  votes: [IVote]
) => {
  return cats.map((cat: ICats) => {
    const favor = favorites.find((fav: ICats) => fav.image_id === cat.id)
    const voted = votes.find((vote: IVote) => vote.image_id === cat.id)
    const catsWithFavor = favor
      ? { fav_id: favor.id, favorite: true }
      : { favorite: false, fav_id: 0 }
    const catsWithVotes = voted
      ? {
          vote_id: voted.id,
          value: voted.value + 1
        }
      : { vote_id: 0, value: 0 }
    return { ...cat, ...catsWithFavor, ...catsWithVotes }
  })
}
