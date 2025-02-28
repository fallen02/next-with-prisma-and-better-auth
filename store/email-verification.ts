import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type Store = {
  email: string;
  setEmail: (email: string) => void;
  removeEmail: () => void;
};

export const useEmailVerificationStore = create<Store>()(
    persist(
        (set) => ({
            email: "",
            setEmail: (email) => set(() => ({ email: email  })),
            removeEmail: () => set(() => ({ email: ""})),
          }),
          {
            name: "email-verification",
            storage: createJSONStorage(() => sessionStorage)
          }
    )
);
