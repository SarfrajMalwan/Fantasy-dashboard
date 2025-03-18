import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';




// const games = [
//   {
//     id: 1,
//     title: "Cricket",
//     value: "cricket",
//     path: "/",

//   },
//   {
//     id: 2,
//     title: "FootBall",
//     value: "football",
//     path: "/football/"
//   },
//   {
//     id: 3,
//     title: "Kabaddi",
//     value: "kabaddi",
//     path: "/kabaddi/"
//   },
//   {
//     id: 4,
//     title: "Basketball",
//     value: "basketball",
//     path: "/basketball/"
//   }
// ]



const games = [
  {
    id: 1,
    title: "Cricket",
    value: "cricket",
    path: "/",
  },

]

const useAppUtils = create<any>(
  persist(
    (set, get) => ({
      game: games[0],
      games: games,
      handleGameChange: (game: any) => {
        set({
          game: game
        })
      }
    }),
    {
      name: 'app-utils-test-user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)


export default useAppUtils
