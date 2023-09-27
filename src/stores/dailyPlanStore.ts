import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// type dailyPlanStore = {
//   dailyPlan: any;
//   setDailyPlan: (place: any) => void;
//   defaultList: any;
//   setDefaultList: (place: any) => void;
// };
// type UserPersist = (
//   config: StateCreator<dailyPlanStore>,
//   options: PersistOptions<dailyPlanStore>,
// ) => StateCreator<dailyPlanStore>;

// export const dailyPlanStore = create<dailyPlanStore>(
//   (persist as UserPersist)(
//     (set) => ({
//       defaultList: [], //상태
//       dailyPlan: [], //상태
//       setDefaultList: (place: any) => set({ defaultList: place }), //상태변경
//       setDailyPlan: (place: any) => set({ dailyPlan: place }), //상태변경
//     }),
//     {
//       name: 'DailyPlan',
//     },
//   ),
// );

type dailyPlanStore = {
  dailyPlan: any;
  setDailyPlan: (place: any) => void;
  defaultList: any;
  setDefaultList: (place: any) => void;
  bookMark: any;
  setBookMark: (place: any) => void;
};

export const dailyPlanStore = create<dailyPlanStore>((set) => ({
  defaultList: [], // 상태
  dailyPlan: [], // 상태
  bookMark: [],
  setDefaultList: (place: any) => set({ defaultList: place }), // 상태변경
  setDailyPlan: (place: any) => set({ dailyPlan: place }), // 상태변경
  setBookMark: (place: any) => set({ bookMark: place }), // 상태변경
}));
